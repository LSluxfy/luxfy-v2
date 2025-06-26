import express from 'express';
import pkg from 'whatsapp-web.js';
import qrcode from 'qrcode';
import cors from 'cors';
import { supabase } from './lib/supabase.js';
import openai from './lib/openai.js';
import fs from 'fs/promises';
import * as path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SESSION_PATH = path.resolve(__dirname, '.wwebjs_auth_default');
const { Client, LocalAuth } = pkg;
const app = express();
const port = process.env.PORT || 3333;
app.use(express.json());
app.use(cors());
let latestQr = null;
let lastAgentIdScanned = null;
let isInitializing = false;
let isClientReady = false;
const phoneToAgentId = new Map();
let client = createClient();
initializeClient();
function createClient() {
    return new Client({
        authStrategy: new LocalAuth({ clientId: 'default' }),
        puppeteer: {
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-extensions',
                '--disable-gpu',
                '--headless=new',
            ],
        },
    });
}
function initializeClient() {
    if (isInitializing || isClientReady)
        return;
    isInitializing = true;
    client.on('qr', async (qr) => {
        console.log('[QR] Novo QR gerado');
        latestQr = await qrcode.toDataURL(qr);
    });
    client.on('ready', async () => {
        isClientReady = true;
        isInitializing = false;
        latestQr = null;
        const phone = client.info?.wid?.user;
        console.log('[CLIENTE] Conectado ao WhatsApp como:', phone);
        if (phone && lastAgentIdScanned) {
            phoneToAgentId.set(phone, lastAgentIdScanned);
            console.log(`[MAPEAMENTO] ${phone} => ${lastAgentIdScanned} (em memória)`);
            const { error: insertErr } = await supabase
                .from('whatsapp_agent_links')
                .upsert({ phone, agent_id: lastAgentIdScanned });
            if (insertErr) {
                console.error('[SUPABASE] Erro ao salvar mapeamento:', insertErr.message);
            }
            else {
                console.log(`[SUPABASE] Mapeamento salvo: ${phone} => ${lastAgentIdScanned}`);
            }
        }
    });
    client.on('message_create', async (msg) => {
        if (msg.fromMe)
            return;
        await handleMessage(msg);
    });
    client.on('disconnected', async (reason) => {
        console.warn('[WHATSAPP] Desconectado:', reason);
        isClientReady = false;
        isInitializing = false;
        latestQr = null;
        await restartClient();
    });
    client.on('auth_failure', async (msg) => {
        console.error('[WHATSAPP] Falha na autenticação:', msg);
        await restartClient();
    });
    client.initialize().catch((err) => {
        console.error('[CLIENT] Erro ao inicializar:', err);
        isInitializing = false;
    });
}
async function clearSession() {
    try {
        await new Promise((res) => setTimeout(res, 2000));
        await fs.rm(SESSION_PATH, { recursive: true, force: true });
        console.log('[SESSION] Sessão local limpa.');
    }
    catch (err) {
        if (err.code === 'EBUSY') {
            console.warn('[SESSION] Arquivo ocupado. Tentando novamente em 1s...');
            await new Promise((res) => setTimeout(res, 1000));
            try {
                await fs.rm(SESSION_PATH, { recursive: true, force: true });
                console.log('[SESSION] Sessão limpa após retry.');
            }
            catch (err2) {
                console.error('[SESSION] Falha no retry:', err2);
            }
        }
        else {
            console.error('[SESSION] Erro ao limpar sessão:', err);
        }
    }
}
async function restartClient() {
    try {
        await client.destroy();
        console.log('[CLIENT] Cliente destruído.');
    }
    catch (e) {
        console.warn('[CLIENT] Erro ao destruir cliente:', e);
    }
    await clearSession();
    client = createClient();
    initializeClient();
}
async function handleMessage(message) {
    const senderPhone = message.from.split('@')[0];
    const receiverPhone = client.info?.wid?.user;
    console.log(`[MSG] De ${senderPhone} para ${receiverPhone}: ${message.body}`);
    if (!receiverPhone) {
        await message.reply('Erro interno: número do agente não disponível.');
        return;
    }
    let agentId = null;
    if (phoneToAgentId.has(receiverPhone)) {
        agentId = phoneToAgentId.get(receiverPhone);
    }
    else {
        const { data: link, error } = await supabase
            .from('whatsapp_agent_links')
            .select('agent_id')
            .eq('phone', receiverPhone)
            .maybeSingle();
        if (link?.agent_id) {
            agentId = link.agent_id;
            phoneToAgentId.set(receiverPhone, agentId);
        }
    }
    if (!agentId) {
        await message.reply('Agente não identificado. Escaneie o QR novamente.');
        return;
    }
    try {
        const { data: trainingData, error } = await supabase
            .from('agent_training_data')
            .select('about, products_services, faq, short_questions, short_answer')
            .eq('agent_id', agentId)
            .maybeSingle();
        if (error || !trainingData) {
            console.error('[SUPABASE] Erro ou dados ausentes:', error);
            await message.reply('Erro ao buscar dados do agente 😕');
            return;
        }
        const contextParts = [];
        if (trainingData.about)
            contextParts.push(`Sobre a empresa: ${trainingData.about}`);
        if (trainingData.products_services)
            contextParts.push(`Produtos e serviços: ${trainingData.products_services}`);
        if (trainingData.faq)
            contextParts.push(`FAQ: ${trainingData.faq}`);
        if (trainingData.short_questions && trainingData.short_answer) {
            contextParts.push(`Pergunta: ${trainingData.short_questions} Resposta: ${trainingData.short_answer}`);
        }
        const context = contextParts.join('\n');
        const completion = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [
                { role: 'system', content: `Você é um assistente virtual. Use o contexto:\n${context}` },
                { role: 'user', content: message.body },
            ],
            max_tokens: 300,
        });
        const reply = completion.choices[0]?.message?.content ?? 'Desculpe, não entendi.';
        await message.reply(reply);
    }
    catch (err) {
        console.error('[ERRO] Ao processar resposta:', err);
        await message.reply('Erro ao processar sua pergunta. Tente novamente.');
    }
}
// ROTAS EXPRESS
app.get('/qr', (req, res) => {
    const id = req.query.id;
    if (id) {
        lastAgentIdScanned = id;
        console.log('[AGENT_ID] Recebido via query:', id);
    }
    if (isClientReady) {
        return res.json({ message: 'Cliente já conectado ao WhatsApp.' });
    }
    if (latestQr) {
        return res.json({ qrImage: latestQr });
    }
    if (!isInitializing) {
        console.log('[CLIENT] Inicializando cliente para gerar QR...');
        initializeClient();
    }
    return res.status(202).json({ message: 'QR Code ainda não gerado. Aguarde...' });
});
app.get('/status', (req, res) => {
    return res.json({ ready: isClientReady });
});
app.post('/send-message', async (req, res) => {
    const { phone, message } = req.body || {};
    if (!phone || !message) {
        return res.status(400).json({ error: 'phone e message são obrigatórios' });
    }
    if (!isClientReady || !client.info) {
        console.warn('[SEND] Cliente ainda não conectado ao WhatsApp.');
        return res.status(503).json({ error: 'Cliente WhatsApp não está pronto' });
    }
    const chatId = `${phone}@c.us`;
    try {
        await client.sendMessage(chatId, message);
        console.log(`[SEND] Mensagem enviada para ${chatId}: ${message}`);
        return res.json({ status: 'message_sent', to: phone });
    }
    catch (err) {
        console.error('[ERRO] Enviando mensagem:', err);
        return res.status(500).json({ error: 'Erro ao enviar mensagem' });
    }
});
app.listen(port, () => {
    console.log(`[API] Backend rodando em http://localhost:${port}`);
});

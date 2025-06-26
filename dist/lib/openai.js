// src/lib/openai.ts
import { OpenAI } from 'openai';
import getOpenAIRandomApiKey from './utils.js';
const openai = new OpenAI({
    apiKey: getOpenAIRandomApiKey(),
    dangerouslyAllowBrowser: true, // Apenas se rodar do frontend (não recomendado em produção)
});
export default openai;

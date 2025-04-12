
import React, { useState } from 'react';
import DashboardHeader from '@/components/DashboardHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, Send, Plus, Settings, MessageSquare, Play, VolumeX, Volume2 } from 'lucide-react';

const AgentPage = () => {
  const [messages, setMessages] = useState([
    { id: 1, role: 'ai', content: 'Olá! Como posso ajudar você hoje?' },
  ]);
  const [message, setMessage] = useState('');
  const [ttsEnabled, setTtsEnabled] = useState(false);

  const handleSendMessage = () => {
    if (message.trim()) {
      // Adiciona a mensagem do usuário ao chat
      setMessages([
        ...messages,
        { id: Date.now(), role: 'user', content: message },
      ]);
      
      // Simula uma resposta da IA (em um app real, isto seria uma chamada à API)
      setTimeout(() => {
        setMessages(prevMessages => [
          ...prevMessages,
          { 
            id: Date.now(), 
            role: 'ai', 
            content: 'Esta é uma resposta simulada do agente de IA. Em uma implementação real, essa resposta viria de um modelo de linguagem como GPT ou de um sistema personalizado.'
          },
        ]);
      }, 1000);
      
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader title="Agente de IA" />
      
      <main className="flex-1 p-6 bg-gray-50">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Configure seu Assistente Virtual</h2>
          <p className="text-gray-600">Treine a IA para responder como você e automatize seu atendimento</p>
        </div>

        <Tabs defaultValue="simulator" className="w-full">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="simulator">Simulador</TabsTrigger>
            <TabsTrigger value="training">Treinamento</TabsTrigger>
            <TabsTrigger value="keywords">Palavras-chave</TabsTrigger>
            <TabsTrigger value="settings">Configurações</TabsTrigger>
          </TabsList>
          
          {/* Simulador de Chat */}
          <TabsContent value="simulator" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="col-span-2">
                <Card className="h-[600px] flex flex-col border-gray-200">
                  <CardHeader className="border-b">
                    <CardTitle className="flex items-center gap-2">
                      <Bot className="text-luxfy-purple" size={20} />
                      Simulador de Chat
                    </CardTitle>
                    <CardDescription>Teste como seu agente de IA responde às perguntas</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 overflow-auto p-4">
                    <div className="space-y-4 py-2">
                      {messages.map(msg => (
                        <div
                          key={msg.id}
                          className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[80%] rounded-lg px-4 py-2 ${
                              msg.role === 'user'
                                ? 'bg-luxfy-purple text-white'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {msg.content}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="border-t p-4">
                    <div className="flex w-full items-center space-x-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="text-gray-500 hover:text-luxfy-purple"
                        onClick={() => setTtsEnabled(!ttsEnabled)}
                      >
                        {ttsEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
                      </Button>
                      <Textarea
                        placeholder="Digite sua mensagem..."
                        className="flex-1 resize-none"
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                      />
                      <Button 
                        onClick={handleSendMessage} 
                        size="icon" 
                        className="bg-luxfy-purple hover:bg-luxfy-darkPurple"
                      >
                        <Send size={18} />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </div>

              <div>
                <Card className="border-gray-200">
                  <CardHeader>
                    <CardTitle>Configurações do Simulador</CardTitle>
                    <CardDescription>Ajuste parâmetros para testar diferentes cenários</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Nome do Cliente</label>
                      <Input placeholder="Ex: João Silva" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Produto de Interesse</label>
                      <Input placeholder="Ex: Plano Pro" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Cenário de Teste</label>
                      <select className="w-full border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-luxfy-purple focus:border-transparent">
                        <option>Dúvida sobre preços</option>
                        <option>Suporte técnico</option>
                        <option>Informação sobre produto</option>
                        <option>Reclamação</option>
                        <option>Agendamento</option>
                      </select>
                    </div>
                    <Button className="w-full bg-luxfy-purple hover:bg-luxfy-darkPurple">
                      <Play className="mr-2" size={16} /> Iniciar Simulação
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-gray-200 mt-6">
                  <CardHeader>
                    <CardTitle>Desempenho do Agente</CardTitle>
                    <CardDescription>Métricas de eficiência do seu assistente</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Precisão das Respostas</span>
                        <span className="text-sm font-medium">92%</span>
                      </div>
                      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: '92%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Tempo Médio de Resposta</span>
                        <span className="text-sm font-medium">1.2s</span>
                      </div>
                      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Taxa de Transferência</span>
                        <span className="text-sm font-medium">15%</span>
                      </div>
                      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500 rounded-full" style={{ width: '15%' }}></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          {/* Treinamento */}
          <TabsContent value="training" className="space-y-6">
            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle>Treinamento de IA</CardTitle>
                <CardDescription>Forneça informações para que seu agente aprenda a responder melhor</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="text-base font-medium">Sobre sua Empresa</label>
                  <Textarea
                    className="min-h-[120px]"
                    placeholder="Descreva sua empresa, produtos/serviços, valores e diferenciais..."
                  />
                  <p className="text-sm text-gray-500">
                    Estas informações serão usadas para que o agente entenda seu negócio
                  </p>
                </div>
                
                <div className="space-y-2">
                  <label className="text-base font-medium">Produtos e Serviços</label>
                  <Textarea
                    className="min-h-[120px]"
                    placeholder="Liste seus produtos/serviços com descrições, preços e especificações..."
                  />
                  <p className="text-sm text-gray-500">
                    Quanto mais detalhes, melhor o agente poderá responder sobre sua oferta
                  </p>
                </div>
                
                <div className="space-y-2">
                  <label className="text-base font-medium">Perguntas Frequentes</label>
                  <Textarea
                    className="min-h-[120px]"
                    placeholder="Liste perguntas comuns dos clientes e suas respectivas respostas..."
                  />
                  <p className="text-sm text-gray-500">
                    Isto ajudará a treinar o agente para as consultas mais comuns
                  </p>
                </div>
                
                <div className="space-y-2">
                  <label className="text-base font-medium">Documentos de Treinamento</label>
                  <div className="border border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <div className="flex flex-col items-center">
                      <div className="mb-4 rounded-full bg-luxfy-purple/10 p-3">
                        <Plus className="h-6 w-6 text-luxfy-purple" />
                      </div>
                      <p className="mb-2 text-sm font-medium">
                        Clique para fazer upload ou arraste arquivos
                      </p>
                      <p className="text-xs text-gray-500">
                        PDF, DOC, TXT até 10MB
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">
                    Faça upload de manuais, catalógos ou outros documentos
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button className="bg-luxfy-purple hover:bg-luxfy-darkPurple">
                  Salvar e Treinar
                </Button>
                <Button variant="outline">
                  Cancelar
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Palavras-chave */}
          <TabsContent value="keywords" className="space-y-6">
            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle>Palavras-chave e Respostas</CardTitle>
                <CardDescription>Configure respostas específicas para determinadas palavras-chave</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Palavras-chave ativas</h3>
                    <Button className="bg-luxfy-purple hover:bg-luxfy-darkPurple">
                      <Plus className="mr-2" size={16} /> Adicionar Nova
                    </Button>
                  </div>
                  
                  <div className="rounded-md border">
                    <div className="p-4 border-b">
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <h4 className="font-medium mb-1">Palavras-chave</h4>
                          <p className="text-sm text-gray-600">preço, valor, custo, investimento</p>
                        </div>
                        <div className="col-span-2">
                          <h4 className="font-medium mb-1">Resposta</h4>
                          <p className="text-sm text-gray-600">Nossos planos começam a partir de R$97/mês para o plano Starter. O plano Pro custa R$197/mês e o Premium R$497/mês. Precisa de mais detalhes sobre algum deles?</p>
                        </div>
                      </div>
                      <div className="flex justify-end gap-2 mt-4">
                        <Button variant="ghost" size="sm">Editar</Button>
                        <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">Remover</Button>
                      </div>
                    </div>
                    
                    <div className="p-4 border-b">
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <h4 className="font-medium mb-1">Palavras-chave</h4>
                          <p className="text-sm text-gray-600">horário, atendimento, expediente</p>
                        </div>
                        <div className="col-span-2">
                          <h4 className="font-medium mb-1">Resposta</h4>
                          <p className="text-sm text-gray-600">Nosso horário de atendimento é de segunda a sexta, das 9h às 18h. Aos sábados atendemos das 9h às 13h. Fora desses horários você pode deixar sua mensagem e retornaremos no próximo dia útil.</p>
                        </div>
                      </div>
                      <div className="flex justify-end gap-2 mt-4">
                        <Button variant="ghost" size="sm">Editar</Button>
                        <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">Remover</Button>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <h4 className="font-medium mb-1">Palavras-chave</h4>
                          <p className="text-sm text-gray-600">suporte, ajuda, problema, erro</p>
                        </div>
                        <div className="col-span-2">
                          <h4 className="font-medium mb-1">Resposta</h4>
                          <p className="text-sm text-gray-600">Para suporte técnico, por favor informe qual o problema que está enfrentando. Nossa equipe técnica está disponível para ajudar via chat ou pelo e-mail suporte@empresa.com.</p>
                        </div>
                      </div>
                      <div className="flex justify-end gap-2 mt-4">
                        <Button variant="ghost" size="sm">Editar</Button>
                        <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">Remover</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Configurações */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle>Configurações do Agente</CardTitle>
                <CardDescription>Personalize o comportamento do seu assistente virtual</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Nome do Agente</label>
                    <Input defaultValue="Assistente" />
                    <p className="text-xs text-gray-500">
                      Como seu agente se apresentará aos clientes
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Língua Principal</label>
                    <select className="w-full border border-gray-200 rounded-md p-2">
                      <option>Português (Brasil)</option>
                      <option>English (US)</option>
                      <option>Español</option>
                    </select>
                    <p className="text-xs text-gray-500">
                      Idioma principal usado pelo agente
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tom de Voz</label>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <input type="radio" id="formal" name="tone" className="peer hidden" defaultChecked />
                      <label htmlFor="formal" className="block cursor-pointer select-none rounded-md border border-gray-200 p-3 text-center peer-checked:border-luxfy-purple peer-checked:bg-luxfy-purple/10">
                        Formal
                      </label>
                    </div>
                    <div>
                      <input type="radio" id="casual" name="tone" className="peer hidden" />
                      <label htmlFor="casual" className="block cursor-pointer select-none rounded-md border border-gray-200 p-3 text-center peer-checked:border-luxfy-purple peer-checked:bg-luxfy-purple/10">
                        Casual
                      </label>
                    </div>
                    <div>
                      <input type="radio" id="friendly" name="tone" className="peer hidden" />
                      <label htmlFor="friendly" className="block cursor-pointer select-none rounded-md border border-gray-200 p-3 text-center peer-checked:border-luxfy-purple peer-checked:bg-luxfy-purple/10">
                        Amigável
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Estilo de Resposta</label>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <input type="radio" id="concise" name="style" className="peer hidden" />
                      <label htmlFor="concise" className="block cursor-pointer select-none rounded-md border border-gray-200 p-3 text-center peer-checked:border-luxfy-purple peer-checked:bg-luxfy-purple/10">
                        Conciso
                      </label>
                    </div>
                    <div>
                      <input type="radio" id="balanced" name="style" className="peer hidden" defaultChecked />
                      <label htmlFor="balanced" className="block cursor-pointer select-none rounded-md border border-gray-200 p-3 text-center peer-checked:border-luxfy-purple peer-checked:bg-luxfy-purple/10">
                        Balanceado
                      </label>
                    </div>
                    <div>
                      <input type="radio" id="detailed" name="style" className="peer hidden" />
                      <label htmlFor="detailed" className="block cursor-pointer select-none rounded-md border border-gray-200 p-3 text-center peer-checked:border-luxfy-purple peer-checked:bg-luxfy-purple/10">
                        Detalhado
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Integrações</label>
                  <div className="rounded-md border p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <MessageSquare className="text-green-500" size={20} />
                        <div>
                          <p className="font-medium">WhatsApp</p>
                          <p className="text-sm text-gray-500">Conectado • +55 11 99999-9999</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Configurar</Button>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Integração com ElevenLabs (Voz)</label>
                  <div className="rounded-md border p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <Volume2 className="text-gray-400" size={20} />
                        <div>
                          <p className="font-medium">Text-to-Speech</p>
                          <p className="text-sm text-gray-500">Não configurado • Opcional</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Configurar</Button>
                    </div>
                    <p className="text-xs text-amber-600 mt-2">
                      Nota: Esta integração requer uma chave API do ElevenLabs e terá custo adicional.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Configurações Avançadas</label>
                  <div className="flex items-center justify-between border rounded-md p-4">
                    <div>
                      <p className="font-medium">Transferir para humano se a confiança for baixa</p>
                      <p className="text-sm text-gray-500">Encaminha para atendentes humanos quando a IA tem dúvidas</p>
                    </div>
                    <div className="flex h-6 items-center">
                      <input
                        id="human-transfer"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-luxfy-purple focus:ring-luxfy-purple"
                        defaultChecked
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Cancelar</Button>
                <Button className="bg-luxfy-purple hover:bg-luxfy-darkPurple">
                  <Settings className="mr-2" size={16} /> Salvar Configurações
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AgentPage;

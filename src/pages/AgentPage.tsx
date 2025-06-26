import React, { useEffect, useState } from 'react';
import DashboardHeader from '@/components/DashboardHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, Send, Plus, Settings, MessageSquare, Play, VolumeX, Volume2, Upload, Clock, Trash2, QrCode, Loader2 } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import openai from '@/lib/openai';
import { ChatCompletionAssistantMessageParam, ChatCompletionMessageParam } from 'openai/resources/index.mjs';
import { supabase } from '@/lib/supabase';
import { useAgentQA } from '@/hooks/use-agent-qa';
import { useAgentTraining } from "@/hooks/use-agent-training";
import { useAgents } from '@/hooks/use-agent';
import { toast } from '@/hooks/use-toast';
import { useLocation } from 'react-router-dom';
import QrCodeScanner from '@/hooks/use-agente-qrcode';
import { v4 as uuidv4 } from 'uuid';
const apiUrl = import.meta.env.VITE_API_URL;


// no seu componente AgentPage:

type ChatMessage = {
  id: string;
  role: 'user' | 'system' | 'assistant';
  content: string;
};

const AgentPage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const agent_id = query.get('id');

  const fetchAgentQAs = async () => {
    if (!agent_id) return;

    const { data, error } = await supabase
      .from('agent_training_data')
      .select('short_questions, short_answer')
      .eq('agent_id', agent_id)
      .single();

    if (error) {
      console.error("Erro ao buscar QA:", error);
      return;
    }

    const questions = data.short_questions?.split('\n- ').filter(Boolean) ?? [];
    const answers = data.short_answer?.split('\n- ').filter(Boolean) ?? [];

    const result = questions.map((question, index) => ({
      question: question.trim(),
      answer: answers[index]?.trim() || 'Sem resposta',
    }));

    setQAList(result);
  };

  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: uuidv4(), role: 'assistant', content: 'Olá! Como posso ajudar você hoje?' },
  ]);
  const [message, setMessage] = useState('');
  const [ttsEnabled, setTtsEnabled] = useState(false);
  const [responseDelay, setResponseDelay] = useState(1);
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [trainingData, setTrainingData] = useState({
    about: '',
    products_services: '',
    faq: '',
  });
  const [qaList, setQAList] = useState<{ question: string; answer: string }[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editQuestion, setEditQuestion] = useState('');
  const [editAnswer, setEditAnswer] = useState('');
  const { agents } = useAgents();

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    setLoading(true);

    const userMessage: ChatMessage = {
      id: uuidv4(),
      role: 'user',
      content: message,
    };

    setMessages(prev => [...prev, userMessage]); // <- aqui uso prev

    setMessage('');

    try {
      const { data: trainingData, error } = await supabase
        .from('agent_training_data')
        .select('about, products_services, faq, short_questions, short_answer')
        .eq('agent_id', agent_id)
        .maybeSingle();

      if (error || !trainingData) {
        throw new Error('Erro ao buscar dados de treinamento do agente');
      }

      const context = buildContext(trainingData);
      const openaiMessages = formatMessagesForOpenAI(
        [...messages, userMessage],
        context
      );

      const completion = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: openaiMessages,
        max_tokens: 500,
      });

      const aiContent = completion.choices[0]?.message?.content ?? 'Sem resposta.';
      const aiMessage: ChatMessage = {
        id: uuidv4(),
        role: 'system',
        content: aiContent,
      };

      setTimeout(() => {
        setMessages(prev => [...prev, aiMessage]);
        if (ttsEnabled) speak(aiContent);
      }, responseDelay * 1000);

    } catch (err) {
      console.error('Erro ao consultar OpenAI:', err);
      setMessages(prev => [
        ...prev,
        { id: uuidv4(), role: 'system', content: 'Erro ao gerar resposta da IA.' },
      ]);
    } finally {
      setLoading(false);
    }
  };


  const buildContext = (data) => `
    Sobre a empresa: ${trainingData.about || 'N/A'}
    Produtos e Serviços: ${trainingData.products_services || 'N/A'}
    FAQ: ${trainingData.faq || 'N/A'}
    Perguntas e Respostas Curtas: ${data.short_questions || 'N/A'}
    Respostas Curtas: ${data.short_answer || 'N/A'}
  `;

  const formatMessagesForOpenAI = (
    messages: ChatMessage[],
    context: string
  ): ChatCompletionMessageParam[] => {
    const systemMessage: ChatCompletionMessageParam = {
      role: 'system',
      content: `Você é um assistente virtual treinado com as seguintes informações: ${context}`,
    };

    const formattedMessages: ChatCompletionMessageParam[] = messages.map(m => {
      if (m.role === 'user') {
        return {
          role: 'user',
          content: m.content,
        } as ChatCompletionMessageParam;
      }

      return {
        role: 'assistant',
        content: m.content,
      } as ChatCompletionAssistantMessageParam;
    });

    return [systemMessage, ...formattedMessages];
  };

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };


  const { handleAddQA, handleEditQA, handleRemoveQA } = useAgentQA(agent_id, fetchAgentQAs);
  const { trainAgent } = useAgentTraining();

  const startEditing = (index: number) => {
    setEditIndex(index);
    setEditQuestion(qaList[index].question);
    setEditAnswer(qaList[index].answer);
  };

  const cancelEditing = () => {
    setEditIndex(null);
    setEditQuestion('');
    setEditAnswer('');
  };


  const deleteAgentById = async (agentId: string) => {
    const { error: trainingError } = await supabase
      .from('agent_training_data')
      .delete()
      .eq('agent_id', agentId);

    if (trainingError) throw trainingError;
    const { error: agentError } = await supabase
      .from('ai_agents')
      .delete()
      .eq('id', agentId);

    if (agentError) throw agentError;
  };

  const handleDeleteAgent = async (agent_id: string) => {
    try {
      await deleteAgentById(agent_id);
      toast({
        title: "Agente(s) excluído(s)!",
        description: "Todos os agentes foram excluídos com sucesso.",
      });

    } catch (error) {
      console.error("Erro ao excluir agente:", error);
      toast({
        title: "Erro ao excluir",
        description: "Não foi possível excluir um ou mais agentes.",
      });
    }
  };

  const handleTrainAgent = () => {
    trainAgent(agent_id, trainingData);
  };

  const handleGenerateQrCode = async () => {
    // Remove mensagens antigas de status e adiciona "Gerando QR Code..."
    setMessages(prevMessages => {
      const filtered = prevMessages.filter(
        msg => msg.content !== 'Gerando QR Code...' && msg.content !== 'QR Code gerado!'
      );
      return [
        ...filtered,
        { id: agent_id, role: 'system', content: 'Gerando QR Code...' },
      ];
    });

    try {
      const response = await fetch(`${apiUrl}/qr?id=${agent_id}`);
      if (!response.ok) throw new Error('QR Code ainda não disponível');
      await response.json();
      setMessages(prev => {
        const filtered = prev.filter(msg => msg.content === 'system');
        return [
          ...filtered,
          { id: uuidv4(), role: 'system', content: '__qr_code__' },
          { id: uuidv4(), role: 'system', content: 'QR Code gerado!' },
        ];
      });
    } catch (error) {
      setMessages(prev => {
        const filtered = prev.filter(msg => msg.content !== 'Gerando QR Code...');
        return [
          ...filtered,
          { id: uuidv4(), role: 'system', content: 'Erro ao gerar QR Code.' },
        ];
      });
    }
  };

  useEffect(() => {
    if (agent_id) {
      fetchAgentQAs();
    }
  }, [agents]);

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader title="Agente de IA" />
      
      <main className="flex-1 p-6 bg-gray-50 dark:bg-gray-900">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Configure seu Assistente Virtual</h2>
          <p className="text-gray-600 dark:text-gray-300">Treine a IA para responder como você e automatize seu atendimento</p>
        </div>

        <Tabs defaultValue="simulator" className="w-full">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="simulator">Simulador</TabsTrigger>
            <TabsTrigger value="training">Treinamento</TabsTrigger>
            <TabsTrigger value="learning">Aprendizagem</TabsTrigger>
            <TabsTrigger value="settings">Configurações</TabsTrigger>
          </TabsList>
          
          {/* Simulador de Chat */}
          <TabsContent value="simulator" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Simulador de Chat ocupa 2 colunas */}
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
                      {messages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[80%] rounded-lg px-4 py-2 ${
                              msg.role === 'user'
                                ? 'bg-luxfy-purple text-white'
                                : 'bg-gray-100 text-gray-800'
                            } flex flex-col items-center`}
                          >
                              {msg.content === 'Gerando QR Code...' || msg.content === 'QR Code gerado!' ? (
                                <span className="text-sm italic text-gray-500 flex items-center gap-2">
                                  {msg.content === 'Gerando QR Code...' && (
                                    <Loader2 className="animate-spin h-4 w-4" />
                                  )}
                                  {msg.content}
                                </span>
                              ) : msg.role === 'system' && msg.content === '__qr_code__' ? (
                                <QrCodeScanner messages={messages} />
                              ) : (
                                msg.content
                              )}

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
                        // onKeyDown={handleKeyDown}
                      />
                      <Button 
                        onClick={handleSendMessage}
                        disabled={loading}
                        size="icon" 
                        className="bg-luxfy-purple hover:bg-luxfy-darkPurple"
                      >
                        <Send size={18} />
                      </Button>
                      <Button 
                        onClick={handleGenerateQrCode}
                        size="icon"
                        variant="ghost"
                        className="text-gray-500 hover:text-luxfy-purple"
                      >
                        <QrCode size={20} />
                      </Button>

                    </div>
                  </CardFooter>
                </Card>
              </div>

              {/* Painel lateral ocupa 1 coluna */}
              <div>
                <Card className="border-gray-200 mb-6">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Delay de Resposta
                    </CardTitle>
                    <CardDescription>Personalize o tempo de resposta da IA</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="delay">Delay em segundos: {responseDelay}s</Label>
                      <Input
                        id="delay"
                        type="number"
                        min="0"
                        max="10"
                        step="0.5"
                        value={responseDelay}
                        onChange={(e) => setResponseDelay(Number(e.target.value))}
                      />
                      <p className="text-xs text-gray-500">
                        Simula o tempo de "digitação" da IA
                      </p>
                    </div>
                  </CardContent>
                </Card>

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
                    value={trainingData.about}
                    onChange={(e) =>  
                      setTrainingData({ ...trainingData, about: e.target.value })
                    }
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
                    value={trainingData.products_services}
                    onChange={(e) =>  
                      setTrainingData({ ...trainingData, products_services: e.target.value })
                    }
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
                    value={trainingData.faq}
                    onChange={(e) =>  
                      setTrainingData({ ...trainingData, faq: e.target.value })
                    }
                  />
                  <p className="text-sm text-gray-500">
                    Isto ajudará a treinar o agente para as consultas mais comuns
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button
                onClick={handleTrainAgent} 
                className="bg-luxfy-purple hover:bg-luxfy-darkPurple">
                  Salvar e Treinar
                </Button>
                <Button variant="outline">
                  Cancelar
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Nova aba Aprendizagem - Enhanced with file upload */}
          <TabsContent value="learning" className="space-y-6">
            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle>Aprendizagem por Perguntas e Respostas</CardTitle>
                <CardDescription>Configure respostas específicas para seu agente</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Perguntas e Respostas</h3>
                    <Button 
                      className="bg-luxfy-purple hover:bg-luxfy-darkPurple"
                      onClick={() => setShowAddForm(true)}
                    >
                      <Plus className="mr-2" size={16} /> Adicionar Nova
                    </Button>
                  </div>

                  {showAddForm && (
                    <Card className="border-2 border-luxfy-purple/20">
                      <CardHeader>
                        <CardTitle className="text-lg">Nova Pergunta e Resposta</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label htmlFor="question">Pergunta</Label>
                          <Textarea
                            id="question"
                            placeholder="Digite a pergunta..."
                            value={newQuestion}
                            onChange={(e) => setNewQuestion(e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="answer">Resposta</Label>
                          <Textarea
                            id="answer"
                            placeholder="Digite a resposta..."
                            value={newAnswer}
                            onChange={(e) => setNewAnswer(e.target.value)}
                          />
                        </div>
                        <div>
                          <Label>Arquivo de Referência (Opcional)</Label>
                          <div className="border border-dashed border-gray-300 rounded-lg p-4 text-center">
                            <div className="flex flex-col items-center">
                              <Upload className="h-8 w-8 text-gray-400 mb-2" />
                              <p className="text-sm text-gray-600">Clique para fazer upload</p>
                              <p className="text-xs text-gray-500">PDF, DOC, TXT até 5MB</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button onClick={() => handleAddQA(newQuestion, newAnswer, () => {
                            setNewQuestion('');
                            setNewAnswer('');
                            setShowAddForm(false);
                          })}>
                            Salvar
                          </Button>
                          <Button variant="outline" onClick={() => setShowAddForm(false)}>Cancelar</Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                  
                  <div className="space-y-4">
                      {qaList.map((item, index) => (
                        <Card key={index} className="border dark:border-gray-700">
                          <CardContent className="p-4">
                            <div className="space-y-3">
                              <div>
                                <h4 className="font-medium mb-1">Pergunta</h4>
                                {editIndex === index ? (
                                  <textarea
                                    className="w-full p-2 border rounded"
                                    value={editQuestion}
                                    onChange={e => setEditQuestion(e.target.value)}
                                  />
                                ) : (
                                  <p className="text-sm text-gray-600 dark:text-gray-300">{item.question}</p>
                                )}
                              </div>

                              <div>
                                <h4 className="font-medium mb-1">Resposta</h4>
                                {editIndex === index ? (
                                  <textarea
                                    className="w-full p-2 border rounded"
                                    value={editAnswer}
                                    onChange={e => setEditAnswer(e.target.value)}
                                  />
                                ) : (
                                  <p className="text-sm text-gray-600 dark:text-gray-300">{item.answer}</p>
                                )}
                              </div>

                              <div className="flex items-center justify-between pt-2 border-t">
                                <div className="flex items-center space-x-2">
                                  <Switch checked={true} /> {/* Ajuste se quiser tornar dinâmico */}
                                  <Label className="text-sm">Resposta Exata</Label>
                                </div>

                                <div className="flex gap-2">
                                  <Button variant="ghost" size="sm">
                                    <Upload className="h-4 w-4 mr-1" />
                                    Arquivo
                                  </Button>

                                  {editIndex === index ? (
                                    <>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => {
                                          handleEditQA(index, editQuestion, editAnswer);
                                          cancelEditing();
                                        }}
                                      >
                                        Salvar
                                      </Button>
                                      <Button variant="ghost" size="sm" onClick={cancelEditing}>
                                        Cancelar
                                      </Button>
                                    </>
                                  ) : (
                                    <Button variant="ghost" size="sm" onClick={() => startEditing(index)}>
                                      Editar
                                    </Button>
                                  )}

                                  <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="text-red-500"
                                      onClick={() => handleRemoveQA(index)}
                                    >
                                      Remover
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Configurações - Enhanced with agent deletion and response delay */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="border-gray-200 dark:border-gray-700">
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
                    <select className="w-full border border-gray-200 rounded-md p-2 dark:border-gray-600 dark:bg-gray-800">
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
                  <label className="text-sm font-medium">Delay de Resposta (segundos)</label>
                  <div className="flex items-center space-x-4">
                    <Input
                      type="number"
                      min="0"
                      max="10"
                      step="0.5"
                      value={responseDelay}
                      onChange={(e) => setResponseDelay(Number(e.target.value))}
                      className="w-32"
                    />
                    <span className="text-sm text-gray-600">{responseDelay}s - Simula tempo de digitação</span>
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
                  <label className="text-sm font-medium">Integrações WhatsApp</label>
                  <div className="space-y-3">
                    <Card className="border">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <MessageSquare className="text-green-500" size={20} />
                            <div>
                              <p className="font-medium">API Oficial do WhatsApp</p>
                              <p className="text-sm text-gray-500">Integração via WhatsApp Business API</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">Configurar API</Button>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="border">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <QrCode className="text-green-500" size={20} />
                            <div>
                              <p className="font-medium">QR Code WhatsApp</p>
                              <p className="text-sm text-gray-500">Conexão rápida via QR Code</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">Gerar QR Code</Button>
                        </div>
                      </CardContent>
                    </Card>
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
                
                <div className="border-t pt-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-red-600">Zona de Perigo</h3>
                    <div className="p-4 border border-red-200 rounded-lg bg-red-50 dark:bg-red-900/20 dark:border-red-800">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-red-800 dark:text-red-400">Excluir Agente</h4>
                          <p className="text-sm text-red-600 dark:text-red-300 mt-1">
                            Esta ação não pode ser desfeita. Todos os dados de treinamento e configurações serão perdidos permanentemente.
                          </p>
                        </div>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button 
                              variant="destructive" size="sm"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Excluir Agente
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
                              <AlertDialogDescription>
                                Tem certeza que deseja excluir este agente? Esta ação é irreversível e todos os dados serão perdidos.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-red-600 hover:bg-red-700"
                                onClick={() => handleDeleteAgent(agent_id)}
                              >
                                Excluir Permanentemente
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
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

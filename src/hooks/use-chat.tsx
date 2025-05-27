
import { useState, useEffect } from 'react';
import { Chat, ChatMessage, ChatUser } from '@/types/chat';
import { useAuth } from '@/contexts/AuthContext';

// Mock data para demonstração
const mockUsers: ChatUser[] = [
  {
    id: '1',
    name: 'João Silva',
    phone: '+55 11 99999-1111',
    tags: ['cliente', 'premium'],
    lastSeen: new Date(),
    isOnline: true,
  },
  {
    id: '2',
    name: 'Maria Santos',
    phone: '+55 11 99999-2222',
    tags: ['prospect', 'interessado'],
    lastSeen: new Date(Date.now() - 300000), // 5 min ago
    isOnline: false,
  },
  {
    id: '3',
    name: 'Pedro Costa',
    phone: '+55 11 99999-3333',
    tags: ['suporte'],
    lastSeen: new Date(Date.now() - 3600000), // 1 hour ago
    isOnline: false,
  },
];

const mockMessages: ChatMessage[] = [
  {
    id: '1',
    chatId: '1',
    senderId: '1',
    content: 'Olá! Gostaria de saber mais sobre seus serviços.',
    type: 'text',
    timestamp: new Date(Date.now() - 600000),
    isFromUser: true,
  },
  {
    id: '2',
    chatId: '1',
    senderId: 'ai',
    content: 'Olá João! Fico feliz em ajudar. Oferecemos soluções de IA para automatizar seu atendimento. Que tipo de negócio você tem?',
    type: 'text',
    timestamp: new Date(Date.now() - 580000),
    isFromUser: false,
  },
];

export const useChat = () => {
  const { user } = useAuth();
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages);

  useEffect(() => {
    // Inicializar chats mock
    const mockChats: Chat[] = mockUsers.map(chatUser => ({
      id: chatUser.id,
      userId: user?.id || '',
      user: chatUser,
      messages: messages.filter(msg => msg.chatId === chatUser.id),
      lastMessage: messages.filter(msg => msg.chatId === chatUser.id).pop(),
      unreadCount: chatUser.id === '1' ? 0 : Math.floor(Math.random() * 3),
      aiEnabled: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    
    setChats(mockChats);
  }, [user, messages]);

  const sendMessage = (chatId: string, content: string, type: 'text' | 'audio' | 'file' = 'text') => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      chatId,
      senderId: 'me',
      content,
      type,
      timestamp: new Date(),
      isFromUser: false,
    };

    setMessages(prev => [...prev, newMessage]);

    // Simular resposta da IA após 1-2 segundos
    if (chats.find(chat => chat.id === chatId)?.aiEnabled) {
      setTimeout(() => {
        const aiResponse: ChatMessage = {
          id: (Date.now() + 1).toString(),
          chatId,
          senderId: 'ai',
          content: 'Esta é uma resposta automática da IA. Em um sistema real, isso seria processado pelo modelo de linguagem configurado.',
          type: 'text',
          timestamp: new Date(),
          isFromUser: false,
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 1000 + Math.random() * 1000);
    }
  };

  const toggleAI = (chatId: string) => {
    setChats(prev => prev.map(chat => 
      chat.id === chatId 
        ? { ...chat, aiEnabled: !chat.aiEnabled }
        : chat
    ));
  };

  const addTag = (chatId: string, tag: string) => {
    setChats(prev => prev.map(chat => 
      chat.id === chatId 
        ? { 
            ...chat, 
            user: { 
              ...chat.user, 
              tags: [...chat.user.tags, tag] 
            }
          }
        : chat
    ));
  };

  const removeTag = (chatId: string, tag: string) => {
    setChats(prev => prev.map(chat => 
      chat.id === chatId 
        ? { 
            ...chat, 
            user: { 
              ...chat.user, 
              tags: chat.user.tags.filter(t => t !== tag) 
            }
          }
        : chat
    ));
  };

  const selectedChat = chats.find(chat => chat.id === selectedChatId);
  const chatMessages = messages.filter(msg => msg.chatId === selectedChatId);

  return {
    chats,
    selectedChat,
    selectedChatId,
    setSelectedChatId,
    messages: chatMessages,
    sendMessage,
    toggleAI,
    addTag,
    removeTag,
  };
};

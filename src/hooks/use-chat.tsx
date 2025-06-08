import { useState, useEffect } from 'react';
import { Chat, ChatMessage, ChatUser } from '@/types/chat';
import { useAuth } from '@/contexts/AuthContext';
import openai from '@/lib/openai';
import { ChatCompletionMessageParam } from 'openai/resources/chat/index';

export const useChat = () => {
  const { user } = useAuth();
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    if (user) {
      // Simula um contato por padrão ao iniciar (exemplo fixo)
      const newUser: ChatUser = {
        id: '1',
        name: 'Usuário',
        phone: 'N/A',
        tags: [],
        lastSeen: new Date(),
        isOnline: true,
      };

      const initialChat: Chat = {
        id: '1',
        userId: user.id,
        user: newUser,
        messages: [],
        lastMessage: undefined,
        unreadCount: 0,
        aiEnabled: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      setChats([initialChat]);
      setSelectedChatId('1');
    }
  }, [user]);

const sendMessage = async (
  chatId: string,
  content: string,
  type: 'text' | 'audio' | 'file' = 'text'
) => {
  const newMessage: ChatMessage = {
    id: Date.now().toString(),
    chatId,
    senderId: 'me',
    content,
    type,
    timestamp: new Date(),
    isFromUser: true,
  };

  setMessages((prev) => [...prev, newMessage]);

  const conversationHistory: ChatCompletionMessageParam[] = messages
    .filter((msg) => msg.chatId === chatId)
    .map((msg) => ({
      role: msg.isFromUser ? 'user' : 'assistant',
      content: msg.content,
    }));

  const fullMessages: ChatCompletionMessageParam[] = [
    ...conversationHistory,
    {
      role: 'user',
      content,
    },
  ];

  try {
    const chatCompletion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: fullMessages,
    });

    const aiReply = chatCompletion.choices[0].message.content ?? 'Sem resposta.';

    const aiMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      chatId,
      senderId: 'ai',
      content: aiReply,
      type: 'text',
      timestamp: new Date(),
      isFromUser: false,
    };

    setMessages((prev) => [...prev, aiMessage]);
  } catch (err) {
    console.error('Erro ao chamar OpenAI:', err);
    setMessages((prev) => [
      ...prev,
      {
        id: (Date.now() + 2).toString(),
        chatId,
        senderId: 'ai',
        content: '⚠️ Erro ao tentar gerar resposta.',
        type: 'text',
        timestamp: new Date(),
        isFromUser: false,
      },
    ]);
  }
};

  const toggleAI = (chatId: string) => {
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === chatId ? { ...chat, aiEnabled: !chat.aiEnabled } : chat
      )
    );
  };

  const addTag = (chatId: string, tag: string) => {
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              user: {
                ...chat.user,
                tags: [...new Set([...chat.user.tags, tag])],
              },
            }
          : chat
      )
    );
  };

  const removeTag = (chatId: string, tag: string) => {
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              user: {
                ...chat.user,
                tags: chat.user.tags.filter((t) => t !== tag),
              },
            }
          : chat
      )
    );
  };

  const selectedChat = chats.find((chat) => chat.id === selectedChatId);
  const chatMessages = messages.filter((msg) => msg.chatId === selectedChatId);

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

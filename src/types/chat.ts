
export interface ChatUser {
  id: string;
  name: string;
  phone: string;
  avatar?: string;
  tags: string[];
  lastSeen: Date;
  isOnline: boolean;
}

export interface ChatMessage {
  id: string;
  chatId: string;
  senderId: string;
  content: string;
  type: 'text' | 'audio' | 'file' | 'image';
  timestamp: Date;
  isFromUser: boolean;
  fileUrl?: string;
  fileName?: string;
  audioUrl?: string;
  audioDuration?: number;
}

export interface Chat {
  id: string;
  userId: string;
  user: ChatUser;
  messages: ChatMessage[];
  lastMessage?: ChatMessage;
  unreadCount: number;
  aiEnabled: boolean;
  agentId?: string;
  createdAt: Date;
  updatedAt: Date;
}

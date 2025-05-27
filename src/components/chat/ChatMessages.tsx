
import React from 'react';
import { ChatMessage } from '@/types/chat';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { FileText, Download, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ChatMessagesProps {
  messages: ChatMessage[];
  userName: string;
  userAvatar?: string;
}

const ChatMessages = ({ messages, userName, userAvatar }: ChatMessagesProps) => {
  const [playingAudio, setPlayingAudio] = React.useState<string | null>(null);

  const renderMessageContent = (message: ChatMessage) => {
    switch (message.type) {
      case 'audio':
        return (
          <div className="flex items-center gap-2 bg-white/10 p-2 rounded">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setPlayingAudio(playingAudio === message.id ? null : message.id)}
              className="h-8 w-8 p-0"
            >
              {playingAudio === message.id ? <Pause size={16} /> : <Play size={16} />}
            </Button>
            <div className="flex-1 text-sm">
              Áudio {message.audioDuration ? `(${message.audioDuration}s)` : ''}
            </div>
          </div>
        );
      
      case 'file':
        return (
          <div className="flex items-center gap-2 bg-white/10 p-2 rounded">
            <FileText size={20} />
            <div className="flex-1">
              <p className="text-sm font-medium">{message.fileName}</p>
            </div>
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
              <Download size={16} />
            </Button>
          </div>
        );
      
      case 'image':
        return (
          <div className="max-w-xs">
            <img 
              src={message.fileUrl} 
              alt="Imagem" 
              className="rounded-lg max-w-full h-auto"
            />
          </div>
        );
      
      default:
        return <p className="text-sm">{message.content}</p>;
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map(message => (
        <div
          key={message.id}
          className={cn(
            "flex gap-3",
            message.isFromUser ? "justify-end" : "justify-start"
          )}
        >
          {!message.isFromUser && (
            <Avatar className="h-8 w-8 mt-1">
              <AvatarImage src={userAvatar} />
              <AvatarFallback className="bg-luxfy-purple/20 text-luxfy-purple text-xs">
                {message.senderId === 'ai' ? 'IA' : userName.split(' ').map(n => n[0]).join('').toUpperCase()}
              </AvatarFallback>
            </Avatar>
          )}
          
          <div className={cn(
            "max-w-[70%] rounded-lg p-3",
            message.isFromUser 
              ? "bg-luxfy-purple text-white" 
              : message.senderId === 'ai'
                ? "bg-blue-100 text-blue-900"
                : "bg-gray-100 text-gray-900"
          )}>
            {renderMessageContent(message)}
            
            <div className={cn(
              "text-xs mt-1 opacity-70",
              message.isFromUser ? "text-right" : "text-left"
            )}>
              {formatDistanceToNow(message.timestamp, { 
                addSuffix: true, 
                locale: ptBR 
              })}
              {message.senderId === 'ai' && (
                <span className="ml-2 font-medium">IA</span>
              )}
            </div>
          </div>

          {message.isFromUser && (
            <Avatar className="h-8 w-8 mt-1">
              <AvatarFallback className="bg-gray-200 text-gray-600 text-xs">
                EU
              </AvatarFallback>
            </Avatar>
          )}
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;

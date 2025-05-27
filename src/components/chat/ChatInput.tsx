
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Paperclip, Mic, Square, Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface ChatInputProps {
  onSendMessage: (content: string, type?: 'text' | 'audio' | 'file') => void;
  onToggleAI: () => void;
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
  aiEnabled: boolean;
  userTags: string[];
}

const ChatInput = ({ 
  onSendMessage, 
  onToggleAI, 
  onAddTag, 
  onRemoveTag,
  aiEnabled, 
  userTags 
}: ChatInputProps) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [newTag, setNewTag] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onSendMessage(`Arquivo enviado: ${file.name}`, 'file');
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      // Parar gravação
      setIsRecording(false);
      onSendMessage('Áudio gravado', 'audio');
    } else {
      // Iniciar gravação
      setIsRecording(true);
    }
  };

  const handleAddTag = () => {
    if (newTag.trim() && !userTags.includes(newTag.trim())) {
      onAddTag(newTag.trim());
      setNewTag('');
    }
  };

  return (
    <div className="border-t bg-white p-4 space-y-3">
      {/* Tags do usuário */}
      <div className="flex items-center gap-2 flex-wrap">
        <Tag size={16} className="text-gray-500" />
        {userTags.map(tag => (
          <Badge 
            key={tag} 
            variant="secondary" 
            className="bg-luxfy-purple/10 text-luxfy-purple cursor-pointer hover:bg-red-100 hover:text-red-600 transition-colors"
            onClick={() => onRemoveTag(tag)}
          >
            {tag} ×
          </Badge>
        ))}
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
              + Tag
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-60">
            <div className="space-y-2">
              <Input
                placeholder="Nova tag..."
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
              />
              <Button 
                onClick={handleAddTag} 
                size="sm" 
                className="w-full bg-luxfy-purple hover:bg-luxfy-darkPurple"
              >
                Adicionar Tag
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Controles da IA */}
      <div className="flex items-center gap-2">
        <Button
          onClick={onToggleAI}
          variant={aiEnabled ? "default" : "outline"}
          size="sm"
          className={aiEnabled ? "bg-luxfy-purple hover:bg-luxfy-darkPurple" : ""}
        >
          IA {aiEnabled ? 'Ativada' : 'Desativada'}
        </Button>
        {aiEnabled && (
          <span className="text-xs text-green-600">
            ✓ IA responderá automaticamente
          </span>
        )}
      </div>

      {/* Input de mensagem */}
      <div className="flex items-end gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => fileInputRef.current?.click()}
          className="text-gray-500 hover:text-luxfy-purple"
        >
          <Paperclip size={20} />
        </Button>
        
        <input
          ref={fileInputRef}
          type="file"
          hidden
          onChange={handleFileUpload}
          accept="*/*"
        />
        
        <div className="flex-1 relative">
          <Textarea
            placeholder="Digite sua mensagem..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className="resize-none pr-12 min-h-[40px] max-h-32"
            rows={1}
          />
        </div>
        
        <Button
          onClick={toggleRecording}
          variant={isRecording ? "destructive" : "ghost"}
          size="icon"
          className={isRecording ? "" : "text-gray-500 hover:text-luxfy-purple"}
        >
          {isRecording ? <Square size={20} /> : <Mic size={20} />}
        </Button>
        
        <Button
          onClick={handleSend}
          disabled={!message.trim()}
          size="icon"
          className="bg-luxfy-purple hover:bg-luxfy-darkPurple disabled:bg-gray-300"
        >
          <Send size={20} />
        </Button>
      </div>
    </div>
  );
};

export default ChatInput;

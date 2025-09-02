import { useState, useCallback } from "react";
import { ChatSession, ChatMessage } from "@/types/chat";

export const useChatHistory = () => {
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);

  const createNewChat = useCallback((firstMessage?: string) => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: firstMessage ? generateChatTitle(firstMessage) : "Новый чат",
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setChatSessions(prev => [newSession, ...prev]);
    setCurrentSessionId(newSession.id);
    return newSession.id;
  }, []);

  const addMessage = useCallback((sessionId: string, content: string, isUser: boolean) => {
    const message: ChatMessage = {
      id: Date.now().toString(),
      content,
      isUser,
      timestamp: new Date(),
    };

    setChatSessions(prev => prev.map(session => {
      if (session.id === sessionId) {
        const updatedSession = {
          ...session,
          messages: [...session.messages, message],
          updatedAt: new Date(),
        };
        
        // Обновляем заголовок чата если это первое сообщение пользователя
        if (isUser && session.messages.length === 0) {
          updatedSession.title = generateChatTitle(content);
        }
        
        return updatedSession;
      }
      return session;
    }));
  }, []);

  const getCurrentSession = useCallback(() => {
    return chatSessions.find(session => session.id === currentSessionId) || null;
  }, [chatSessions, currentSessionId]);

  const selectChat = useCallback((sessionId: string) => {
    setCurrentSessionId(sessionId);
  }, []);

  return {
    chatSessions,
    currentSessionId,
    getCurrentSession,
    createNewChat,
    addMessage,
    selectChat,
  };
};

function generateChatTitle(message: string): string {
  // Обрезаем длинные сообщения для заголовка
  const words = message.trim().split(' ').slice(0, 4);
  return words.join(' ') + (message.split(' ').length > 4 ? '...' : '');
}
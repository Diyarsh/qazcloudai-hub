import { useState, useEffect } from "react";
import { Send, Paperclip, Bot, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useChatHistory } from "@/hooks/useChatHistory";
import { useAuth } from "@/hooks/useAuth";
import { QazCloudLogo } from "@/components/ui/qazcloud-logo";
import { ArrowRight } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
export default function Chat() {
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
  const placeholders = ["Задать вопрос по документу...", "Записать голосовое сообщение...", "Получить финансовую консультацию...", "Юридический анализ...", "HR консультация...", "Введите ваш вопрос..."];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPlaceholder(prev => (prev + 1) % placeholders.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  const {
    user
  } = useAuth();
  const {
    chatSessions,
    currentSessionId,
    getCurrentSession,
    createNewChat,
    addMessage
  } = useChatHistory();
  const getUserName = () => {
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name.split(' ')[0];
    }
    if (user?.email) {
      return user.email.split('@')[0];
    }
    return "Пользователь";
  };
  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;
    let sessionId = currentSessionId;

    // Создаем новый чат если его нет
    if (!sessionId) {
      sessionId = createNewChat(inputMessage);
    }

    // Добавляем сообщение пользователя
    if (sessionId) {
      addMessage(sessionId, inputMessage, true);
      setInputMessage("");
      setIsLoading(true);

      // Симуляция ответа AI
      setTimeout(() => {
        const aiResponses = ["Понятно! Я помогу вам с этим вопросом. Какую именно информацию вы хотели бы получить?", "Отличный вопрос! Позвольте мне проанализировать это и предоставить подробный ответ.", "Я обработал ваш запрос. Вот что я могу предложить по этому поводу...", "Интересная задача! Давайте разберем это пошагово.", "Основываясь на вашем запросе, я рекомендую следующий подход к решению этой задачи."];
        const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
        addMessage(sessionId!, randomResponse, false);
        setIsLoading(false);
      }, 1000 + Math.random() * 2000);
    }
  };
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  const currentMessages = getCurrentSession()?.messages || [];
  return <div className="h-screen flex flex-col">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Messages */}
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="max-w-4xl mx-auto px-6 py-8">
              {currentMessages.length === 0 ? <div className="flex flex-col items-center justify-center h-full min-h-[60vh] space-y-8">
                  {/* Welcome Message */}
                  <div className="text-center space-y-4">
                    <h1 className="text-3xl font-bold text-foreground">AI-HUB</h1>
                  </div>

                  {/* Chat Input */}
                  <div className="w-full max-w-4xl">
                      <div className="relative">
                        <div className="absolute left-3 bottom-2 z-10">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-muted">
                                <Paperclip className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start" className="w-48">
                              <DropdownMenuItem>
                                📁 My Drive
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                📎 Upload File
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                📷 Take a photo
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                🎬 Sample Media
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        
                        <Textarea value={inputMessage} onChange={e => setInputMessage(e.target.value)} onKeyPress={handleKeyPress} placeholder={placeholders[currentPlaceholder]} className="min-h-[80px] max-h-[200px] resize-none pl-12 pr-12 transition-all duration-300" rows={2} disabled={isLoading} />
                        
                        <div className="absolute right-3 bottom-2">
                          <Button onClick={handleSendMessage} disabled={!inputMessage.trim() || isLoading} size="icon" className="h-8 w-8">
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                  </div>
                </div> : <div className="space-y-6">
                  {currentMessages.map(message => <div key={message.id} className={`flex gap-4 ${message.isUser ? "justify-end" : "justify-start"}`}>
                      {!message.isUser && <Avatar className="h-8 w-8 mt-1">
                          <AvatarFallback className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
                            <Bot className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>}
                      
                      <div className={`max-w-[80%] rounded-lg px-4 py-3 ${message.isUser ? "bg-primary text-primary-foreground ml-auto" : "bg-muted"}`}>
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        <div className="mt-2">
                          <span className="text-xs opacity-70">
                            {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                          </span>
                        </div>
                      </div>

                      {message.isUser && <Avatar className="h-8 w-8 mt-1">
                          <AvatarFallback className="bg-secondary">
                            <User className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>}
                    </div>)}
                  
                  {isLoading && <div className="flex gap-4 justify-start">
                      <Avatar className="h-8 w-8 mt-1">
                        <AvatarFallback className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="bg-muted rounded-lg px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span className="text-sm text-muted-foreground">AI думает...</span>
                        </div>
                      </div>
                    </div>}
                </div>}
            </div>
          </ScrollArea>
        </div>

        {/* Chat Input - only show when there are messages */}
        {currentMessages.length > 0 && <div className="border-t bg-background">
            <div className="max-w-4xl mx-auto p-6">
              <div className="relative">
                <div className="absolute left-3 bottom-2 z-10">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-muted">
                        <Paperclip className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-48">
                      <DropdownMenuItem>
                        📁 My Drive
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        📎 Upload File
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        📷 Take a photo
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        🎬 Sample Media
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                
                <Textarea value={inputMessage} onChange={e => setInputMessage(e.target.value)} onKeyPress={handleKeyPress} placeholder={placeholders[currentPlaceholder]} className="min-h-[80px] max-h-[200px] resize-none pl-12 pr-12 transition-all duration-300" rows={2} disabled={isLoading} />
                
                <div className="absolute right-3 bottom-2">
                  <Button onClick={handleSendMessage} disabled={!inputMessage.trim() || isLoading} size="icon" className="h-8 w-8">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>}
      </div>
    </div>;
}
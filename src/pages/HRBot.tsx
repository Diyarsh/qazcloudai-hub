import { useState, useEffect } from "react";
import { Send, Paperclip, Bot, User, Loader2, FileText, Settings, Mic, Building, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useChatHistory } from "@/hooks/useChatHistory";
import { useAuth } from "@/hooks/useAuth";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

export default function HRBot() {
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const navigate = useNavigate();

  const { user } = useAuth();
  const {
    chatSessions,
    currentSessionId,
    getCurrentSession,
    createNewChat,
    addMessage
  } = useChatHistory();

  useEffect(() => {
    // Auto-start HR bot conversation
    if (!currentSessionId) {
      const sessionId = createNewChat("HR-бот для Самрук-Казына активирован");
      addMessage(sessionId, "👋 Добро пожаловать в HR-бот Самрук-Казына!\n\n🔹 Я помогу вам с:\n• Оформлением отпусков и больничных\n• Вопросами по зарплате и льготам\n• Карьерным развитием\n• Корпоративными процедурами\n• Обучением и аттестацией\n\nЗадайте свой вопрос или загрузите документ для анализа!", false);
    }
  }, []);

  const handleFileUpload = (type: 'document' | 'audio') => {
    const fileName = type === 'document' ? 'hr_policy.pdf' : 'meeting_audio.mp3';
    setUploadedFile(fileName);
    setIsAnalyzing(true);
    
    const sessionId = currentSessionId || createNewChat(`Загружен ${type === 'document' ? 'документ' : 'аудиофайл'}: ${fileName}`);
    
    if (type === 'document') {
      addMessage(sessionId, `📄 Загружен документ: ${fileName}`, true);
    } else {
      addMessage(sessionId, `🎤 Загружен аудиофайл: ${fileName}`, true);
    }
    
    // Simulate analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      if (type === 'document') {
        addMessage(sessionId, "📊 Анализ документа завершен!\n\n📋 Обнаружено:\n• HR политики обновлены в 2024 году\n• 15 новых процедур для сотрудников\n• Изменения в системе отпусков\n• Новые льготы и компенсации\n\n💡 Готов ответить на вопросы по содержанию документа!", false);
      } else {
        addMessage(sessionId, "🎯 Транскрипция аудио завершена!\n\n📝 Краткое содержание:\n• Обсуждение новых HR политик\n• Планы по обучению персонала на Q4\n• Изменения в системе мотивации\n• Вопросы по адаптации новых сотрудников\n\n📋 Хотите получить полную транскрипцию или краткое резюме?", false);
      }
    }, 2000);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;
    
    let sessionId = currentSessionId;
    if (!sessionId) {
      sessionId = createNewChat(inputMessage);
    }

    addMessage(sessionId, inputMessage, true);
    setInputMessage("");
    setIsLoading(true);

    // HR-specific responses
    setTimeout(() => {
      const hrResponses = [
        "Для оформления отпуска необходимо подать заявление через корпоративную систему за 2 недели до даты начала. Нужно согласование непосредственного руководителя и HR-отдела.",
        "По вопросам заработной платы обращайтесь в отдел кадров. Зарплата перечисляется 15 числа каждого месяца. Справки о доходах можно получить в личном кабинете сотрудника.",
        "Больничный лист оформляется через медицинскую службу компании. Первые 3 дня оплачиваются работодателем, далее - из фонда социального страхования.",
        "Для повышения квалификации доступны внутренние и внешние программы обучения. Заявки подаются через систему развития персонала до 25 числа каждого месяца.",
        "Корпоративные льготы включают: медицинское страхование, компенсацию питания, спортивные программы и льготы на отдых для сотрудников и их семей."
      ];
      
      const randomResponse = hrResponses[Math.floor(Math.random() * hrResponses.length)];
      addMessage(sessionId!, `💼 ${randomResponse}\n\n📞 Для дополнительной консультации обращайтесь:\n• HR-служба: +7 (727) 244-XXXX\n• Telegram: @samruk_hr_bot\n• Личный кабинет: portal.samruk-kazyna.kz`, false);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const currentMessages = getCurrentSession()?.messages || [];

  const quickActions = [
    { text: "Как оформить отпуск?", icon: "🏖️" },
    { text: "Вопросы по зарплате", icon: "💰" },
    { text: "Больничный лист", icon: "🏥" },
    { text: "Обучение и развитие", icon: "📚" },
    { text: "Корпоративные льготы", icon: "🎁" },
    { text: "Адаптация новичков", icon: "👋" }
  ];

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* HR Bot Header */}
      <div className="border-b bg-card px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Building className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold">HR-бот Самрук-Казына</h1>
              <p className="text-sm text-muted-foreground">Ваш помощник по кадровым вопросам</p>
            </div>
          </div>
          <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20">
            <Users className="h-3 w-3 mr-1" />
            Активен
          </Badge>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="max-w-4xl mx-auto px-6 py-8">
            {currentMessages.length > 1 && (
              <div className="space-y-6">
                {currentMessages.slice(1).map((message, index) => (
                  <div key={index} className={`flex gap-4 ${message.isUser ? "justify-end" : "justify-start"}`}>
                    {!message.isUser && (
                      <Avatar className="h-8 w-8 mt-1">
                        <AvatarFallback className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
                          <Building className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                    
                    <div className={`max-w-[80%] rounded-lg px-4 py-3 ${
                      message.isUser ? "bg-primary text-primary-foreground ml-auto" : "bg-muted"
                    }`}>
                      {uploadedFile && message.content.includes(uploadedFile) && (
                        <div className="flex items-center gap-2 mb-2 p-2 bg-primary/10 rounded-lg">
                          {message.content.includes('🎤') ? (
                            <Mic className="h-4 w-4 text-primary" />
                          ) : (
                            <FileText className="h-4 w-4 text-primary" />
                          )}
                          <span className="text-sm font-medium">{uploadedFile}</span>
                        </div>
                      )}
                      
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

                    {message.isUser && (
                      <Avatar className="h-8 w-8 mt-1">
                        <AvatarFallback className="bg-secondary">
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex gap-4 justify-start">
                    <Avatar className="h-8 w-8 mt-1">
                      <AvatarFallback className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
                        <Building className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-muted rounded-lg px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span className="text-sm text-muted-foreground">HR-бот обрабатывает запрос...</span>
                      </div>
                    </div>
                  </div>
                )}

                {isAnalyzing && (
                  <div className="flex gap-4 justify-start">
                    <Avatar className="h-8 w-8 mt-1">
                      <AvatarFallback className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
                        <Building className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-muted rounded-lg px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span className="text-sm text-muted-foreground">
                          {uploadedFile?.includes('mp3') ? 'Транскрибирую аудио...' : 'Анализирую документ...'}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {/* Quick Actions */}
            {currentMessages.length <= 1 && (
              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">Быстрые действия:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="justify-start h-auto p-4 text-left"
                      onClick={() => {
                        setInputMessage(action.text);
                        setTimeout(handleSendMessage, 100);
                      }}
                    >
                      <span className="mr-3 text-lg">{action.icon}</span>
                      {action.text}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Input Area */}
      <div className="border-t bg-background">
        <div className="max-w-4xl mx-auto p-6">
          <div className="relative">
            <div className="absolute left-3 bottom-2 z-10">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-muted">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  <DropdownMenuItem 
                    className="bg-primary/10 text-primary font-medium"
                    onClick={() => handleFileUpload('document')}
                  >
                    📎 Загрузить файл
                    <Badge variant="secondary" className="ml-auto text-xs">PDF, DOCX</Badge>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="bg-primary/10 text-primary font-medium"
                    onClick={() => handleFileUpload('audio')}
                  >
                    🎥 Видео
                    <Badge variant="secondary" className="ml-auto text-xs">MP4, AVI</Badge>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    🖼️ Изображение
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            <Textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Задайте вопрос HR-боту..."
              className="min-h-[80px] max-h-[200px] resize-none pl-12 pr-12 transition-all duration-300"
              rows={2}
              disabled={isLoading}
            />
            
            <div className="absolute right-3 bottom-2">
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                size="icon"
                className="h-8 w-8"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
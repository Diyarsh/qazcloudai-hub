import { useState, useMemo, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Clock, MessageSquare, Trash2, Star, StarOff, FileText, Mic, Bot, User, MessageCircle, MoreVertical } from "lucide-react";
import { useChatHistory } from "@/hooks/useChatHistory";
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";

export default function History() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const { chatSessions, setCurrentSessionId, deleteSession, createNewChat, addMessage } = useChatHistory();
  const navigate = useNavigate();

  // Mock starred sessions for demo
  const [starredSessions, setStarredSessions] = useState<Set<string>>(new Set());

  // Add example conversations if empty
  useEffect(() => {
    const sessions = Object.values(chatSessions);
    if (sessions.length === 0) {
      // Create example HR bot conversation
      const hrSessionId = createNewChat("Как оформить отпуск в Самрук-Казына?");
      addMessage(hrSessionId, "Как оформить отпуск в Самрук-Казына?", true);
      addMessage(hrSessionId, "Для оформления отпуска в Самрук-Казына необходимо:\n1. Подать заявление за 2 недели\n2. Согласовать с руководителем\n3. Уведомить HR отдел\n4. Получить подпись директора", false);

      // Create example document analysis conversation
      const docSessionId = createNewChat("Анализ финансового отчета Q3");
      addMessage(docSessionId, "📊 Проанализируй этот финансовый отчет", true);
      addMessage(docSessionId, "📊 Анализирую документ...\n\nОсновные показатели Q3:\n• Выручка выросла на 15%\n• Прибыль увеличилась на 8%\n• ROE составляет 12.5%\n\nРекомендации: увеличить инвестиции в R&D", false);

      // Create example audio transcription conversation
      const audioSessionId = createNewChat("Транскрипция совещания");
      addMessage(audioSessionId, "🎤 Аудиофайл загружен: meeting_record.mp3", true);
      addMessage(audioSessionId, "🎯 Транскрипция завершена!\n\n📝 Краткое содержание совещания:\n• Обсуждение бюджета на 2024 год\n• Планы по расширению в регионы\n• Новые HR политики\n• Цифровая трансформация", false);

      // Create code review example
      const codeSessionId = createNewChat("Ревью React компонента");
      addMessage(codeSessionId, "Проверь этот код на ошибки", true);
      addMessage(codeSessionId, "🔍 Анализ кода завершен:\n\n✅ Положительные моменты:\n• Хорошая структура компонента\n• Правильное использование hooks\n\n⚠️ Рекомендации:\n• Добавить error boundaries\n• Оптимизировать re-renders\n• Улучшить типизацию", false);
    }
  }, []);

  const toggleStar = (sessionId: string) => {
    const newStarred = new Set(starredSessions);
    if (newStarred.has(sessionId)) {
      newStarred.delete(sessionId);
    } else {
      newStarred.add(sessionId);
    }
    setStarredSessions(newStarred);
  };

  const filteredSessions = useMemo(() => {
    const sessions = Object.values(chatSessions);
    
    return sessions
      .filter((session) => {
        const matchesSearch = session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             session.messages.some(msg => 
                               msg.content.toLowerCase().includes(searchQuery.toLowerCase())
                             );
        
        const matchesFilter = selectedFilter === "all" || 
                             (selectedFilter === "starred" && starredSessions.has(session.id)) ||
                             (selectedFilter === "recent" && 
                              new Date().getTime() - session.createdAt.getTime() < 24 * 60 * 60 * 1000);
        
        return matchesSearch && matchesFilter;
      })
      .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
  }, [chatSessions, searchQuery, selectedFilter, starredSessions]);

  const getSessionPreview = (session: any) => {
    const lastMessage = session.messages[session.messages.length - 1];
    if (!lastMessage) return "Новый чат";
    const content = lastMessage.content;
    return content.length > 150 ? content.substring(0, 150) + "..." : content;
  };

  // Helper function to get conversation type icon
  const getConversationIcon = (session: any) => {
    const firstMessage = session.messages?.[0]?.content?.toLowerCase() || "";
    if (firstMessage.includes("аудио") || firstMessage.includes("🎤")) {
      return <Mic className="h-4 w-4" />;
    } else if (firstMessage.includes("документ") || firstMessage.includes("📊") || firstMessage.includes("файл")) {
      return <FileText className="h-4 w-4" />;
    } else if (firstMessage.includes("код") || firstMessage.includes("ревью")) {
      return <Bot className="h-4 w-4" />;
    }
    return <MessageCircle className="h-4 w-4" />;
  };

  const getRelativeTime = (date: Date) => {
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return "Только что";
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} час${Math.floor(diffInHours) === 1 ? '' : diffInHours < 5 ? 'а' : 'ов'} назад`;
    } else if (diffInHours < 48) {
      return "Вчера";
    } else {
      return formatDistanceToNow(date, { addSuffix: true, locale: ru });
    }
  };

  const handleSessionClick = (sessionId: string) => {
    setCurrentSessionId(sessionId);
    navigate('/dashboard');
  };

  const filters = [
    { id: "all", name: "Все чаты", count: Object.keys(chatSessions).length },
    { id: "recent", name: "Недавние", count: Object.values(chatSessions).filter(s => 
      new Date().getTime() - s.createdAt.getTime() < 24 * 60 * 60 * 1000).length },
    { id: "starred", name: "Избранные", count: starredSessions.size }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">История чатов</h1>
          <p className="text-muted-foreground">Все ваши беседы с AI-ассистентом</p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Поиск в истории чатов..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2">
          {filters.map((filter) => (
            <Button
              key={filter.id}
              variant={selectedFilter === filter.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedFilter(filter.id)}
            >
              {filter.name} ({filter.count})
            </Button>
          ))}
        </div>
      </div>

      {/* Chat Sessions */}
      <div className="space-y-4">
        {filteredSessions.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                {searchQuery ? "Чаты не найдены" : "История пуста"}
              </h3>
              <p className="text-muted-foreground text-center">
                {searchQuery 
                  ? "Попробуйте изменить поисковый запрос"
                  : "Начните новый чат, чтобы увидеть историю здесь"
                }
              </p>
              {!searchQuery && (
                <Button className="mt-4" onClick={() => window.location.href = '/dashboard'}>
                  Начать чат
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredSessions.map((session) => (
              <Card 
                key={session.id} 
                className="relative group hover:shadow-md transition-all duration-200 cursor-pointer border-muted/50 hover:border-primary/20"
                onClick={() => handleSessionClick(session.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="text-primary">
                          {getConversationIcon(session)}
                        </div>
                        <CardTitle className="text-base font-medium text-foreground truncate">
                          {session.title}
                        </CardTitle>
                      </div>
                      <CardDescription className="text-sm text-muted-foreground">
                        <Clock className="h-3 w-3 inline mr-1" />
                        {getRelativeTime(session.updatedAt)}
                      </CardDescription>
                    </div>
                    
                    {/* Action buttons - show on hover */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-muted"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleStar(session.id);
                        }}
                      >
                        {starredSessions.has(session.id) ? (
                          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        ) : (
                          <StarOff className="h-4 w-4" />
                        )}
                      </Button>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:bg-muted"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteSession(session.id);
                            }}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Удалить
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="space-y-3">
                    {/* Message count and last message info */}
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MessageCircle className="h-4 w-4" />
                        <span>{session.messages?.length || 0} сообщений</span>
                      </div>
                      {session.messages?.[session.messages.length - 1] && (
                        <div className="flex items-center gap-1 text-muted-foreground">
                          {session.messages[session.messages.length - 1].isUser ? (
                            <User className="h-3 w-3" />
                          ) : (
                            <Bot className="h-3 w-3" />
                          )}
                          <span className="text-xs">
                            {new Date(session.messages[session.messages.length - 1].timestamp).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    {/* Last message preview with better formatting */}
                    <div className="bg-muted/30 rounded-lg p-3 border-l-2 border-primary/30">
                      <p className="text-sm text-foreground line-clamp-3 leading-relaxed">
                        {getSessionPreview(session)}
                      </p>
                    </div>

                    {/* Quick tags based on conversation content */}
                    <div className="flex flex-wrap gap-1">
                      {session.messages?.some(m => m.content.includes("документ") || m.content.includes("📊")) && (
                        <Badge variant="secondary" className="text-xs">
                          <FileText className="h-3 w-3 mr-1" />
                          Документы
                        </Badge>
                      )}
                      {session.messages?.some(m => m.content.includes("аудио") || m.content.includes("🎤")) && (
                        <Badge variant="secondary" className="text-xs">
                          <Mic className="h-3 w-3 mr-1" />
                          Аудио
                        </Badge>
                      )}
                      {session.messages?.some(m => m.content.toLowerCase().includes("hr") || m.content.includes("отпуск") || m.content.includes("кадр")) && (
                        <Badge variant="secondary" className="text-xs">
                          👥 HR
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
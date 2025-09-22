import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Clock, MessageSquare, Trash2, Star, StarOff } from "lucide-react";
import { useChatHistory } from "@/hooks/useChatHistory";
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';

export default function History() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const { chatSessions, setCurrentSessionId, deleteSession } = useChatHistory();

  // Mock starred sessions for demo
  const [starredSessions, setStarredSessions] = useState<Set<string>>(new Set());

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
    return lastMessage.content.slice(0, 100) + (lastMessage.content.length > 100 ? "..." : "");
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
    window.location.href = '/dashboard';
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
                className="hover:shadow-md transition-shadow cursor-pointer group"
                onClick={() => handleSessionClick(session.id)}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg truncate group-hover:text-primary transition-colors">
                        {session.title}
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {getRelativeTime(session.updatedAt)}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {session.messages.length} сообщений
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="sm"
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
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteSession(session.id);
                        }}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="line-clamp-3">
                    {getSessionPreview(session)}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
import { useState, useMemo, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useChatHistory } from "@/hooks/useChatHistory";
import { useNavigate } from "react-router-dom";

export default function History() {
  const [searchQuery, setSearchQuery] = useState("");
  const { chatSessions, setCurrentSessionId, createNewChat, addMessage } = useChatHistory();
  const navigate = useNavigate();

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

  const filteredSessions = useMemo(() => {
    const sessions = Object.values(chatSessions);
    
    return sessions
      .filter((session) => {
        const matchesSearch = session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             session.messages.some(msg => 
                               msg.content.toLowerCase().includes(searchQuery.toLowerCase())
                             );
        
        return matchesSearch;
      })
      .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
  }, [chatSessions, searchQuery]);

  const getRelativeTime = (date: Date) => {
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    const diffInDays = diffInHours / 24;
    
    if (diffInHours < 1) {
      return "just now";
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} hours ago`;
    } else if (diffInDays < 7) {
      return `${Math.floor(diffInDays)} days ago`;
    } else if (diffInDays < 30) {
      return `${Math.floor(diffInDays / 7)} weeks ago`;
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  const handleSessionClick = (sessionId: string) => {
    setCurrentSessionId(sessionId);
    navigate('/dashboard');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <h1 className="text-2xl font-semibold text-center mb-8">History</h1>
      
      {/* Search */}
      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-transparent border-muted/30"
        />
      </div>

      {/* Chat Sessions List */}
      <div className="space-y-0">
        {filteredSessions.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            {searchQuery ? "No conversations found" : "No conversations yet"}
          </div>
        ) : (
          filteredSessions.map((session) => (
            <div
              key={session.id}
              className="flex items-center justify-between py-4 px-0 hover:bg-muted/20 cursor-pointer transition-colors"
              onClick={() => handleSessionClick(session.id)}
            >
              <div className="flex-1 min-w-0">
                <p className="text-foreground truncate">{session.title}</p>
              </div>
              <div className="text-sm text-muted-foreground ml-4 whitespace-nowrap">
                {getRelativeTime(session.updatedAt)}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
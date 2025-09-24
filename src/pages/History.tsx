import { useState, useMemo, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useChatHistory } from "@/hooks/useChatHistory";
import { useNavigate } from "react-router-dom";
export default function History() {
  const [searchQuery, setSearchQuery] = useState("");
  const {
    chatSessions,
    setCurrentSessionId,
    createNewChat,
    addMessage
  } = useChatHistory();
  const navigate = useNavigate();

  // Add example conversations if empty
  useEffect(() => {
    const sessions = Object.values(chatSessions);
    if (sessions.length === 0) {
      // Create example HR bot conversation
      const hrSessionId = createNewChat("Как оформить отпуск?");
      addMessage(hrSessionId, "Как оформить отпуск в Самрук-Казына?", true);
      addMessage(hrSessionId, "Для оформления отпуска необходимо:\n1. Подать заявление за 2 недели\n2. Согласовать с руководителем\n3. Уведомить HR отдел\n4. Получить подпись директора", false);

      // Create example document analysis conversation
      const docSessionId = createNewChat("Анализ финансового отчета");
      addMessage(docSessionId, "📊 Проанализируй финансовый отчет Q3", true);
      addMessage(docSessionId, "📊 Анализ завершен!\n\nОсновные показатели Q3:\n• Выручка: +15%\n• Прибыль: +8%\n• ROE: 12.5%\n\nРекомендации: увеличить инвестиции в R&D", false);

      // Create example legal consultation
      const legalSessionId = createNewChat("Юридическая консультация");
      addMessage(legalSessionId, "Какие документы нужны для регистрации ТОО?", true);
      addMessage(legalSessionId, "📋 Для регистрации ТОО требуется:\n\n• Устав компании\n• Справка о состоянии здоровья учредителей\n• Документы на юридический адрес\n• Справка об отсутствии судимости\n• Нотариально заверенные копии удостоверений", false);

      // Create example contract analysis
      const contractSessionId = createNewChat("Анализ контракта поставки");
      addMessage(contractSessionId, "📄 Загружен контракт: supply_agreement.pdf", true);
      addMessage(contractSessionId, "⚖️ Анализ контракта завершен!\n\n🔍 Обнаружены риски:\n• Штрафы за просрочку 0.5% в день\n• Отсутствует форс-мажор\n• Неточные сроки поставки\n\n📝 Рекомендую доработать пункты 5.2 и 7.1", false);

      // Create example tax consultation
      const taxSessionId = createNewChat("Налоговое планирование");
      addMessage(taxSessionId, "Как оптимизировать налоги для IT-компании?", true);
      addMessage(taxSessionId, "💼 Рекомендации по налогам:\n\n• Статус ПВТ (льготы до 2035г)\n• IT-деятельность: КПН 0%\n• Экспорт ПО: НДС 0%\n• Зарплатные налоги: ИПН 10%\n\nТребования: 80% IT-доходов, сертификация", false);

      // Create example data analysis
      const dataSessionId = createNewChat("Анализ продаж за квартал");
      addMessage(dataSessionId, "📊 Загружена таблица: sales_Q3_2024.xlsx", true);
      addMessage(dataSessionId, "📈 Анализ продаж Q3:\n\n📊 Ключевые метрики:\n• Общий объем: 150M тенге (+22%)\n• Лучший регион: Алматы (40%)\n• Топ-продукт: Консалтинг (65M)\n\n🎯 Прогноз Q4: рост 12-15%", false);

      // Create example meeting transcription
      const meetingSessionId = createNewChat("Совещание по стратегии");
      addMessage(meetingSessionId, "🎤 Запись совещания: strategy_meeting.mp3", true);
      addMessage(meetingSessionId, "🎯 Транскрипция готова!\n\n📝 Основные решения:\n• Запуск в Шымкенте в Q1 2025\n• Бюджет на маркетинг: +30%\n• Новая CRM к марту\n• Прием 15 сотрудников", false);
    }
  }, [chatSessions, createNewChat, addMessage]);
  const filteredSessions = useMemo(() => {
    const sessions = Object.values(chatSessions);
    return sessions.filter(session => {
      const matchesSearch = session.title.toLowerCase().includes(searchQuery.toLowerCase()) || session.messages.some(msg => msg.content.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesSearch;
    }).sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
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
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      });
    }
  };
  const handleSessionClick = (sessionId: string) => {
    setCurrentSessionId(sessionId);
    navigate('/chat');
  };
  return <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <h1 className="text-2xl font-semibold text-center mb-8">История</h1>
      
      {/* Search */}
      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-10 bg-transparent border-muted/30" />
      </div>

      {/* Chat Sessions List */}
      <div className="space-y-0">
        {filteredSessions.length === 0 ? <div className="text-center py-12 text-muted-foreground">
            {searchQuery ? "No conversations found" : "No conversations yet"}
          </div> : filteredSessions.map(session => <div key={session.id} className="flex items-center justify-between py-4 px-0 hover:bg-muted/20 cursor-pointer transition-colors" onClick={() => handleSessionClick(session.id)}>
              <div className="flex-1 min-w-0">
                <p className="text-foreground truncate">{session.title}</p>
              </div>
              <div className="text-sm text-muted-foreground ml-4 whitespace-nowrap">
                {getRelativeTime(session.updatedAt)}
              </div>
            </div>)}
      </div>
    </div>;
}
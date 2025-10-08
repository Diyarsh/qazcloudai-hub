import { useState, useMemo, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search, ExternalLink, Edit2, Trash2, MoreHorizontal, MessageSquare, FileText } from "lucide-react";
import { useChatHistory } from "@/hooks/useChatHistory";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
export default function History() {
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [sessionToDelete, setSessionToDelete] = useState<string | null>(null);
  const [renameDialogOpen, setRenameDialogOpen] = useState(false);
  const [sessionToRename, setSessionToRename] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState("");
  
  const {
    chatSessions,
    setCurrentSessionId,
    createNewChat,
    addMessage,
    deleteSession,
    updateSessionTitle
  } = useChatHistory();
  const navigate = useNavigate();

  // Add example conversations if empty
  useEffect(() => {
    const sessions = Object.values(chatSessions);
    if (sessions.length < 13) {
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

      // Create additional examples for bigger list
      const codeSessionId = createNewChat("Ревью кода Python");
      addMessage(codeSessionId, "👨‍💻 Проверь этот код на оптимизацию", true);
      addMessage(codeSessionId, "🔧 Анализ кода завершен:\n\n⚡ Найдены возможности для оптимизации:\n• Используй list comprehension\n• Замени циклы на pandas.apply()\n• Добавь кэширование результатов\n\n📈 Ожидаемое ускорение: 3-5x", false);

      const emailSessionId = createNewChat("Составление email рассылки");
      addMessage(emailSessionId, "✉️ Нужна рассылка для клиентов об акции", true);
      addMessage(emailSessionId, "📧 Готово! Создана рассылка:\n\n📋 Структура:\n• Яркий заголовок\n• Персонализация по имени\n• 20% скидка до конца месяца\n• Call-to-action кнопка\n• Отписка внизу", false);

      const budgetSessionId = createNewChat("Планирование бюджета IT");
      addMessage(budgetSessionId, "💰 Нужен бюджет на IT инфраструктуру", true);
      addMessage(budgetSessionId, "📊 Бюджет составлен:\n\n💻 Основные статьи:\n• Серверы и оборудование: 50M тенге\n• Лицензии ПО: 15M тенге\n• Безопасность: 10M тенге\n• Резерв на развитие: 25M тенге\n\n📈 Итого: 100M тенге", false);

      const securitySessionId = createNewChat("Аудит информационной безопасности");
      addMessage(securitySessionId, "🛡️ Проведи аудит безопасности сети", true);
      addMessage(securitySessionId, "🔒 Аудит завершен!\n\n⚠️ Найдены уязвимости:\n• Слабые пароли (15 учетных записей)\n• Устаревшие SSL сертификаты\n• Отсутствие 2FA для админов\n\n✅ План устранения готов", false);

      const marketingSessionId = createNewChat("Стратегия digital маркетинга");
      addMessage(marketingSessionId, "📱 Создай стратегию для соцсетей", true);
      addMessage(marketingSessionId, "🎯 Стратегия готова:\n\n📊 Каналы:\n• Instagram: визуальный контент\n• LinkedIn: B2B контент\n• YouTube: обучающие видео\n• Telegram: новости компании\n\n📈 ROI прогноз: 250%", false);

      const automationSessionId = createNewChat("Автоматизация HR процессов");
      addMessage(automationSessionId, "🤖 Как автоматизировать подбор кадров?", true);
      addMessage(automationSessionId, "⚙️ План автоматизации:\n\n🔧 Инструменты:\n• ATS система для резюме\n• Чат-бот для первичного скрининга\n• Видео-интервью платформа\n• Интеграция с корпоративными системами\n\n⏱️ Экономия времени: 60%", false);
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
    navigate(`/dashboard?session=${sessionId}`);
  };

  const handleOpenInNewTab = (sessionId: string) => {
    const url = `/dashboard?session=${sessionId}`;
    window.open(url, '_blank');
  };

  const handleRename = (sessionId: string, currentTitle: string) => {
    setSessionToRename(sessionId);
    setNewTitle(currentTitle);
    setRenameDialogOpen(true);
  };

  const handleDelete = (sessionId: string) => {
    setSessionToDelete(sessionId);
    setDeleteDialogOpen(true);
  };

  const confirmRename = () => {
    if (sessionToRename && newTitle.trim()) {
      updateSessionTitle(sessionToRename, newTitle.trim());
      toast.success("Чат переименован");
    }
    setRenameDialogOpen(false);
    setSessionToRename(null);
    setNewTitle("");
  };

  const confirmDelete = () => {
    if (sessionToDelete) {
      deleteSession(sessionToDelete);
      toast.success("Чат удален");
    }
    setDeleteDialogOpen(false);
    setSessionToDelete(null);
  };
  return <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">История</h1>
        
        {/* Search */}
        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-10 bg-background" />
        </div>
      </div>

      {/* Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12"></TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Updated</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSessions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-12 text-muted-foreground">
                  {searchQuery ? "No conversations found" : "No conversations yet"}
                </TableCell>
              </TableRow>
            ) : (
              filteredSessions.map(session => (
                <TableRow 
                  key={session.id}
                  className="cursor-pointer"
                  onClick={() => handleSessionClick(session.id)}
                >
                  <TableCell>
                    <MessageSquare className="h-5 w-5 text-muted-foreground" />
                  </TableCell>
                  <TableCell className="font-medium">
                    {session.title}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    Chat prompt
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {getRelativeTime(session.updatedAt)}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenInNewTab(session.id);
                          }}
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Открыть в новой вкладке
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRename(session.id, session.title);
                          }}
                        >
                          <Edit2 className="h-4 w-4 mr-2" />
                          Переименовать
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(session.id);
                          }}
                          className="text-destructive"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Удалить
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Удалить чат?</AlertDialogTitle>
            <AlertDialogDescription>
              Это действие нельзя отменить. Чат будет удален навсегда.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Удалить</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Rename Dialog */}
      <AlertDialog open={renameDialogOpen} onOpenChange={setRenameDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Переименовать чат</AlertDialogTitle>
            <AlertDialogDescription>
              Введите новое название для чата.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4">
            <Input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Новое название чата"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  confirmRename();
                }
              }}
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction onClick={confirmRename}>Сохранить</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>;
}
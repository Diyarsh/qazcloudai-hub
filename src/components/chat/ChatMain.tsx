import { useState, useEffect } from "react";
import { Send, Plus, Mic, User, Bot } from "lucide-react";
import { QazCloudLogo } from "@/components/ui/qazcloud-logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage } from "@/types/chat";

interface ChatMainProps {
  userName?: string;
  onViewCatalog?: () => void;
  currentSessionId?: string | null;
  messages?: ChatMessage[];
  onSendMessage?: (message: string, isUser?: boolean) => void;
}

export const ChatMain = ({ userName, onViewCatalog, currentSessionId, messages = [], onSendMessage }: ChatMainProps) => {
  const [message, setMessage] = useState("");

  const suggestedModels = [
    {
      name: "QazLLM-Ultra",
      provider: "QazCloud AI-HUB",
      description: "Суверенная большая языковая модель для корпоративного сектора. Обеспечивает безопасную обработку конфиденциальных данных.",
      badge: "ПОПУЛЯРНОЕ"
    },
    {
      name: "SecurityGuard AI",
      provider: "QazCloud AI-HUB", 
      description: "Модель для кибербезопасности и мониторинга угроз. Анализ сетевого трафика, детекция аномалий в реальном времени.",
      badge: "БЕЗОПАСНОСТЬ"
    },
    {
      name: "DocAnalyzer AI",
      provider: "QazCloud AI-HUB",
      description: "ИИ-модель для глубокого анализа документов, извлечения ключевой информации и автоматической классификации.",
      badge: "НОВОЕ"
    }
  ];

  const handleSendMessage = () => {
    if (message.trim() && onSendMessage) {
      onSendMessage(message.trim(), true); // true означает что это сообщение от пользователя
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Симуляция ответа ИИ
  const simulateAIResponse = (userMessage: string): string => {
    const responses = [
      `Понял ваш запрос "${userMessage}". Это интересная задача! 

Давайте рассмотрим несколько подходов к её решению:

1. **Анализ контекста**: Сначала необходимо определить ключевые параметры вашей задачи
2. **Выбор подходящей модели**: В рамках QC AI-HUB у нас есть специализированные модели для разных типов задач
3. **Практическая реализация**: Я могу предложить пошаговый план внедрения

Какой из аспектов вас интересует больше всего?`,

      `Спасибо за вопрос про "${userMessage}". Я могу помочь вам разобраться с этим. 

**Мои рекомендации:**

• **QazLLM-Ultra** - для комплексного анализа и генерации текста
• **SecurityGuard AI** - если задача связана с безопасностью
• **DocAnalyzer AI** - для работы с документами

В зависимости от специфики вашей задачи, я могу предложить более детальное решение. Расскажите больше о ваших требованиях?`,

      `Отличный вопрос! Касательно "${userMessage}" - это важная тема в современном мире ИИ. 

**Ключевые аспекты:**

🔍 **Анализ данных**: Важно понимать структуру и качество исходных данных
🎯 **Выбор алгоритма**: Разные задачи требуют разных подходов
⚡ **Производительность**: Оптимизация для конкретных требований
🛡️ **Безопасность**: Обеспечение защиты конфиденциальных данных

Позвольте объяснить подробнее каждый из этих аспектов применительно к вашей ситуации.`,

      `Я анализирую ваш запрос "${userMessage}". Основываясь на имеющихся данных, могу предложить следующее решение:

**Этап 1: Подготовка**
- Анализ требований и ограничений
- Выбор оптимальной архитектуры

**Этап 2: Реализация** 
- Настройка выбранной модели ИИ
- Интеграция с существующими системами

**Этап 3: Тестирование**
- Валидация результатов
- Оптимизация производительности

Хотели бы углубиться в какой-то конкретный этап?`,

      `Ваш вопрос о "${userMessage}" актуален. В рамках QC AI-HUB мы можем предложить несколько решений для этой задачи:

💡 **Готовые решения**: Проверьте наш каталог готовых решений
🔧 **Кастомизация**: Адаптация существующих моделей под ваши нужды  
🚀 **Разработка с нуля**: Создание специализированного решения
📊 **Консультации**: Экспертная поддержка на всех этапах

Какой подход вам больше подходит? Я могу предоставить более детальную информацию по любому из направлений.`
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  // Автоматическая симуляция ответа ИИ  
  useEffect(() => {
    if (messages.length > 0 && messages[messages.length - 1].isUser && onSendMessage) {
      const lastUserMessage = messages[messages.length - 1];
      const timer = setTimeout(() => {
        const aiResponse = simulateAIResponse(lastUserMessage.content);
        onSendMessage(aiResponse, false); // false означает что это сообщение от ИИ
      }, 1000 + Math.random() * 2000); // Задержка 1-3 секунды

      return () => clearTimeout(timer);
    }
  }, [messages, onSendMessage]);

  return (
    <div className="flex-1 flex flex-col h-screen bg-background">
      {messages.length === 0 ? (
        // Welcome Screen когда нет сообщений
        <div className="flex-1 flex flex-col items-center justify-center px-8 py-12">
          <div className="max-w-4xl w-full space-y-8">
            {/* Welcome Message */}
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold text-foreground">
                Добрый день {userName || "Роман"}!
              </h1>
            </div>

            {/* Chat Input */}
            <div className="relative max-w-2xl mx-auto">
              <div className="flex items-center space-x-2 p-4 bg-card border border-border rounded-2xl shadow-sm">
                <Input
                  placeholder="Задайте свой вопрос"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 border-0 bg-transparent focus-visible:ring-0 text-base placeholder:text-muted-foreground"
                />
                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                  >
                    <Mic className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                    className="h-8 w-8 p-0 bg-ai-primary hover:bg-ai-primary/90 text-white"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Suggested Models Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground">Для вас</h2>
                <Button 
                  variant="link" 
                  className="text-ai-primary hover:text-ai-primary/80 p-0"
                  onClick={onViewCatalog}
                >
                  Смотреть все
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {suggestedModels.map((model, index) => (
                  <Card key={index} className="group cursor-pointer hover:shadow-md transition-all duration-200 border-border hover:border-ai-primary/30">
                    <CardHeader className="space-y-3">
                      <div className="flex items-start justify-between">
                         <div className="p-2 bg-gradient-primary rounded-lg">
                           <QazCloudLogo className="h-5 w-5" />
                         </div>
                        {model.badge && (
                          <Badge variant="secondary" className="bg-ai-primary/10 text-ai-primary border-ai-primary/20">
                            {model.badge}
                          </Badge>
                        )}
                      </div>
                      <div>
                        <CardTitle className="text-lg group-hover:text-ai-primary transition-colors">
                          {model.name}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">{model.provider}</p>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm leading-relaxed">
                        {model.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Chat View когда есть сообщения
        <div className="flex-1 flex flex-col">
          {/* Messages Area */}
          <ScrollArea className="flex-1 p-4">
            <div className="max-w-4xl mx-auto space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex gap-3 ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                  {!msg.isUser && (
                    <div className="p-2 bg-gradient-primary rounded-lg">
                      <Bot className="h-5 w-5 text-white" />
                    </div>
                  )}
                  <div className={`max-w-2xl ${msg.isUser ? 'bg-ai-primary text-white' : 'bg-card border'} rounded-lg p-4`}>
                    <p className="text-sm leading-relaxed">{msg.content}</p>
                    <p className={`text-xs mt-2 ${msg.isUser ? 'text-white/70' : 'text-muted-foreground'}`}>
                      {msg.timestamp.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  {msg.isUser && (
                    <div className="p-2 bg-gradient-secondary rounded-lg">
                      <User className="h-5 w-5 text-white" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Chat Input - Fixed at bottom */}
          <div className="border-t bg-background p-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center space-x-2 p-4 bg-card border border-border rounded-2xl shadow-sm">
                <Input
                  placeholder="Введите сообщение..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 border-0 bg-transparent focus-visible:ring-0 text-base placeholder:text-muted-foreground"
                />
                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                  >
                    <Mic className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                    className="h-8 w-8 p-0 bg-ai-primary hover:bg-ai-primary/90 text-white"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
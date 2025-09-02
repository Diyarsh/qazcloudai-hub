import { useState } from "react";
import { QazCloudLogo } from "@/components/ui/qazcloud-logo";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChatInterface } from "@/components/chat/ChatInterface";
import { useChatHistory } from "@/hooks/useChatHistory";
import { 
  Users, 
  Activity, 
  TrendingUp, 
  Clock, 
  Cpu, 
  Database,
  Network,
  Zap,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  MessageSquare
} from "lucide-react";

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const { 
    chatSessions, 
    currentSessionId, 
    getCurrentSession, 
    createNewChat, 
    addMessage 
  } = useChatHistory();

  const handleSendMessage = async (message: string) => {
    let sessionId = currentSessionId;
    
    // Создаем новый чат если его нет
    if (!sessionId) {
      sessionId = createNewChat(message);
    }
    
    // Добавляем сообщение пользователя
    if (sessionId) {
      addMessage(sessionId, message, true);
      setIsLoading(true);
      
      // Симуляция ответа AI
      setTimeout(() => {
        const aiResponses = [
          "Понятно! Я помогу вам с этим вопросом. Какую именно информацию вы хотели бы получить?",
          "Отличный вопрос! Позвольте мне проанализировать это и предоставить подробный ответ.",
          "Я обработал ваш запрос. Вот что я могу предложить по этому поводу...",
          "Интересная задача! Давайте разберем это пошагово.",
          "Основываясь на вашем запросе, я рекомендую следующий подход к решению этой задачи."
        ];
        
        const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
        addMessage(sessionId!, randomResponse, false);
        setIsLoading(false);
      }, 1000 + Math.random() * 2000);
    }
  };

  const recentProjects = [
    {
      name: "Клиенттердің деректерін талдау",
      status: "Орындалуда",
      progress: 67,
      type: "Классификация"
    },
    {
      name: "Ұсыныстар жүйесі",
      status: "Аяқталды", 
      progress: 100,
      type: "ML Pipeline"
    },
    {
      name: "Құжаттарды өңдеу",
      status: "Жоспарлау",
      progress: 15,
      type: "NLP"
    }
  ];


  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Панель управления</h1>
          <p className="text-muted-foreground">Обзор активности AI-платформы</p>
        </div>
        <Button>
          <Zap className="h-4 w-4 mr-2" />
          Создать проект
        </Button>
      </div>


      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chat Interface - Make it bigger */}
        <div className="lg:col-span-2">
          <div className="h-[calc(100vh-300px)] min-h-[600px]">
            <ChatInterface 
              messages={getCurrentSession()?.messages || []}
              onSendMessage={handleSendMessage}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>

      {/* Model Catalog Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <QazCloudLogo className="h-5 w-5" />
                    Популярные модели
                  </CardTitle>
                  <CardDescription>
                    Рекомендуемые ИИ-модели для ваших задач
                  </CardDescription>
                </div>
                <Button variant="outline" onClick={() => window.location.href = '/models'}>
                  Смотреть все
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    name: "QazLLM-Ultra",
                    description: "Суверенная языковая модель для корпоративного сектора",
                    provider: "QazCloud AI-HUB",
                    category: "Текст",
                    rating: 4.9,
                    uses: 156000,
                    functional: true
                  },
                  {
                    name: "GPT-4 Turbo",
                    description: "Продвинутая языковая модель для генерации текста",
                    provider: "OpenAI",
                    category: "Текст",
                    rating: 4.9,
                    uses: 2543000
                  },
                  {
                    name: "Claude 3.5 Sonnet",
                    description: "Мощная модель для анализа и создания контента",
                    provider: "Anthropic",
                    category: "Текст",
                    rating: 4.8,
                    uses: 1876000
                  },
                  {
                    name: "DocAnalyzer AI",
                    description: "ИИ-модель для анализа документов",
                    provider: "QazCloud AI-HUB",
                    category: "Документы",
                    rating: 4.7,
                    uses: 67800
                  }
                ].map((model, index) => (
                  <div key={index} className="p-4 border border-border rounded-lg hover:border-primary/50 transition-colors">
                    <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="p-1 bg-primary rounded cursor-pointer" onClick={() => window.location.href = '/'}>
                      <QazCloudLogo className="h-3 w-3" />
                    </div>
                    <span className="font-medium text-sm">{model.name}</span>
                  </div>
                      <p className="text-xs text-muted-foreground line-clamp-2">{model.description}</p>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">{model.provider}</span>
                      </div>
                      <Button 
                        size="sm" 
                        className="w-full"
                        onClick={() => {
                          if (model.name === "QazLLM-Ultra") {
                            // Make QazLLM functional - navigate to chat
                            window.location.href = '/dashboard';
                          }
                        }}
                      >
                        {model.name === "QazLLM-Ultra" ? "Использовать" : "Использовать"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        <div className="lg:col-span-1">
          <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Недавние проекты
            </CardTitle>
            <CardDescription>
              Активные ML-проекты и их статус
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentProjects.map((project, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="space-y-1">
                  <h4 className="text-sm font-medium text-foreground">{project.name}</h4>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {project.type}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {project.status}
                    </span>
                  </div>
                  <Progress value={project.progress} className="h-2 w-32" />
                </div>
                <Button variant="ghost" size="sm">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Быстрые действия
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="justify-start h-auto p-4">
              <div className="flex items-center gap-3">
                <Database className="h-5 w-5 text-primary" />
                <div className="text-left">
                  <div className="font-medium">Новая модель</div>
                  <div className="text-xs text-muted-foreground">Добавить модель в каталог</div>
                </div>
              </div>
            </Button>
            <Button variant="outline" className="justify-start h-auto p-4">
              <div className="flex items-center gap-3">
                <Network className="h-5 w-5 text-primary" />
                <div className="text-left">
                  <div className="font-medium">Создать пайплайн</div>
                  <div className="text-xs text-muted-foreground">Настроить обработку данных</div>
                </div>
              </div>
            </Button>
            <Button variant="outline" className="justify-start h-auto p-4">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary" />
                <div className="text-left">
                  <div className="font-medium">Расписание</div>
                  <div className="text-xs text-muted-foreground">Автоматические задачи</div>
                </div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

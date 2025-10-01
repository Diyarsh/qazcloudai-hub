import { useState, useEffect } from "react";
import { QazCloudLogo } from "@/components/ui/qazcloud-logo";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChatMain } from "@/components/chat/ChatMain";
import { useChatHistory } from "@/hooks/useChatHistory";
import { useTranslation } from 'react-i18next';
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
import { useSearchParams } from "react-router-dom";

export default function Dashboard() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const { 
    chatSessions, 
    currentSessionId, 
    // getCurrentSession, 
    createNewChat, 
    addMessage,
    setCurrentSessionId
  } = useChatHistory();

  const [searchParams] = useSearchParams();
  const sessionParam = searchParams.get('session');

  useEffect(() => {
    if (sessionParam) {
      setCurrentSessionId(sessionParam);
    } else {
      setCurrentSessionId(null);
    }
  }, [sessionParam, setCurrentSessionId]);
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
      name: t('dashboard.sampleProjects.customerAnalysis'),
      status: t('dashboard.projectStatus.inProgress'),
      type: t('dashboard.projectTypes.classification')
    },
    {
      name: t('dashboard.sampleProjects.recommendationSystem'),
      status: t('dashboard.projectStatus.completed'), 
      type: t('dashboard.projectTypes.mlPipeline')
    },
    {
      name: t('dashboard.sampleProjects.documentProcessing'),
      status: t('dashboard.projectStatus.planning'),
      type: t('dashboard.projectTypes.nlp')
    }
  ];

  const messagesToShow = sessionParam ? (chatSessions[sessionParam]?.messages || []) : [];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t('dashboard.title')}</h1>
          <p className="text-muted-foreground">{t('dashboard.subtitle')}</p>
        </div>
        <Button>
          <Zap className="h-4 w-4 mr-2" />
          {t('dashboard.createProject')}
        </Button>
      </div>


      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chat Interface - Make it bigger */}
        <div className="lg:col-span-2">
          <div className="h-[calc(100vh-300px)] min-h-[600px]">
            <ChatMain 
              userName="Роман"
              messages={messagesToShow}
              onSendMessage={handleSendMessage}
              onViewCatalog={() => window.location.href = '/models'}
              currentSessionId={currentSessionId}
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
                    {t('dashboard.popularModels')}
                  </CardTitle>
                  <CardDescription>
                    {t('dashboard.popularModelsDesc')}
                  </CardDescription>
                </div>
                <Button variant="outline" onClick={() => window.location.href = '/models'}>
                  {t('dashboard.viewAll')}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    key: 'qazllm',
                    name: t('dashboard.models.qazllm.name'),
                    description: t('dashboard.models.qazllm.description'),
                    provider: t('dashboard.models.qazllm.provider'),
                    category: t('dashboard.models.qazllm.category'),
                    rating: 4.9,
                    uses: 156000,
                    functional: true
                  },
                  {
                    key: 'gpt4',
                    name: t('dashboard.models.gpt4.name'),
                    description: t('dashboard.models.gpt4.description'),
                    provider: t('dashboard.models.gpt4.provider'),
                    category: t('dashboard.models.gpt4.category'),
                    rating: 4.9,
                    uses: 2543000
                  },
                  {
                    key: 'claude',
                    name: t('dashboard.models.claude.name'),
                    description: t('dashboard.models.claude.description'),
                    provider: t('dashboard.models.claude.provider'),
                    category: t('dashboard.models.claude.category'),
                    rating: 4.8,
                    uses: 1876000
                  },
                  {
                    key: 'docanalyzer',
                    name: t('dashboard.models.docanalyzer.name'),
                    description: t('dashboard.models.docanalyzer.description'),
                    provider: t('dashboard.models.docanalyzer.provider'),
                    category: t('dashboard.models.docanalyzer.category'),
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
                          if (model.key === 'qazllm') {
                            // Make QazLLM functional - navigate to chat
                            window.location.href = '/dashboard';
                          }
                        }}
                      >
                        {t('dashboard.use')}
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
              {t('dashboard.recentProjects')}
            </CardTitle>
            <CardDescription>
              {t('dashboard.recentProjectsDesc')}
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
    </div>
  );
}

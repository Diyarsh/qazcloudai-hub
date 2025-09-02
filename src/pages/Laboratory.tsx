import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { 
  Beaker, 
  Play, 
  Save, 
  Share, 
  Plus, 
  Search,
  Filter,
  Clock,
  CheckCircle2,
  AlertCircle,
  Activity,
  Database,
  Code,
  BarChart3,
  Eye,
  MoreVertical,
  Copy,
  Download,
  Settings
} from "lucide-react";

interface Experiment {
  id: string;
  name: string;
  description: string;
  status: 'running' | 'completed' | 'failed' | 'draft';
  type: string;
  model: string;
  dataset: string;
  metrics: {
    accuracy?: number;
    loss?: number;
    f1_score?: number;
  };
  createdAt: Date;
  duration?: string;
  author: string;
}

const mockExperiments: Experiment[] = [
  {
    id: '1',
    name: 'Оптимизация гиперпараметров CNN',
    description: 'Подбор оптимальных параметров для классификации изображений медицинских снимков',
    status: 'running',
    type: 'Hyperparameter Tuning',
    model: 'ResNet50',
    dataset: 'MedicalImages_v2',
    metrics: { accuracy: 0.89 },
    createdAt: new Date('2024-01-15T09:30:00'),
    duration: '2h 15m',
    author: 'Dr. Петров'
  },
  {
    id: '2',
    name: 'A/B тест новой модели рекомендаций',
    description: 'Сравнение производительности новой рекомендательной системы с базовой моделью',
    status: 'completed',
    type: 'A/B Testing',
    model: 'CollaborativeFiltering_v3',
    dataset: 'UserInteractions_Q1',
    metrics: { accuracy: 0.94, f1_score: 0.91 },
    createdAt: new Date('2024-01-14T14:00:00'),
    duration: '45m',
    author: 'ML Team'
  },
  {
    id: '3',
    name: 'Эксперимент с аугментацией данных',
    description: 'Исследование влияния различных техник аугментации на качество модели NLP',
    status: 'failed',
    type: 'Data Augmentation',
    model: 'BERT-base',
    dataset: 'TextCorpus_RU',
    metrics: { loss: 0.45 },
    createdAt: new Date('2024-01-13T16:20:00'),
    author: 'NLP Researcher'
  },
  {
    id: '4',
    name: 'Сравнение архитектур трансформеров',
    description: 'Анализ производительности различных архитектур для задач генерации текста',
    status: 'draft',
    type: 'Model Comparison',
    model: 'Multiple',
    dataset: 'GenerationCorpus',
    metrics: {},
    createdAt: new Date('2024-01-15T11:00:00'),
    author: 'Research Team'
  }
];

export default function Laboratory() {
  const [experiments] = useState<Experiment[]>(mockExperiments);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const getStatusIcon = (status: Experiment['status']) => {
    switch (status) {
      case 'running':
        return <Activity className="h-4 w-4 text-blue-500 animate-pulse" />;
      case 'completed':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'draft':
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: Experiment['status']) => {
    switch (status) {
      case 'running':
        return 'bg-blue-500/10 text-blue-700 border-blue-200';
      case 'completed':
        return 'bg-green-500/10 text-green-700 border-green-200';
      case 'failed':
        return 'bg-red-500/10 text-red-700 border-red-200';
      case 'draft':
        return 'bg-gray-500/10 text-gray-700 border-gray-200';
    }
  };

  const filteredExperiments = experiments.filter(experiment => {
    const matchesSearch = experiment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         experiment.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || experiment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Main Tabs */}
      <Tabs defaultValue="models" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="models">Настройка моделей</TabsTrigger>
          <TabsTrigger value="workflows">N8N Платформа</TabsTrigger>
          <TabsTrigger value="openml">Open ML</TabsTrigger>
          <TabsTrigger value="solutions">Готовые решения</TabsTrigger>
        </TabsList>

        {/* Model Configuration Tab */}
        <TabsContent value="models" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Настройка моделей</h1>
              <p className="text-muted-foreground">Конфигурация и настройка AI моделей для ваших задач</p>
            </div>
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
              <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Новый эксперимент
        </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Создание эксперимента</DialogTitle>
                  <DialogDescription>
                    Настройте новый ML эксперимент для исследования
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Название эксперимента</Label>
                      <Input id="name" placeholder="Введите название..." />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="type">Тип эксперимента</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите тип" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hyperparameter">Подбор гиперпараметров</SelectItem>
                          <SelectItem value="ab-test">A/B тестирование</SelectItem>
                          <SelectItem value="model-comparison">Сравнение моделей</SelectItem>
                          <SelectItem value="data-augmentation">Аугментация данных</SelectItem>
                          <SelectItem value="feature-selection">Отбор признаков</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Описание</Label>
                    <Textarea id="description" placeholder="Описание эксперимента..." rows={3} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="model">Модель</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите модель" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="resnet50">ResNet50</SelectItem>
                          <SelectItem value="bert">BERT-base</SelectItem>
                          <SelectItem value="gpt">GPT-3.5</SelectItem>
                          <SelectItem value="lstm">LSTM</SelectItem>
                          <SelectItem value="random-forest">Random Forest</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dataset">Датасет</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите датасет" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="medical-images">Medical Images</SelectItem>
                          <SelectItem value="text-corpus">Text Corpus</SelectItem>
                          <SelectItem value="user-interactions">User Interactions</SelectItem>
                          <SelectItem value="financial-data">Financial Data</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="metrics">Метрики для отслеживания</Label>
                    <div className="flex flex-wrap gap-2">
                      {['Accuracy', 'Loss', 'F1-Score', 'Precision', 'Recall', 'AUC'].map((metric) => (
                        <Badge key={metric} variant="outline" className="cursor-pointer hover:bg-primary/10">
                          {metric}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2 pt-4">
                    <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                      Сохранить как черновик
                    </Button>
            <Button onClick={() => setIsCreateOpen(false)}>
              Запустить эксперимент
            </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Model Configuration Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-primary" />
                  Настройка гиперпараметров
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Автоматический подбор оптимальных параметров для ваших моделей
                </p>
                <Button className="w-full">Настроить модель</Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Мониторинг производительности
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Отслеживание метрик и производительности моделей в реальном времени
                </p>
                <Button className="w-full" variant="outline">Открыть мониторинг</Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-primary" />
                  Управление версиями
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Версионирование моделей и откат к предыдущим версиям
                </p>
                <Button className="w-full" variant="outline">Управление версиями</Button>
              </CardContent>
            </Card>
          </div>

          {/* Experiments Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Активные эксперименты</h2>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Поиск экспериментов..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все статусы</SelectItem>
                    <SelectItem value="running">Выполняются</SelectItem>
                    <SelectItem value="completed">Завершены</SelectItem>
                    <SelectItem value="failed">Ошибки</SelectItem>
                    <SelectItem value="draft">Черновики</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Experiments Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredExperiments.map((experiment) => (
                <Card key={experiment.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg leading-tight">{experiment.name}</CardTitle>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(experiment.status)}
                          <Badge className={getStatusColor(experiment.status)}>
                            {experiment.status === 'running' ? 'Выполняется' :
                             experiment.status === 'completed' ? 'Завершен' :
                             experiment.status === 'failed' ? 'Ошибка' : 'Черновик'}
                          </Badge>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{experiment.description}</p>
                    
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Модель:</span>
                        <span className="font-medium">{experiment.model}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Датасет:</span>
                        <span className="font-medium">{experiment.dataset}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Автор:</span>
                        <span className="font-medium">{experiment.author}</span>
                      </div>
                    </div>

                    {/* Metrics */}
                    {Object.keys(experiment.metrics).length > 0 && (
                      <div className="pt-2 border-t">
                        <h4 className="text-xs font-medium text-muted-foreground mb-2">Метрики</h4>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          {experiment.metrics.accuracy && (
                            <div className="flex justify-between">
                              <span>Accuracy:</span>
                              <span className="font-mono">{(experiment.metrics.accuracy * 100).toFixed(1)}%</span>
                            </div>
                          )}
                          {experiment.metrics.loss && (
                            <div className="flex justify-between">
                              <span>Loss:</span>
                              <span className="font-mono">{experiment.metrics.loss.toFixed(3)}</span>
                            </div>
                          )}
                          {experiment.metrics.f1_score && (
                            <div className="flex justify-between">
                              <span>F1-Score:</span>
                              <span className="font-mono">{(experiment.metrics.f1_score * 100).toFixed(1)}%</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3 mr-1" />
                          Просмотр
                        </Button>
                        {(experiment.status === 'completed' || experiment.status === 'failed') && (
                          <Button size="sm" variant="outline">
                            <Copy className="h-3 w-3 mr-1" />
                            Клонировать
                          </Button>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {experiment.duration || 'Не определено'}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredExperiments.length === 0 && (
              <div className="text-center py-12">
                <Beaker className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Нет экспериментов</h3>
                <p className="text-muted-foreground mb-4">Создайте свой первый эксперимент для начала работы</p>
                <Button onClick={() => setIsCreateOpen(true)} className="bg-gradient-primary">
                  <Plus className="h-4 w-4 mr-2" />
                  Создать эксперимент
                </Button>
              </div>
            )}
          </div>
        </TabsContent>

        {/* N8N Workflow Platform Tab */}
        <TabsContent value="workflows" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">N8N Платформа автоматизации</h1>
              <p className="text-muted-foreground">Создание и управление рабочими процессами с AI интеграцией</p>
            </div>
            <Button className="bg-gradient-primary">
              <Plus className="h-4 w-4 mr-2" />
              Создать workflow
            </Button>
          </div>

          {/* Workflow Builder */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Конструктор workflow</CardTitle>
                <CardDescription>Визуальный редактор для создания автоматизированных процессов</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/30 rounded-lg p-8 text-center">
                  <div className="space-y-4">
                    <div className="flex justify-center space-x-4">
                      <div className="w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center">
                        <Database className="h-8 w-8 text-primary" />
                      </div>
                      <div className="w-16 h-16 bg-blue-500/20 rounded-lg flex items-center justify-center">
                        <Activity className="h-8 w-8 text-blue-500" />
                      </div>
                      <div className="w-16 h-16 bg-green-500/20 rounded-lg flex items-center justify-center">
                        <CheckCircle2 className="h-8 w-8 text-green-500" />
                      </div>
                    </div>
                    <p className="text-muted-foreground">Перетащите компоненты для создания workflow</p>
                    <Button>Открыть редактор</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Готовые шаблоны</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: "Обработка данных", desc: "ETL процессы" },
                  { name: "AI Inference", desc: "Запуск моделей" },
                  { name: "Уведомления", desc: "Алерты и отчеты" },
                  { name: "Интеграции", desc: "API подключения" }
                ].map((template, i) => (
                  <div key={i} className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                    <div className="font-medium text-sm">{template.name}</div>
                    <div className="text-xs text-muted-foreground">{template.desc}</div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Open ML Tab */}
        <TabsContent value="openml" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Open ML Платформа</h1>
              <p className="text-muted-foreground">Открытая платформа для совместной работы над ML проектами</p>
            </div>
            <Button className="bg-gradient-primary">
              <Share className="h-4 w-4 mr-2" />
              Поделиться экспериментом
            </Button>
          </div>

          {/* Open ML Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Share className="h-5 w-5 text-primary" />
                  Совместная работа
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Публичные эксперименты</span>
                    <Badge>247</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Участники сообщества</span>
                    <Badge>1,234</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Доступные датасеты</span>
                    <Badge>89</Badge>
                  </div>
                </div>
                <Button className="w-full" variant="outline">Исследовать сообщество</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-primary" />
                  Открытый код
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Доступ к исходному коду экспериментов и возможность внесения улучшений
                </p>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <Copy className="h-4 w-4 mr-1" />
                    Fork проект
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-1" />
                    Скачать
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Open ML Experiments */}
          <Card>
            <CardHeader>
              <CardTitle>Публичные эксперименты</CardTitle>
              <CardDescription>Исследования, доступные для изучения и воспроизведения</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: "Классификация медицинских изображений", author: "Medical AI Lab", stars: 45 },
                  { name: "Предсказание цен на недвижимость", author: "Data Science Team", stars: 32 },
                  { name: "NLP анализ настроений", author: "NLP Researchers", stars: 67 }
                ].map((exp, i) => (
                  <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">{exp.name}</div>
                      <div className="text-sm text-muted-foreground">by {exp.author}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{exp.stars} ⭐</Badge>
                      <Button size="sm">Изучить</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Ready Solutions Tab */}
        <TabsContent value="solutions" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Готовые решения</h1>
              <p className="text-muted-foreground">Предварительно настроенные AI решения для быстрого внедрения</p>
            </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Запросить решение
        </Button>
          </div>

          {/* Solutions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Система рекомендаций",
                description: "Персонализированные рекомендации для e-commerce",
                category: "E-commerce",
                deployment: "Готово к развертыванию",
                features: ["Collaborative filtering", "Content-based", "Hybrid approach"]
              },
              {
                title: "Анализ документов",
                description: "Автоматическая обработка и классификация документов",
                category: "Document AI",
                deployment: "Настройка 2-3 дня",
                features: ["OCR", "NLP классификация", "Извлечение данных"]
              },
              {
                title: "Чат-бот поддержки",
                description: "AI ассистент для клиентского сервиса",
                category: "Customer Service",
                deployment: "Готово к развертыванию",
                features: ["NLU", "Интеграция с CRM", "Мультиязычность"]
              },
              {
                title: "Предиктивная аналитика",
                description: "Прогнозирование бизнес метрик и трендов",
                category: "Analytics",
                deployment: "Настройка 1-2 недели",
                features: ["Time series", "Аномалии", "Визуализация"]
              },
              {
                title: "Компьютерное зрение",
                description: "Анализ изображений и видео потоков",
                category: "Computer Vision",
                deployment: "Настройка 3-5 дней",
                features: ["Детекция объектов", "Распознавание лиц", "Quality control"]
              },
              {
                title: "Обработка речи",
                description: "Распознавание и синтез речи",
                category: "Speech AI",
                deployment: "Готово к развертыванию",
                features: ["Speech-to-text", "Text-to-speech", "Языковые модели"]
              }
            ].map((solution, i) => (
              <Card key={i} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{solution.title}</CardTitle>
                      <Badge variant="secondary" className="mt-1">{solution.category}</Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-muted-foreground">{solution.deployment}</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{solution.description}</p>
                  
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Возможности:</h4>
                    <div className="flex flex-wrap gap-1">
                      {solution.features.map((feature, j) => (
                        <Badge key={j} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button size="sm" className="flex-1">
                      <Play className="h-3 w-3 mr-1" />
                      Демо
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Eye className="h-3 w-3 mr-1" />
                      Детали
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
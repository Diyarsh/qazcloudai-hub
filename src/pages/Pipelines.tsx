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
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  GitBranch, 
  Play, 
  Pause, 
  Settings, 
  Plus, 
  Search,
  Filter,
  Clock,
  CheckCircle2,
  AlertCircle,
  Activity,
  Database,
  ArrowRight,
  Eye,
  MoreVertical,
  Download,
  Copy,
  User,
  Calendar,
  Zap,
  FileText,
  BarChart3,
  Cpu,
  HardDrive,
  Network,
  Terminal,
  Code,
  Workflow,
  Layers,
  Share,
  RotateCcw
} from "lucide-react";
import { PipelineCanvas } from "@/components/pipeline/PipelineCanvas";

interface Pipeline {
  id: string;
  name: string;
  description: string;
  status: 'running' | 'stopped' | 'error' | 'completed' | 'queued';
  lastRun: Date;
  duration: string;
  stages: number;
  successRate: number;
  type: string;
  creator: string;
  progress?: number;
  commit?: string;
  branch?: string;
  metrics?: {
    accuracy?: number;
    loss?: number;
    throughput?: number;
  };
}

interface PipelineBlock {
  id: string;
  type: 'data-ingestion' | 'data-processing' | 'model-training' | 'evaluation' | 'deployment';
  name: string;
  icon: string;
  description: string;
  inputs: string[];
  outputs: string[];
  config?: any;
}

const mockPipelines: Pipeline[] = [
  {
    id: '1',
    name: 'Анализ клиентских данных',
    description: 'Обработка и анализ поведенческих данных клиентов для персонализации',
    status: 'running',
    lastRun: new Date('2024-01-15T10:30:00'),
    duration: '45 мин',
    stages: 5,
    successRate: 97.5,
    type: 'Анализ данных',
    creator: 'Алексей Петров',
    progress: 67,
    commit: 'feat: добавлен новый алгоритм кластеризации',
    branch: 'main',
    metrics: { accuracy: 0.94, throughput: 1250 }
  },
  {
    id: '2',
    name: 'Обработка документов',
    description: 'Извлечение и классификация информации из входящих документов',
    status: 'completed',
    lastRun: new Date('2024-01-15T09:15:00'),
    duration: '23 мин',
    stages: 3,
    successRate: 98.2,
    type: 'NLP',
    creator: 'Мария Иванова',
    commit: 'fix: улучшена обработка PDF файлов',
    branch: 'develop',
    metrics: { accuracy: 0.98, loss: 0.023 }
  },
  {
    id: '3',
    name: 'Модель рекомендаций',
    description: 'Генерация персонализированных рекомендаций на основе ML',
    status: 'queued',
    lastRun: new Date('2024-01-14T16:45:00'),
    duration: '67 мин',
    stages: 7,
    successRate: 94.8,
    type: 'ML Pipeline',
    creator: 'Дамир Сабитов',
    commit: 'refactor: оптимизация алгоритма',
    branch: 'feature/optimization'
  },
  {
    id: '4',
    name: 'Мониторинг качества',
    description: 'Автоматический контроль качества продукции с использованием CV',
    status: 'error',
    lastRun: new Date('2024-01-15T08:00:00'),
    duration: '-',
    stages: 4,
    successRate: 89.3,
    type: 'Computer Vision',
    creator: 'Анна Смирнова',
    commit: 'test: добавлены unit тесты',
    branch: 'main'
  }
];

const pipelineBlocks: PipelineBlock[] = [
  {
    id: '1',
    type: 'data-ingestion',
    name: 'CSV Источник',
    icon: '📥',
    description: 'Загрузка данных из CSV файла',
    inputs: [],
    outputs: ['dataframe']
  },
  {
    id: '2',
    type: 'data-ingestion',
    name: 'Database Источник',
    icon: '🗄️',
    description: 'Подключение к базе данных',
    inputs: [],
    outputs: ['dataframe']
  },
  {
    id: '3',
    type: 'data-processing',
    name: 'Очистка данных',
    icon: '🧹',
    description: 'Удаление пропусков и выбросов',
    inputs: ['dataframe'],
    outputs: ['clean_dataframe']
  },
  {
    id: '4',
    type: 'data-processing',
    name: 'Feature Engineering',
    icon: '⚙️',
    description: 'Создание новых признаков',
    inputs: ['dataframe'],
    outputs: ['features']
  },
  {
    id: '5',
    type: 'model-training',
    name: 'AutoML',
    icon: '🤖',
    description: 'Автоматическое обучение модели',
    inputs: ['features'],
    outputs: ['model']
  },
  {
    id: '6',
    type: 'evaluation',
    name: 'Валидация',
    icon: '📊',
    description: 'Оценка качества модели',
    inputs: ['model', 'test_data'],
    outputs: ['metrics']
  },
  {
    id: '7',
    type: 'deployment',
    name: 'API Развертывание',
    icon: '🚀',
    description: 'Создание REST API',
    inputs: ['model'],
    outputs: ['api_endpoint']
  }
];

export default function Pipelines() {
  const [pipelines] = useState<Pipeline[]>(mockPipelines);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [creatorFilter, setCreatorFilter] = useState("all");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedPipeline, setSelectedPipeline] = useState<Pipeline | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const getStatusIcon = (status: Pipeline['status']) => {
    switch (status) {
      case 'running':
        return <Activity className="h-4 w-4 text-blue-500 animate-pulse" />;
      case 'completed':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'stopped':
        return <Pause className="h-4 w-4 text-gray-500" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'queued':
        return <Clock className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: Pipeline['status']) => {
    switch (status) {
      case 'running':
        return 'bg-blue-500/10 text-blue-700 border-blue-200';
      case 'completed':
        return 'bg-green-500/10 text-green-700 border-green-200';
      case 'stopped':
        return 'bg-gray-500/10 text-gray-700 border-gray-200';
      case 'error':
        return 'bg-red-500/10 text-red-700 border-red-200';
      case 'queued':
        return 'bg-yellow-500/10 text-yellow-700 border-yellow-200';
    }
  };

  const getBlockTypeIcon = (type: PipelineBlock['type']) => {
    switch (type) {
      case 'data-ingestion':
        return <Database className="h-4 w-4" />;
      case 'data-processing':
        return <Settings className="h-4 w-4" />;
      case 'model-training':
        return <Cpu className="h-4 w-4" />;
      case 'evaluation':
        return <BarChart3 className="h-4 w-4" />;
      case 'deployment':
        return <Zap className="h-4 w-4" />;
    }
  };

  const filteredPipelines = pipelines.filter(pipeline => {
    const matchesSearch = pipeline.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pipeline.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pipeline.creator.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || pipeline.status === statusFilter;
    const matchesCreator = creatorFilter === "all" || pipeline.creator === creatorFilter;
    return matchesSearch && matchesStatus && matchesCreator;
  });

  const creators = ["all", ...Array.from(new Set(pipelines.map(p => p.creator)))];

  return (
    <div className="p-6 space-y-6">
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="overview">Обзор</TabsTrigger>
          <TabsTrigger value="constructor">Конструктор</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">ML Пайплайны</h1>
              <p className="text-muted-foreground">Управление и мониторинг пайплайнов машинного обучения</p>
            </div>
            <div className="flex space-x-2">
              <div className="flex border rounded-lg">
                <Button 
                  variant={viewMode === 'grid' ? 'default' : 'ghost'} 
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className={viewMode === 'grid' ? 'bg-primary text-primary-foreground' : ''}
                >
                  <Layers className="h-4 w-4" />
                </Button>
                <Button 
                  variant={viewMode === 'table' ? 'default' : 'ghost'} 
                  size="sm"
                  onClick={() => setViewMode('table')}
                  className={viewMode === 'table' ? 'bg-primary text-primary-foreground' : ''}
                >
                  <BarChart3 className="h-4 w-4" />
                </Button>
              </div>
              <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Создать пайплайн
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Создание нового пайплайна</DialogTitle>
                    <DialogDescription>
                      Настройте новый ML пайплайн для обработки данных
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Название пайплайна</Label>
                        <Input id="name" placeholder="Введите название..." />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="type">Тип пайплайна</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите тип" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="data-analysis">Анализ данных</SelectItem>
                            <SelectItem value="ml-training">Обучение ML</SelectItem>
                            <SelectItem value="nlp">Обработка языка</SelectItem>
                            <SelectItem value="cv">Компьютерное зрение</SelectItem>
                            <SelectItem value="recommendation">Рекомендации</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Описание</Label>
                      <Textarea id="description" placeholder="Описание пайплайна..." rows={3} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="source">Источник данных</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите источник" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="database">База данных</SelectItem>
                            <SelectItem value="file">Файл</SelectItem>
                            <SelectItem value="api">API</SelectItem>
                            <SelectItem value="stream">Поток данных</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="schedule">Расписание</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите частоту" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="manual">Ручной запуск</SelectItem>
                            <SelectItem value="hourly">Каждый час</SelectItem>
                            <SelectItem value="daily">Ежедневно</SelectItem>
                            <SelectItem value="weekly">Еженедельно</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2 pt-4">
                      <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                        Отмена
                      </Button>
              <Button onClick={() => setIsCreateOpen(false)}>
                Создать пайплайн
              </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[
              { title: "Всего пайплайнов", value: "12", icon: GitBranch, color: "text-primary" },
              { title: "Активных", value: "3", icon: Play, color: "text-green-500" },
              { title: "В очереди", value: "2", icon: Clock, color: "text-yellow-500" },
              { title: "Ошибок", value: "1", icon: AlertCircle, color: "text-red-500" },
              { title: "Выполнено сегодня", value: "47", icon: CheckCircle2, color: "text-blue-500" }
            ].map((stat, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Поиск пайплайнов..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все статусы</SelectItem>
                <SelectItem value="running">Запущенные</SelectItem>
                <SelectItem value="queued">В очереди</SelectItem>
                <SelectItem value="completed">Завершенные</SelectItem>
                <SelectItem value="stopped">Остановленные</SelectItem>
                <SelectItem value="error">С ошибками</SelectItem>
              </SelectContent>
            </Select>
            <Select value={creatorFilter} onValueChange={setCreatorFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все авторы</SelectItem>
                {creators.slice(1).map(creator => (
                  <SelectItem key={creator} value={creator}>{creator}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Pipeline Content */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredPipelines.map((pipeline) => (
                <Card key={pipeline.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedPipeline(pipeline)}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <CardTitle className="flex items-center gap-2">
                          {getStatusIcon(pipeline.status)}
                          {pipeline.name}
                        </CardTitle>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">{pipeline.type}</Badge>
                          <Badge className={getStatusColor(pipeline.status)}>
                            {pipeline.status === 'running' ? 'Выполняется' :
                             pipeline.status === 'completed' ? 'Завершен' :
                             pipeline.status === 'queued' ? 'В очереди' :
                             pipeline.status === 'stopped' ? 'Остановлен' : 'Ошибка'}
                          </Badge>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{pipeline.description}</p>
                    
                    {pipeline.progress && pipeline.status === 'running' && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Прогресс выполнения</span>
                          <span>{pipeline.progress}%</span>
                        </div>
                        <Progress value={pipeline.progress} className="h-2" />
                      </div>
                    )}
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>{pipeline.creator}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Database className="h-4 w-4 text-muted-foreground" />
                        <span>Этапов: {pipeline.stages}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Activity className="h-4 w-4 text-muted-foreground" />
                        <span>{pipeline.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span>{pipeline.successRate}%</span>
                      </div>
                    </div>

                    {pipeline.commit && (
                      <div className="text-xs text-muted-foreground bg-muted p-2 rounded">
                        <GitBranch className="h-3 w-3 inline mr-1" />
                        {pipeline.branch}: {pipeline.commit}
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); setSelectedPipeline(pipeline); }}>
                          <Eye className="h-4 w-4 mr-1" />
                          Детали
                        </Button>
                        <Button size="sm" variant="outline">
                          <Terminal className="h-4 w-4 mr-1" />
                          Логи
                        </Button>
                      </div>
                      <div className="flex space-x-2">
                        {pipeline.status === 'running' ? (
                          <Button size="sm" variant="outline">
                            <Pause className="h-4 w-4 mr-1" />
                            Стоп
                          </Button>
                        ) : (
                          <Button size="sm" className="bg-gradient-primary">
                            <Play className="h-4 w-4 mr-1" />
                            Старт
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            /* Table View */
            <Card>
              <CardHeader>
                <CardTitle>Таблица пайплайнов</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3">Название</th>
                        <th className="text-left p-3">Статус</th>
                        <th className="text-left p-3">Прогресс</th>
                        <th className="text-left p-3">Время выполнения</th>
                        <th className="text-left p-3">Создатель</th>
                        <th className="text-left p-3">Действия</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPipelines.map((pipeline) => (
                        <tr key={pipeline.id} className="border-b hover:bg-muted/50">
                          <td className="p-3">
                            <div>
                              <div className="font-medium">{pipeline.name}</div>
                              <div className="text-xs text-muted-foreground">{pipeline.type}</div>
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              {getStatusIcon(pipeline.status)}
                              <Badge className={getStatusColor(pipeline.status)}>
                                {pipeline.status === 'running' ? 'Выполняется' :
                                 pipeline.status === 'completed' ? 'Завершен' :
                                 pipeline.status === 'queued' ? 'В очереди' :
                                 pipeline.status === 'stopped' ? 'Остановлен' : 'Ошибка'}
                              </Badge>
                            </div>
                          </td>
                          <td className="p-3">
                            {pipeline.progress && pipeline.status === 'running' ? (
                              <div className="space-y-1">
                                <div className="text-xs">{pipeline.progress}%</div>
                                <Progress value={pipeline.progress} className="h-1 w-20" />
                              </div>
                            ) : (
                              <span className="text-muted-foreground">-</span>
                            )}
                          </td>
                          <td className="p-3">{pipeline.duration}</td>
                          <td className="p-3">{pipeline.creator}</td>
                          <td className="p-3">
                            <div className="flex space-x-1">
                              <Button size="sm" variant="ghost" onClick={() => setSelectedPipeline(pipeline)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                              {pipeline.status === 'running' ? (
                                <Button size="sm" variant="ghost">
                                  <Pause className="h-4 w-4" />
                                </Button>
                              ) : (
                                <Button size="sm" variant="ghost">
                                  <Play className="h-4 w-4" />
                                </Button>
                              )}
                              <Button size="sm" variant="ghost">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}

          {filteredPipelines.length === 0 && (
            <div className="text-center py-12 space-y-3">
              <GitBranch className="h-12 w-12 text-muted-foreground mx-auto" />
              <h3 className="text-lg font-medium">Пайплайны не найдены</h3>
              <p className="text-muted-foreground">
                Попробуйте изменить критерии поиска или создайте новый пайплайн
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="constructor" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Конструктор пайплайнов</h2>
            <div className="flex space-x-2">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Импорт
              </Button>
              <Button className="bg-gradient-primary">
                <Copy className="h-4 w-4 mr-2" />
                Сохранить
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6 h-[600px]">
            {/* Palette */}
            <div className="col-span-3 space-y-4">
              <h3 className="font-medium">Палитра блоков</h3>
              <div className="space-y-3 max-h-[550px] overflow-y-auto">
                {Object.entries({
                  'data-ingestion': 'Источники данных',
                  'data-processing': 'Обработка данных', 
                  'model-training': 'Обучение моделей',
                  'evaluation': 'Оценка качества',
                  'deployment': 'Развертывание'
                }).map(([type, title]) => (
                  <div key={type} className="space-y-2">
                    <h4 className="text-sm font-medium text-muted-foreground">{title}</h4>
                    <div className="space-y-1">
                      {pipelineBlocks.filter(block => block.type === type as any).map((block) => (
                        <div
                          key={block.id}
                          className="p-2 border rounded-lg cursor-move hover:bg-muted/50 transition-colors"
                          draggable
                          onDragStart={(e) => {
                            e.dataTransfer.setData('application/json', JSON.stringify(block));
                          }}
                        >
                          <div className="flex items-center gap-2">
                            {getBlockTypeIcon(block.type)}
                            <div>
                              <div className="text-sm font-medium">{block.name}</div>
                              <div className="text-xs text-muted-foreground">{block.description}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Canvas */}
            <div className="col-span-9">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Workflow className="h-5 w-5" />
                    Рабочая область
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-full p-2">
                  <PipelineCanvas blocks={pipelineBlocks} />
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-6">
          <h2 className="text-xl font-semibold">Мониторинг системы</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "CPU Usage", value: "72%", status: "good" },
              { title: "GPU Usage", value: "91%", status: "critical" },
              { title: "Memory", value: "85%", status: "warning" },
              { title: "Storage", value: "45%", status: "good" }
            ].map((metric, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">{metric.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <Progress 
                    value={parseInt(metric.value)} 
                    className={`h-2 mt-2 ${
                      metric.status === 'critical' ? '[&>div]:bg-red-500' :
                      metric.status === 'warning' ? '[&>div]:bg-yellow-500' : '[&>div]:bg-green-500'
                    }`}
                  />
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Активные пайплайны</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredPipelines.filter(p => p.status === 'running').map((pipeline) => (
                  <div key={pipeline.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(pipeline.status)}
                      <div>
                        <div className="font-medium">{pipeline.name}</div>
                        <div className="text-sm text-muted-foreground">{pipeline.creator}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {pipeline.progress && (
                        <div className="text-sm">
                          <Progress value={pipeline.progress} className="w-20 h-2" />
                          <div className="text-xs text-center mt-1">{pipeline.progress}%</div>
                        </div>
                      )}
                      <div className="text-sm text-muted-foreground">{pipeline.duration}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Логи выполнения</h2>
            <div className="flex space-x-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все уровни</SelectItem>
                  <SelectItem value="info">Info</SelectItem>
                  <SelectItem value="warning">Warning</SelectItem>
                  <SelectItem value="error">Error</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Экспорт
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="bg-black text-green-400 font-mono text-sm p-4 h-96 overflow-y-auto">
                {[
                  "[2024-01-15 10:30:15] INFO: Starting pipeline 'Анализ клиентских данных'",
                  "[2024-01-15 10:30:16] INFO: Loading dataset from CSV source",
                  "[2024-01-15 10:30:18] INFO: Dataset loaded successfully: 156,742 rows",
                  "[2024-01-15 10:30:20] INFO: Starting data preprocessing stage",
                  "[2024-01-15 10:30:25] INFO: Removed 1,234 duplicate records",
                  "[2024-01-15 10:30:30] WARNING: High memory usage detected: 85%",
                  "[2024-01-15 10:30:35] INFO: Feature engineering completed",
                  "[2024-01-15 10:30:40] INFO: Starting model training stage",
                  "[2024-01-15 10:31:00] INFO: Training progress: 25% complete",
                  "[2024-01-15 10:31:30] INFO: Training progress: 50% complete",
                  "[2024-01-15 10:32:00] INFO: Training progress: 75% complete",
                  "[2024-01-15 10:32:15] INFO: Model training completed successfully",
                  "[2024-01-15 10:32:20] INFO: Starting model evaluation",
                  "[2024-01-15 10:32:25] INFO: Model accuracy: 94.2%",
                  "[2024-01-15 10:32:30] INFO: Pipeline execution completed"
                ].map((log, index) => (
                  <div key={index} className="mb-1">{log}</div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Pipeline Detail Modal */}
      {selectedPipeline && (
        <Dialog open={!!selectedPipeline} onOpenChange={() => setSelectedPipeline(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {getStatusIcon(selectedPipeline.status)}
                {selectedPipeline.name}
              </DialogTitle>
              <DialogDescription>{selectedPipeline.description}</DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 border rounded-lg">
                  <div className="text-2xl font-bold text-primary">{selectedPipeline.stages}</div>
                  <div className="text-xs text-muted-foreground">Этапов</div>
                </div>
                <div className="text-center p-3 border rounded-lg">
                  <div className="text-2xl font-bold text-green-500">{selectedPipeline.successRate}%</div>
                  <div className="text-xs text-muted-foreground">Успешность</div>
                </div>
                <div className="text-center p-3 border rounded-lg">
                  <div className="text-2xl font-bold">{selectedPipeline.duration}</div>
                  <div className="text-xs text-muted-foreground">Длительность</div>
                </div>
                <div className="text-center p-3 border rounded-lg">
                  <div className="text-2xl font-bold">{selectedPipeline.creator}</div>
                  <div className="text-xs text-muted-foreground">Создатель</div>
                </div>
              </div>

              {selectedPipeline.metrics && (
                <div>
                  <h4 className="font-medium mb-3">Метрики модели</h4>
                  <div className="grid grid-cols-3 gap-4">
                    {Object.entries(selectedPipeline.metrics).map(([key, value]) => (
                      <div key={key} className="text-center p-3 border rounded-lg">
                        <div className="text-xl font-bold">{typeof value === 'number' ? (value * 100).toFixed(1) + '%' : value}</div>
                        <div className="text-xs text-muted-foreground capitalize">{key.replace('_', ' ')}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex space-x-2">
                <Button className="bg-gradient-primary">
                  <Play className="h-4 w-4 mr-2" />
                  Запустить
                </Button>
                <Button variant="outline">
                  <Copy className="h-4 w-4 mr-2" />
                  Клонировать
                </Button>
                <Button variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  Настройки
                </Button>
                <Button variant="outline">
                  <Terminal className="h-4 w-4 mr-2" />
                  Логи
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
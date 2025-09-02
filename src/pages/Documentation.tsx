import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen,
  Search,
  FileText,
  Code2,
  Play,
  Download,
  ExternalLink,
  Users,
  Clock,
  Star,
  ArrowRight,
  Lightbulb,
  Cpu,
  Database,
  Settings,
  Shield,
  Zap
} from "lucide-react";

interface Documentation {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'Начинающий' | 'Средний' | 'Продвинутый';
  readTime: string;
  rating: number;
  tags: string[];
  type: 'guide' | 'api' | 'tutorial' | 'integration';
  isPopular?: boolean;
}

const mockDocs: Documentation[] = [
  {
    id: '1',
    title: 'Быстрый старт с QazCloud AI',
    description: 'Полное руководство по началу работы с платформой, от регистрации до запуска первой модели',
    category: 'Getting Started',
    difficulty: 'Начинающий',
    readTime: '15 мин',
    rating: 4.9,
    tags: ['quickstart', 'basics', 'setup'],
    type: 'guide',
    isPopular: true
  },
  {
    id: '2',
    title: 'REST API Reference',
    description: 'Полная документация REST API для интеграции с QazCloud AI Hub',
    category: 'API Reference',
    difficulty: 'Средний',
    readTime: '45 мин',
    rating: 4.7,
    tags: ['api', 'rest', 'integration'],
    type: 'api'
  },
  {
    id: '3',
    title: 'Создание системы рекомендаций',
    description: 'Пошаговое руководство по созданию рекомендательной системы для e-commerce',
    category: 'Tutorials',
    difficulty: 'Продвинутый',
    readTime: '120 мин',
    rating: 4.8,
    tags: ['recommendation', 'ml', 'tutorial'],
    type: 'tutorial',
    isPopular: true
  },
  {
    id: '4',
    title: 'Интеграция с GitLab CI/CD',
    description: 'Настройка автоматического развертывания моделей через GitLab CI/CD пайплайны',
    category: 'Integration Guides',
    difficulty: 'Продвинутый',
    readTime: '60 мин',
    rating: 4.6,
    tags: ['gitlab', 'cicd', 'deployment'],
    type: 'integration'
  },
  {
    id: '5',
    title: 'Мониторинг производительности',
    description: 'Настройка мониторинга метрик моделей с использованием Grafana и Prometheus',
    category: 'User Guides',
    difficulty: 'Средний',
    readTime: '30 мин',
    rating: 4.5,
    tags: ['monitoring', 'grafana', 'metrics'],
    type: 'guide'
  },
  {
    id: '6',
    title: 'Python SDK Documentation',
    description: 'Документация по Python SDK для работы с QazCloud AI Hub',
    category: 'API Reference',
    difficulty: 'Средний',
    readTime: '25 мин',
    rating: 4.8,
    tags: ['python', 'sdk', 'development'],
    type: 'api',
    isPopular: true
  }
];

const categories = ['Все', 'Getting Started', 'User Guides', 'API Reference', 'Tutorials', 'Integration Guides'];
const docTypes = ['Все', 'guide', 'api', 'tutorial', 'integration'];

export default function Documentation() {
  const [docs] = useState<Documentation[]>(mockDocs);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Все");
  const [selectedType, setSelectedType] = useState("Все");

  const getDifficultyColor = (difficulty: Documentation['difficulty']) => {
    switch (difficulty) {
      case 'Начинающий':
        return 'bg-green-500/10 text-green-700 border-green-200';
      case 'Средний':
        return 'bg-yellow-500/10 text-yellow-700 border-yellow-200';
      case 'Продвинутый':
        return 'bg-red-500/10 text-red-700 border-red-200';
    }
  };

  const getTypeIcon = (type: Documentation['type']) => {
    switch (type) {
      case 'guide':
        return <BookOpen className="h-4 w-4" />;
      case 'api':
        return <Code2 className="h-4 w-4" />;
      case 'tutorial':
        return <Play className="h-4 w-4" />;
      case 'integration':
        return <Settings className="h-4 w-4" />;
    }
  };

  const filteredDocs = docs.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "Все" || doc.category === selectedCategory;
    const matchesType = selectedType === "Все" || doc.type === selectedType;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Документация</h1>
          <p className="text-muted-foreground">Руководства, API справочники и туториалы для работы с QazCloud AI Hub</p>
        </div>
        <Button>
          <ExternalLink className="h-4 w-4 mr-2" />
          Внешняя документация  
        </Button>
      </div>

      <Tabs defaultValue="browse" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="browse">Обзор</TabsTrigger>
          <TabsTrigger value="quickstart">Быстрый старт</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
          <TabsTrigger value="examples">Примеры</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-6">
          {/* Popular Docs */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Популярные документы</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {docs.filter(doc => doc.isPopular).map((doc) => (
                <Card key={doc.id} className="group hover:shadow-lg transition-all duration-300 hover:border-primary/50 cursor-pointer">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <CardTitle className="flex items-center gap-2 group-hover:text-primary transition-colors text-base">
                          {getTypeIcon(doc.type)}
                          {doc.title}
                          {doc.isPopular && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                        </CardTitle>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm mb-3">{doc.description}</CardDescription>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Clock className="h-3 w-3" />
                        <span>{doc.readTime}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Search and Filters */}
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Поиск в документации..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex flex-wrap gap-3 items-center">
              <span className="text-sm font-medium">Фильтры:</span>
              
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={selectedCategory === category ? "bg-primary text-primary-foreground" : ""}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* All Documentation */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDocs.map((doc) => (
              <Card key={doc.id} className="group hover:shadow-lg transition-all duration-300 hover:border-primary/50 cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <CardTitle className="flex items-center gap-2 group-hover:text-primary transition-colors">
                        {getTypeIcon(doc.type)}
                        {doc.title}
                        {doc.isPopular && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{doc.category}</Badge>
                        <Badge className={getDifficultyColor(doc.difficulty)}>
                          {doc.difficulty}
                        </Badge>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <CardDescription className="text-sm">{doc.description}</CardDescription>
                  
                  <div className="flex flex-wrap gap-1">
                    {doc.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{doc.readTime}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="quickstart" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-primary" />
                Быстрый старт
              </CardTitle>
              <CardDescription>Начните работу с QazCloud AI Hub за несколько простых шагов</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Шаг 1: Регистрация</h3>
                  <p className="text-sm text-muted-foreground">
                    Создайте аккаунт и получите доступ к платформе
                  </p>
                  <Button variant="outline" className="w-full">
                    <Users className="h-4 w-4 mr-2" />
                    Руководство по регистрации
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Шаг 2: Первый проект</h3>
                  <p className="text-sm text-muted-foreground">
                    Создайте свой первый ML проект
                  </p>
                  <Button variant="outline" className="w-full">
                    <FileText className="h-4 w-4 mr-2" />
                    Создание проекта
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Шаг 3: Загрузка данных</h3>
                  <p className="text-sm text-muted-foreground">
                    Загрузите и подготовьте ваши данные
                  </p>
                  <Button variant="outline" className="w-full">
                    <Database className="h-4 w-4 mr-2" />
                    Работа с данными
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Шаг 4: Запуск модели</h3>
                  <p className="text-sm text-muted-foreground">
                    Обучите и запустите вашу первую модель
                  </p>
                  <Button className="w-full">
                    <Cpu className="h-4 w-4 mr-2" />
                    Обучение модели
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code2 className="h-5 w-5 text-primary" />
                  REST API
                </CardTitle>
                <CardDescription>HTTP API для интеграции с внешними системами</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted p-3 rounded-lg">
                  <code className="text-xs">
                    POST /api/v1/models/predict<br/>
                    GET /api/v1/datasets<br/>
                    POST /api/v1/experiments
                  </code>
                </div>
                <Button className="w-full" variant="outline">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Открыть Swagger
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code2 className="h-5 w-5 text-primary" />
                  Python SDK
                </CardTitle>
                <CardDescription>Библиотека для Python разработчиков</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted p-3 rounded-lg">
                  <code className="text-xs">
                    pip install qazcloud-ai<br/>
                    from qazcloud import QazCloudAI<br/>
                    client = QazCloudAI(api_key="...")
                  </code>
                </div>
                <Button className="w-full" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Скачать SDK
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="examples" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Классификация изображений",
                description: "Пример обучения CNN для классификации медицинских снимков",
                tech: "Python, TensorFlow"
              },
              {
                title: "Анализ настроений",
                description: "NLP модель для анализа отзывов клиентов",
                tech: "Python, BERT"
              },
              {
                title: "Детекция аномалий",
                description: "Обнаружение аномалий в финансовых транзакциях",
                tech: "Python, Scikit-learn"
              }
            ].map((example, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Play className="h-5 w-5 text-primary" />
                    {example.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{example.description}</p>
                  <Badge variant="secondary">{example.tech}</Badge>
                  <div className="flex space-x-2">
                    <Button size="sm" className="flex-1">
                      <Play className="h-4 w-4 mr-1" />
                      Запустить
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-1" />
                      Код
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
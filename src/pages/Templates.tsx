import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  FileText, 
  Search, 
  Plus, 
  Download, 
  Star, 
  Users, 
  Clock,
  Tag,
  Copy,
  Eye,
  Filter,
  Sparkles
} from "lucide-react";

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  difficulty: 'Начинающий' | 'Средний' | 'Продвинутый';
  rating: number;
  tags: string[];
  estimatedTime: string;
  preview: string;
}

const mockTemplates: Template[] = [
  {
    id: '1',
    name: 'Анализ настроений клиентов',
    description: 'Полный пайплайн для анализа отзывов и настроений клиентов с использованием NLP',
    category: 'NLP',
    difficulty: 'Средний',
    rating: 4.8,
    tags: ['sentiment-analysis', 'nlp', 'customer-feedback'],
    estimatedTime: '2-3 часа',
    preview: 'Включает предобработку текста, векторизацию, обучение модели и визуализацию результатов'
  },
  {
    id: '2',
    name: 'Детекция аномалий в данных',
    description: 'Система обнаружения аномалий для мониторинга производственных процессов',
    category: 'Anomaly Detection',
    difficulty: 'Продвинутый',
    rating: 4.9,
    tags: ['anomaly-detection', 'monitoring', 'production'],
    estimatedTime: '4-5 часов',
    preview: 'Автоэнкодеры, изоляционный лес, статистические методы обнаружения выбросов'
  },
  {
    id: '3',
    name: 'Рекомендательная система',
    description: 'Система персональных рекомендаций для e-commerce платформ',
    category: 'Recommendation',
    difficulty: 'Средний',
    rating: 4.7,
    tags: ['recommendation', 'collaborative-filtering', 'ecommerce'],
    estimatedTime: '3-4 часа',
    preview: 'Коллаборативная и контентная фильтрация, гибридные подходы'
  },
  {
    id: '4',
    name: 'Классификация изображений',
    description: 'Обучение CNN для классификации изображений с transfer learning',
    category: 'Computer Vision',
    difficulty: 'Начинающий',
    rating: 4.6,
    tags: ['computer-vision', 'cnn', 'transfer-learning'],
    estimatedTime: '1-2 часа',
    preview: 'Предобученные модели, fine-tuning, аугментация данных'
  },
  {
    id: '5',
    name: 'Прогнозирование временных рядов',
    description: 'Модели для прогнозирования продаж и финансовых показателей',
    category: 'Time Series',
    difficulty: 'Средний',
    rating: 4.5,
    tags: ['time-series', 'forecasting', 'lstm'],
    estimatedTime: '3-4 часа',
    preview: 'ARIMA, LSTM, Prophet для анализа трендов и сезонности'
  },
  {
    id: '6',
    name: 'Чат-бот с RAG',
    description: 'Интеллектуальный чат-бот с поиском по документам',
    category: 'NLP',
    difficulty: 'Продвинутый',
    rating: 4.9,
    tags: ['chatbot', 'rag', 'vector-search'],
    estimatedTime: '5-6 часов',
    preview: 'Векторная база знаний, семантический поиск, генерация ответов'
  },
  {
    id: '7',
    name: 'Бот отчет по командировкам',
    description: 'Автоматизация создания и анализа отчетов по служебным командировкам',
    category: 'Automation',
    difficulty: 'Начинающий',
    rating: 4.7,
    tags: ['automation', 'reports', 'business'],
    estimatedTime: '1-2 часа',
    preview: 'Обработка документов, автоматическое заполнение форм, генерация отчетов'
  },
  {
    id: '8',
    name: 'Анализ нарушений на производстве',
    description: 'Система мониторинга и анализа нарушений техники безопасности',
    category: 'Safety',
    difficulty: 'Средний',
    rating: 4.8,
    tags: ['safety', 'monitoring', 'analysis'],
    estimatedTime: '2-3 часа',
    preview: 'Компьютерное зрение для обнаружения нарушений, классификация событий'
  }
];

const categories = ['Все', 'NLP', 'Computer Vision', 'Recommendation', 'Time Series', 'Anomaly Detection', 'Automation', 'Safety'];
const difficulties = ['Все', 'Начинающий', 'Средний', 'Продвинутый'];

export default function Templates() {
  const [templates] = useState<Template[]>(mockTemplates);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Все");
  const [selectedDifficulty, setSelectedDifficulty] = useState("Все");

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "Все" || template.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === "Все" || template.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty: Template['difficulty']) => {
    switch (difficulty) {
      case 'Начинающий':
        return 'bg-green-500/10 text-green-700 border-green-200';
      case 'Средний':
        return 'bg-yellow-500/10 text-yellow-700 border-yellow-200';
      case 'Продвинутый':
        return 'bg-red-500/10 text-red-700 border-red-200';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Шаблоны проектов</h1>
          <p className="text-muted-foreground">Готовые решения для быстрого старта ML проектов</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Создать шаблон
        </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Создание шаблона</DialogTitle>
              <DialogDescription>
                Поделитесь своим решением с сообществом
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Input placeholder="Название шаблона" />
              <textarea 
                className="w-full p-3 border border-border rounded-md resize-none" 
                rows={4} 
                placeholder="Описание шаблона..."
              />
              <div className="grid grid-cols-2 gap-4">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Категория" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.slice(1).map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Сложность" />
                  </SelectTrigger>
                  <SelectContent>
                    {difficulties.slice(1).map(diff => (
                      <SelectItem key={diff} value={diff}>{diff}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Input placeholder="Теги (через запятую)" />
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline">Отмена</Button>
                <Button>Создать шаблон</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { title: "Всего инструментов", value: "26", icon: FileText },
          { title: "Популярных", value: "8", icon: Star }
        ].map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Поиск шаблонов..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Фильтры:</span>
          </div>
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {difficulties.map(difficulty => (
                <SelectItem key={difficulty} value={difficulty}>{difficulty}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="group hover:shadow-lg transition-all duration-300 hover:border-primary/50">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {template.name}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{template.category}</Badge>
                    <Badge className={getDifficultyColor(template.difficulty)}>
                      {template.difficulty}
                    </Badge>
                  </div>
                </div>
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <CardDescription className="text-sm line-clamp-2">
                {template.description}
              </CardDescription>
              
              <Button size="sm" className="w-full">
                <Copy className="h-4 w-4 mr-1" />
                Использовать
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12 space-y-3">
          <FileText className="h-12 w-12 text-muted-foreground mx-auto" />
          <h3 className="text-lg font-medium">Шаблоны не найдены</h3>
          <p className="text-muted-foreground">
            Попробуйте изменить критерии поиска или фильтры
          </p>
        </div>
      )}
    </div>
  );
}
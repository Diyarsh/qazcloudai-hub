import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search,
  MessageSquare,
  Database,
  TrendingUp,
  Shield,
  AlertTriangle,
  FileText,
  Download,
  Star,
  Tag
} from "lucide-react";

interface Template {
  id: string;
  name: string;
  description: string;
  category: 'flow' | 'model';
  tags: string[];
  rating: number;
  downloads: number;
  input: string;
  output: string;
  icon: React.ComponentType<{ className?: string }>;
}

const mockTemplates: Template[] = [
  {
    id: '1',
    name: 'FAQ-бот по документам',
    description: 'Автоматический бот для ответов на вопросы по корпоративным документам с использованием RAG',
    category: 'flow',
    tags: ['RAG', 'FAQ', 'Документы'],
    rating: 4.8,
    downloads: 1250,
    input: 'Текст вопроса',
    output: 'Ответ с источниками',
    icon: MessageSquare
  },
  {
    id: '2',
    name: 'Data-assistant для SQL',
    description: 'Помощник для создания SQL запросов и анализа данных на естественном языке',
    category: 'flow',
    tags: ['SQL', 'Analytics', 'Chat'],
    rating: 4.6,
    downloads: 890,
    input: 'Вопрос на естественном языке',
    output: 'SQL запрос + результат',
    icon: Database
  },
  {
    id: '3',
    name: 'Прогноз спроса',
    description: 'Модель для прогнозирования спроса на товары на основе исторических данных',
    category: 'model',
    tags: ['Forecast', 'TimeSeries', 'Demand'],
    rating: 4.7,
    downloads: 650,
    input: 'Исторические данные продаж',
    output: 'Прогноз спроса',
    icon: TrendingUp
  },
  {
    id: '4',
    name: 'Анти-фрод детектор',
    description: 'Система обнаружения мошеннических операций и аномалий в финансовых данных',
    category: 'model',
    tags: ['Fraud', 'Anomaly', 'Security'],
    rating: 4.9,
    downloads: 420,
    input: 'Данные транзакций',
    output: 'Оценка риска мошенничества',
    icon: Shield
  },
  {
    id: '5',
    name: 'Инцидент-бот',
    description: 'Автоматическая обработка и классификация IT инцидентов с уведомлениями',
    category: 'flow',
    tags: ['Incidents', 'ITSM', 'Automation'],
    rating: 4.5,
    downloads: 380,
    input: 'Описание инцидента',
    output: 'Классификация и действия',
    icon: AlertTriangle
  },
  {
    id: '6',
    name: 'Контент-ассистент',
    description: 'Генерация и модерация контента с проверкой стиля и тональности',
    category: 'flow',
    tags: ['Content', 'Generation', 'Moderation'],
    rating: 4.4,
    downloads: 720,
    input: 'Техническое задание',
    output: 'Готовый контент',
    icon: FileText
  }
];

export default function Catalog() {
  const [templates] = useState<Template[]>(mockTemplates);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'flow' | 'model'>('all');

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = categoryFilter === 'all' || template.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Каталог</h1>
          <p className="text-muted-foreground">Готовые флоу и модели для быстрого старта</p>
        </div>
      </div>

      <Tabs value={categoryFilter} onValueChange={(value) => setCategoryFilter(value as any)} className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">Все</TabsTrigger>
            <TabsTrigger value="flow">Флоу</TabsTrigger>
            <TabsTrigger value="model">Модели</TabsTrigger>
          </TabsList>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Поиск в каталоге..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-80"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <Card key={template.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <template.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg leading-tight">{template.name}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant={template.category === 'flow' ? 'default' : 'secondary'}>
                          {template.category === 'flow' ? 'Флоу' : 'Модель'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <CardDescription className="text-sm leading-relaxed">
                  {template.description}
                </CardDescription>
                
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-1">
                    {template.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Вход:</span>
                      <span className="font-medium">{template.input}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Выход:</span>
                      <span className="font-medium">{template.output}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>{template.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Download className="h-3 w-3" />
                        <span>{template.downloads}</span>
                      </div>
                    </div>
                    
                    <Button size="sm">
                      Установить
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Tabs>
    </div>
  );
}
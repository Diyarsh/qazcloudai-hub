import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Star, Filter, Cpu, Brain, FileText, BarChart3, Bot, Zap } from "lucide-react";
import { QazCloudLogo } from "@/components/ui/qazcloud-logo";
import { useSearchParams } from "react-router-dom";

export default function AIStudio() {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Set initial category from URL params
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam && categoryParam !== selectedCategory) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);

  const models = [
    {
      id: 1,
      name: "QazLLM-Ultra",
      description: "Суверенная языковая модель для корпоративного сектора",
      provider: "QazCloud AI-HUB",
      category: "llm",
      rating: 4.9,
      uses: 156000,
      tags: ["Казахский", "Русский", "Английский"]
    },
    {
      id: 2,
      name: "GPT-4 Turbo",
      description: "Продвинутая языковая модель для генерации текста",
      provider: "OpenAI",
      category: "llm",
      rating: 4.9,
      uses: 2543000,
      tags: ["Текст", "Код", "Анализ"]
    },
    {
      id: 3,
      name: "Claude 3.5 Sonnet",
      description: "Мощная модель для анализа и создания контента",
      provider: "Anthropic",
      category: "llm",
      rating: 4.8,
      uses: 1876000,
      tags: ["Анализ", "Творчество", "Безопасность"]
    },
    {
      id: 4,
      name: "DocAnalyzer AI",
      description: "ИИ-модель для анализа документов",
      provider: "QazCloud AI-HUB",
      category: "document",
      rating: 4.7,
      uses: 67800,
      tags: ["PDF", "Извлечение", "OCR"]
    },
    {
      id: 5,
      name: "VisionNet Pro",
      description: "Компьютерное зрение для промышленности",
      provider: "QazCloud AI-HUB",
      category: "vision",
      rating: 4.6,
      uses: 45600,
      tags: ["Детекция", "Классификация", "Сегментация"]
    },
    {
      id: 6,
      name: "DataPredict ML",
      description: "AutoML платформа для предсказательной аналитики",
      provider: "QazCloud AI-HUB",
      category: "automl",
      rating: 4.5,
      uses: 23400,
      tags: ["Регрессия", "Классификация", "AutoML"]
    }
  ];

  const solutions = [
    {
      id: 1,
      name: "FAQ-бот по документам",
      description: "Автоматические ответы на вопросы по корпоративной документации",
      category: "bot",
      icon: Bot,
      tags: ["RAG", "NLP", "Поиск"]
    },
    {
      id: 2,
      name: "Анализ нарушений на производстве",
      description: "Мониторинг и анализ нарушений техники безопасности",
      category: "analytics",
      icon: BarChart3,
      tags: ["Безопасность", "Мониторинг", "Алерты"]
    },
    {
      id: 3,
      name: "Бот отчетов по командировкам",
      description: "Автоматизация создания и обработки командировочных отчетов",
      category: "automation",
      icon: FileText,
      tags: ["Автоматизация", "Отчеты", "HR"]
    },
    {
      id: 4,
      name: "Анализ текстов и документов",
      description: "Интеллектуальная обработка и анализ документооборота",
      category: "document",
      icon: FileText,
      tags: ["NLP", "Классификация", "Извлечение"]
    },
    {
      id: 5,
      name: "Система рекомендаций",
      description: "Персонализированные рекомендации для клиентов",
      category: "ml",
      icon: Zap,
      tags: ["ML", "Персонализация", "Рекомендации"]
    },
    {
      id: 6,
      name: "Прогнозирование спроса",
      description: "Предсказание спроса на товары и услуги",
      category: "analytics",
      icon: BarChart3,
      tags: ["Прогнозы", "Временные ряды", "Бизнес"]
    }
  ];

  const categories = [
    { id: "all", name: "Все", count: models.length + solutions.length },
    { id: "llm", name: "Языковые модели", count: models.filter(m => m.category === "llm").length },
    { id: "vision", name: "Компьютерное зрение", count: models.filter(m => m.category === "vision").length },
    { id: "document", name: "Обработка документов", count: models.filter(m => m.category === "document").length + solutions.filter(s => s.category === "document").length },
    { id: "automl", name: "AutoML", count: models.filter(m => m.category === "automl").length },
    { id: "bot", name: "Боты", count: solutions.filter(s => s.category === "bot").length },
    { id: "analytics", name: "Аналитика", count: solutions.filter(s => s.category === "analytics").length }
  ];

  const filteredModels = models.filter(model => {
    const matchesSearch = model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         model.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || model.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredSolutions = solutions.filter(solution => {
    const matchesSearch = solution.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         solution.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || solution.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">AI-Студия</h1>
          <p className="text-muted-foreground">Библиотека AI-решений</p>
        </div>

        {/* Search and Filters */}
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Поиск моделей и решений..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Фильтры
          </Button>
        </div>

        {/* Categories */}
        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name} ({category.count})
            </Button>
          ))}
        </div>
      </div>

      {/* Content Tabs */}
      <Tabs defaultValue="models" className="space-y-6">
        <TabsList>
          <TabsTrigger value="models" className="flex items-center gap-2">
            <Cpu className="h-4 w-4" />
            Агенты ({filteredModels.length})
          </TabsTrigger>
          <TabsTrigger value="solutions" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            От Разработчиков ({filteredSolutions.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="models">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredModels.map((model) => (
              <Card key={model.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <QazCloudLogo className="h-5 w-5" />
                      <CardTitle className="text-lg">{model.name}</CardTitle>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{model.rating}</span>
                    </div>
                  </div>
                  <CardDescription className="text-sm">
                    {model.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-1">
                    {model.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{model.provider}</span>
                    <span>{model.uses.toLocaleString()} использований</span>
                  </div>
                  <Button className="w-full">
                    Использовать
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="solutions">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSolutions.map((solution) => (
              <Card key={solution.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <solution.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{solution.name}</CardTitle>
                    </div>
                  </div>
                  <CardDescription className="text-sm">
                    {solution.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-1">
                    {solution.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button className="w-full">
                    Использовать
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
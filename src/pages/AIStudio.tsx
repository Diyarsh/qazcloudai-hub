import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Star, Filter, Cpu, Brain, FileText, BarChart3, Bot, Zap, User } from "lucide-react";
import { QazCloudLogo } from "@/components/ui/qazcloud-logo";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function AIStudio() {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const navigate = useNavigate();

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
      description: "Суверенная языковая модель для корпоративного сектора Казахстана",
      provider: "QazCloud AI-HUB",
      category: "llm",
      rating: 4.9,
      uses: 156000,
      tags: ["Казахский", "Русский", "Английский", "Тенге"]
    },
    {
      id: 2,
      name: "QazAssistant Pro",
      description: "Корпоративный ассистент для казахстанских предприятий",
      provider: "QazCloud AI-HUB",
      category: "assistant",
      rating: 4.8,
      uses: 89000,
      tags: ["HR", "Документооборот", "Планирование"]
    },
    {
      id: 3,
      name: "KazDoc AI",
      description: "Специализированный анализ казахстанской документации",
      provider: "QazCloud AI-HUB",
      category: "document",
      rating: 4.7,
      uses: 67800,
      tags: ["Госдокументы", "Правовые акты", "OCR"]
    },
    {
      id: 4,
      name: "KazCode Assistant",
      description: "Помощник программиста для разработки в Казахстане",
      provider: "QazCloud AI-HUB",
      category: "code",
      rating: 4.6,
      uses: 45600,
      tags: ["Python", "JavaScript", "Код-ревью"]
    },
    {
      id: 5,
      name: "Industrial KZ",
      description: "ИИ для промышленности Казахстана",
      provider: "QazCloud AI-HUB",
      category: "industrial",
      rating: 4.8,
      uses: 34500,
      tags: ["Горнодобыча", "Нефтегаз", "Мониторинг"]
    },
    {
      id: 6,
      name: "GPT-4 Turbo",
      description: "Международная языковая модель",
      provider: "OpenAI",
      category: "llm",
      rating: 4.9,
      uses: 2543000,
      tags: ["Многоязычность", "Анализ", "Генерация"]
    }
  ];

  const developersolutions = [
    {
      id: 1,
      name: "Электронное правительство чат-бот",
      description: "Автоматические ответы на вопросы граждан по государственным услугам",
      category: "Корпоративный ассистент",
      company: "QazTech Solutions",
      icon: Bot,
      users: "45К",
      rating: 4.8,
      tags: ["ЭГов", "Граждане", "24/7"]
    },
    {
      id: 2,
      name: "Анализ контрактов ГЗК",
      description: "Обработка документов государственных закупок",
      category: "Документы", 
      company: "KazLegal AI",
      icon: FileText,
      users: "12К",
      rating: 4.9,
      tags: ["Контракты", "ГЗК", "Комплаенс"]
    },
    {
      id: 3,
      name: "HR-бот для Самрук-Казына",
      description: "Автоматизация HR-процессов в госкорпорациях",
      category: "Корпоративный ассистент",
      company: "Samruk-Kazyna Digital",
      icon: Bot,
      users: "8К",
      rating: 4.7,
      tags: ["HR", "Корпоративный", "Автоматизация"]
    },
    {
      id: 4,
      name: "Мониторинг месторождений",
      description: "ИИ-система контроля промышленных объектов",
      category: "Промышленные",
      company: "KazMining Tech",
      icon: BarChart3,
      users: "3К",
      rating: 4.6,
      tags: ["Горнодобыча", "IoT", "Безопасность"]
    },
    {
      id: 5,
      name: "Код-ревьювер QazDev",
      description: "Автоматическая проверка кода по казахстанским стандартам",
      category: "Код",
      company: "QazDev Studio",
      icon: Zap,
      users: "15К",
      rating: 4.8,
      tags: ["Код-ревью", "ГОСТ", "Качество"]
    },
    {
      id: 6,
      name: "Налоговый ассистент",
      description: "Помощник по налоговому законодательству РК",
      category: "Документы",
      company: "TaxBot KZ",
      icon: FileText,
      users: "25К", 
      rating: 4.9,
      tags: ["Налоги", "Законодательство", "КНК"]
    }
  ];

  const categories = [
    { id: "all", name: "Все", count: models.length + developersolutions.length },
    { id: "llm", name: "Языковые модели", count: models.filter(m => m.category === "llm").length },
    { id: "assistant", name: "Корпоративный ассистент", count: models.filter(m => m.category === "assistant").length + developersolutions.filter(s => s.category === "Корпоративный ассистент").length },
    { id: "document", name: "Документы", count: models.filter(m => m.category === "document").length + developersolutions.filter(s => s.category === "Документы").length },
    { id: "code", name: "Код", count: models.filter(m => m.category === "code").length + developersolutions.filter(s => s.category === "Код").length },
    { id: "industrial", name: "Промышленные", count: models.filter(m => m.category === "industrial").length + developersolutions.filter(s => s.category === "Промышленные").length }
  ];

  const filteredModels = models.filter(model => {
    const matchesSearch = model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         model.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || model.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredSolutions = developersolutions.filter(solution => {
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
              <Card key={solution.id} className="hover:shadow-lg transition-all cursor-pointer group">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-gradient-to-r from-primary to-primary/80">
                        <solution.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">
                          {solution.name}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">{solution.company}</p>
                      </div>
                    </div>
                    <Badge variant="outline">{solution.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{solution.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {solution.users}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        {solution.rating}
                      </span>
                    </div>
                    <Button 
                      size="sm"
                      onClick={() => {
                        if (solution.name === "HR-бот для Самрук-Казына") {
                          navigate("/hr-bot");
                        }
                      }}
                    >
                      Использовать
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
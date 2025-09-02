import { useState } from "react";
import { QazCloudLogo } from "@/components/ui/qazcloud-logo";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Filter, 
  Star, 
  Download, 
  Play, 
  Info,
  Image,
  MessageSquare,
  BarChart3,
  Layers
} from "lucide-react";

export default function Models() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProvider, setSelectedProvider] = useState("all");

  const modelCategories = [
    { id: "all", name: "Все категории", icon: Layers },
    { id: "nlp", name: "Обработка текста", icon: MessageSquare },
    { id: "vision", name: "Компьютерное зрение", icon: Image },
    { id: "speech", name: "Распознавание речи", icon: QazCloudLogo },
    { id: "analytics", name: "Аналитика", icon: BarChart3 }
  ];

  const providers = [
    { id: "all", name: "Все провайдеры" },
    { id: "openai", name: "OpenAI" },
    { id: "anthropic", name: "Anthropic" },
    { id: "meta", name: "Meta" },
    { id: "google", name: "Google" },
    { id: "custom", name: "Собственные" }
  ];

  const models = [
    {
      id: "gpt-4-turbo",
      name: "GPT-4 Turbo",
      provider: "OpenAI",
      category: "nlp",
      description: "Самая продвинутая языковая модель с улучшенными возможностями",
      version: "2024-04-09",
      rating: 4.9,
      downloads: 12500,
      status: "active",
      pricing: "0.01$/1K токенов",
      features: ["128K контекст", "Мультимодальность", "JSON mode"]
    },
    {
      id: "claude-3-opus",
      name: "Claude 3 Opus",
      provider: "Anthropic",
      category: "nlp",
      description: "Мощная модель для сложных задач анализа и рассуждения",
      version: "20240229",
      rating: 4.8,
      downloads: 8700,
      status: "active",
      pricing: "0.015$/1K токенов",
      features: ["200K контекст", "Безопасность", "Логические рассуждения"]
    },
    {
      id: "llama-2-70b",
      name: "Llama 2 70B",
      provider: "Meta",
      category: "nlp",
      description: "Открытая модель для коммерческого использования",
      version: "2.0",
      rating: 4.6,
      downloads: 15200,
      status: "active",
      pricing: "Бесплатно",
      features: ["Открытый код", "70B параметров", "Коммерческая лицензия"]
    },
    {
      id: "dall-e-3",
      name: "DALL-E 3",
      provider: "OpenAI",
      category: "vision",
      description: "Генерация изображений по текстовому описанию",
      version: "3.0",
      rating: 4.7,
      downloads: 9800,
      status: "active",
      pricing: "0.04$/изображение",
      features: ["1024x1024", "Стилизация", "Редактирование"]
    },
    {
      id: "whisper-large",
      name: "Whisper Large V3",
      provider: "OpenAI",
      category: "speech",
      description: "Распознавание и транскрипция речи на 99 языках",
      version: "3.0",
      rating: 4.8,
      downloads: 6500,
      status: "active",
      pricing: "0.006$/минута",
      features: ["99 языков", "Высокая точность", "Временные метки"]
    },
    {
      id: "custom-classifier",
      name: "Корпоративный классификатор",
      provider: "Custom",
      category: "analytics",
      description: "Собственная модель для классификации документов",
      version: "1.2",
      rating: 4.5,
      downloads: 450,
      status: "beta",
      pricing: "Внутреннее использование",
      features: ["Обученная модель", "Русский язык", "Высокая точность"]
    }
  ];

  const filteredModels = models.filter(model => {
    const matchesSearch = model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         model.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || model.category === selectedCategory;
    const matchesProvider = selectedProvider === "all" || 
                           model.provider.toLowerCase() === selectedProvider;
    
    return matchesSearch && matchesCategory && matchesProvider;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-500";
      case "beta": return "bg-yellow-500";
      case "deprecated": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active": return "Активна";
      case "beta": return "Бета";
      case "deprecated": return "Устарела";
      default: return "Неизвестно";
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Каталог моделей</h1>
          <p className="text-muted-foreground">
            Библиотека AI-моделей для ваших проектов
          </p>
        </div>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Добавить модель
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Поиск моделей..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full lg:w-48">
            <SelectValue placeholder="Категория" />
          </SelectTrigger>
          <SelectContent>
            {modelCategories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedProvider} onValueChange={setSelectedProvider}>
          <SelectTrigger className="w-full lg:w-48">
            <SelectValue placeholder="Провайдер" />
          </SelectTrigger>
          <SelectContent>
            {providers.map((provider) => (
              <SelectItem key={provider.id} value={provider.id}>
                {provider.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Categories Tabs */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="grid w-full grid-cols-5">
          {modelCategories.map((category) => (
            <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2">
              <category.icon className="h-4 w-4" />
              <span className="hidden sm:inline">{category.name}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={selectedCategory} className="mt-6">
          {/* Models Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredModels.map((model) => (
              <Card key={model.id} className="group hover:shadow-lg transition-all duration-200">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {model.name}
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {model.provider}
                        </Badge>
                        <div className="flex items-center gap-1">
                          <div className={`h-2 w-2 rounded-full ${getStatusColor(model.status)}`} />
                          <span className="text-xs text-muted-foreground">
                            {getStatusText(model.status)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-sm leading-relaxed">
                    {model.description}
                  </CardDescription>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Версия:</span>
                      <span className="font-medium">{model.version}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Загрузки:</span>
                      <span className="font-medium">{model.downloads.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-xs font-medium text-muted-foreground">Возможности:</div>
                    <div className="flex flex-wrap gap-1">
                      {model.features.map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button size="sm" className="flex-1">
                      <Play className="h-3 w-3 mr-1" />
                      Тест
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Download className="h-3 w-3 mr-1" />
                      Добавить
                    </Button>
                    <Button size="sm" variant="outline">
                      <Info className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredModels.length === 0 && (
            <div className="text-center py-12">
              <QazCloudLogo className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                Модели не найдены
              </h3>
              <p className="text-muted-foreground">
                Попробуйте изменить критерии поиска или фильтры
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
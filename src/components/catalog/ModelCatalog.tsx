import { useState } from "react";
import { Search, Filter, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ModelCard } from "@/components/models/ModelCard";

const mockModels = [
  // QazCloud AI-HUB модели
  {
    id: 1,
    name: "QazLLM-Ultra",
    description: "Суверенная большая языковая модель для корпоративного сектора. Обеспечивает безопасную обработку конфиденциальных данных с высокой точностью анализа документов и генерации контента.",
    provider: "QazCloud AI-HUB",
    category: "Текст",
    rating: 4.9,
    uses: 156000
  },
  {
    id: 2,
    name: "SafeChat Pro",
    description: "Защищенная модель для корпоративного общения и анализа. Специально адаптирована для работы с коммерческой тайной и внутренними коммуникациями организаций группы.",
    provider: "QazCloud AI-HUB",
    category: "Текст",
    rating: 4.8,
    uses: 89300
  },
  {
    id: 3,
    name: "DocAnalyzer AI",
    description: "ИИ-модель для глубокого анализа документов, извлечения ключевой информации и автоматической классификации. Поддерживает форматы PDF, Word, Excel.",
    provider: "QazCloud AI-HUB",
    category: "Документы",
    rating: 4.7,
    uses: 67800
  },
  {
    id: 4,
    name: "VisionSecure",
    description: "Модель компьютерного зрения для анализа изображений и видео в защищенной корпоративной среде. Детекция объектов, распознавание лиц, анализ производственных процессов.",
    provider: "QazCloud AI-HUB",
    category: "Компьютерное зрение",
    rating: 4.6,
    uses: 45200
  },
  {
    id: 5,
    name: "SecurityGuard AI",
    description: "Модель для кибербезопасности и мониторинга угроз. Анализ сетевого трафика, детекция аномалий, предотвращение атак в реальном времени.",
    provider: "QazCloud AI-HUB",
    category: "Безопасность",
    rating: 4.8,
    uses: 73400
  },
  // Мировые модели OpenAI
  {
    id: 6,
    name: "GPT-4 Turbo",
    description: "Самая продвинутая языковая модель для генерации текста, анализа и программирования. Обеспечивает высокое качество ответов и понимание контекста.",
    provider: "OpenAI",
    category: "Текст",
    rating: 4.9,
    uses: 2543000
  },
  {
    id: 7,
    name: "GPT-4 Vision",
    description: "Мультимодальная модель с возможностью анализа изображений и текста. Понимает визуальный контент и может отвечать на вопросы о картинках.",
    provider: "OpenAI",
    category: "Мультимодальная",
    rating: 4.8,
    uses: 1876000
  },
  {
    id: 8,
    name: "DALL-E 3",
    description: "Современная модель для генерации изображений по текстовому описанию. Создает высококачественные и детализированные изображения.",
    provider: "OpenAI",
    category: "Изображения",
    rating: 4.7,
    uses: 987000
  },
  {
    id: 9,
    name: "Whisper Large",
    description: "Модель для распознавания речи и транскрипции аудио. Поддерживает множество языков и форматов аудиофайлов.",
    provider: "OpenAI",
    category: "Аудио",
    rating: 4.6,
    uses: 654000
  },
  // Anthropic модели
  {
    id: 10,
    name: "Claude 3.5 Sonnet",
    description: "Мощная модель для анализа текста, создания контента и решения сложных задач. Отличается высокой точностью и креативностью.",
    provider: "Anthropic",
    category: "Текст",
    rating: 4.8,
    uses: 1876000
  },
  {
    id: 11,
    name: "Claude 3 Opus",
    description: "Самая мощная модель Anthropic для сложных аналитических задач, программирования и творческой работы.",
    provider: "Anthropic",
    category: "Текст",
    rating: 4.7,
    uses: 923000
  },
  // Google модели
  {
    id: 12,
    name: "Gemini Pro",
    description: "Мультимодальная модель Google с возможностью обработки текста, изображений и кода. Высокая производительность в различных задачах.",
    provider: "Google",
    category: "Мультимодальная",
    rating: 4.6,
    uses: 1234000
  },
  {
    id: 13,
    name: "Gemini Ultra",
    description: "Флагманская модель Google для самых сложных задач. Превосходные возможности в рассуждениях, математике и программировании.",
    provider: "Google",
    category: "Текст",
    rating: 4.8,
    uses: 678000
  },
  // Meta модели
  {
    id: 14,
    name: "Llama 3 70B",
    description: "Открытая языковая модель Meta с 70 миллиардами параметров. Отличная производительность при обработке естественного языка.",
    provider: "Meta",
    category: "Текст",
    rating: 4.5,
    uses: 567000
  },
  {
    id: 15,
    name: "Code Llama 70B",
    description: "Специализированная модель для программирования. Генерирует, объясняет и оптимизирует код на различных языках программирования.",
    provider: "Meta",
    category: "Код",
    rating: 4.5,
    uses: 432000
  },
  // Stability AI модели
  {
    id: 16,
    name: "Stable Diffusion XL",
    description: "Открытая модель для генерации изображений с высоким разрешением. Поддерживает различные стили и настройки.",
    provider: "Stability AI",
    category: "Изображения",
    rating: 4.4,
    uses: 876000
  },
  // Дополнительные QazCloud модели
  {
    id: 17,
    name: "FinanceAnalyst AI",
    description: "Специализированная модель для финансового анализа. Прогнозирование рисков, анализ инвестиционных портфелей, автоматизация финансовой отчетности.",
    provider: "QazCloud AI-HUB",
    category: "Финансы",
    rating: 4.6,
    uses: 36800
  },
  {
    id: 18,
    name: "ProcessOptimizer",
    description: "ИИ-модель для оптимизации бизнес-процессов. Анализ workflow, выявление узких мест, предложения по автоматизации и повышению эффективности.",
    provider: "QazCloud AI-HUB",
    category: "Оптимизация",
    rating: 4.7,
    uses: 41300
  }
];

const categories = ["Все", "Текст", "Документы", "Компьютерное зрение", "Код", "Аудио", "Изображения", "Мультимодальная", "Безопасность", "Финансы", "Оптимизация"];
const providers = ["Все", "QazCloud AI-HUB", "OpenAI", "Anthropic", "Google", "Meta", "Stability AI"];

export const ModelCatalog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Все");
  const [selectedProvider, setSelectedProvider] = useState("Все");

  const filteredModels = mockModels.filter(model => {
    const matchesSearch = model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         model.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Все" || model.category === selectedCategory;
    const matchesProvider = selectedProvider === "Все" || model.provider === selectedProvider;
    
    return matchesSearch && matchesCategory && matchesProvider;
  });

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="text-center space-y-4 py-8">
        <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Каталог ИИ-моделей
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Исследуйте лучшие модели искусственного интеллекта для ваших проектов
        </p>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Поиск моделей..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-12 bg-card border-border focus:border-ai-primary"
          />
        </div>
        
        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex items-center space-x-2">
            <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Фильтры:</span>
          </div>
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px] bg-card border-border">
              <SelectValue placeholder="Категория" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={selectedProvider} onValueChange={setSelectedProvider}>
            <SelectTrigger className="w-[180px] bg-card border-border">
              <SelectValue placeholder="Поставщик" />
            </SelectTrigger>
            <SelectContent>
              {providers.map((provider) => (
                <SelectItem key={provider} value={provider}>
                  {provider}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {(selectedCategory !== "Все" || selectedProvider !== "Все") && (
            <Button
              variant="outline"
              onClick={() => {
                setSelectedCategory("Все");
                setSelectedProvider("Все");
              }}
              className="text-muted-foreground hover:text-foreground"
            >
              Сбросить
            </Button>
          )}
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2">
        {categories.slice(1).map((category) => (
          <Badge
            key={category}
            variant={selectedCategory === category ? "default" : "secondary"}
            className={`cursor-pointer transition-all ${
              selectedCategory === category
                ? "bg-gradient-primary text-white shadow-ai"
                : "bg-ai-muted hover:bg-ai-muted/80"
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Badge>
        ))}
      </div>

      {/* Results */}
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Найдено моделей: {filteredModels.length}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModels.map((model) => (
            <ModelCard key={model.id} {...model} />
          ))}
        </div>
        
        {filteredModels.length === 0 && (
          <div className="text-center py-12 space-y-3">
            <Filter className="h-12 w-12 text-muted-foreground mx-auto" />
            <h3 className="text-lg font-medium">Модели не найдены</h3>
            <p className="text-muted-foreground">
              Попробуйте изменить критерии поиска или фильтры
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
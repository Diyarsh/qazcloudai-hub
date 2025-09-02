import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Plus, 
  MoreVertical, 
  Play, 
  Pause, 
  Eye, 
  Copy, 
  Trash2,
  Calendar,
  User,
  Clock,
  FolderOpen
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Projects() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("my");

  const projects = [
    {
      id: "1",
      name: "Анализ клиентских данных",
      description: "Сегментация клиентов и прогнозирование поведения",
      status: "running",
      owner: "Алексей Петров",
      collaborators: 3,
      created: "2024-01-15",
      lastRun: "2024-01-18 14:30",
      models: ["GPT-4", "Claude-3"],
      category: "Analytics",
      isShared: false
    },
    {
      id: "2", 
      name: "Система рекомендаций",
      description: "ML-пайплайн для персонализированных рекомендаций",
      status: "completed",
      owner: "Мария Иванова",
      collaborators: 5,
      created: "2024-01-10",
      lastRun: "2024-01-17 09:15",
      models: ["Llama-2", "Custom-Model"],
      category: "ML Pipeline",
      isShared: true
    },
    {
      id: "3",
      name: "Обработка документов",
      description: "Автоматическая классификация и извлечение данных",
      status: "draft",
      owner: "Дмитрий Сидоров",
      collaborators: 2,
      created: "2024-01-12",
      lastRun: null,
      models: ["GPT-4", "Whisper"],
      category: "NLP",
      isShared: false
    },
    {
      id: "4",
      name: "Анализ настроений отзывов",
      description: "Мониторинг тональности клиентских отзывов",
      status: "error",
      owner: "Екатерина Волкова",
      collaborators: 1,
      created: "2024-01-08",
      lastRun: "2024-01-16 16:20",
      models: ["Claude-3", "BERT"],
      category: "NLP",
      isShared: true
    },
    {
      id: "5",
      name: "Прогнозирование продаж",
      description: "Временные ряды и предиктивная аналитика",
      status: "paused",
      owner: "Андрей Козлов",
      collaborators: 4,
      created: "2024-01-05",
      lastRun: "2024-01-15 11:45",
      models: ["Prophet", "LSTM"],
      category: "Forecasting",
      isShared: false
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "running": return "bg-green-500";
      case "completed": return "bg-blue-500";
      case "paused": return "bg-yellow-500";
      case "error": return "bg-red-500";
      case "draft": return "bg-gray-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "running": return "Выполняется";
      case "completed": return "Завершен";
      case "paused": return "Приостановлен";
      case "error": return "Ошибка";
      case "draft": return "Черновик";
      default: return "Неизвестно";
    }
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || project.status === statusFilter;
    const matchesTab = activeTab === "my" || (activeTab === "shared" && project.isShared);
    
    return matchesSearch && matchesStatus && matchesTab;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Мои проекты</h1>
          <p className="text-muted-foreground">
            Управление и мониторинг ML-проектов
          </p>
        </div>
        <Button onClick={() => navigate("/projects/new")}>
          <Plus className="h-4 w-4 mr-2" />
          Новый проект
        </Button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Поиск проектов..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full lg:w-48">
            <SelectValue placeholder="Статус" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все статусы</SelectItem>
            <SelectItem value="running">Выполняется</SelectItem>
            <SelectItem value="completed">Завершен</SelectItem>
            <SelectItem value="paused">Приостановлен</SelectItem>
            <SelectItem value="error">Ошибка</SelectItem>
            <SelectItem value="draft">Черновик</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="my">Мои проекты</TabsTrigger>
          <TabsTrigger value="shared">Общие проекты</TabsTrigger>
          <TabsTrigger value="templates">Шаблоны</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          {/* Projects Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="group hover:shadow-lg transition-all duration-200">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1 flex-1">
                      <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-1">
                        {project.name}
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {project.category}
                        </Badge>
                        <div className="flex items-center gap-1">
                          <div className={`h-2 w-2 rounded-full ${getStatusColor(project.status)}`} />
                          <span className="text-xs text-muted-foreground">
                            {getStatusText(project.status)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          Просмотр
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Play className="h-4 w-4 mr-2" />
                          Запустить
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="h-4 w-4 mr-2" />
                          Дублировать
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Удалить
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <CardDescription className="text-sm leading-relaxed line-clamp-2">
                    {project.description}
                  </CardDescription>

                  {/* Models */}
                  <div className="space-y-2">
                    <div className="text-xs font-medium text-muted-foreground">Модели:</div>
                    <div className="flex flex-wrap gap-1">
                      {project.models.map((model, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {model}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Meta Info */}
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <User className="h-3 w-3" />
                      <span>{project.owner}</span>
                      {project.collaborators > 0 && (
                        <span>+ {project.collaborators} участников</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3 w-3" />
                      <span>Создан {new Date(project.created).toLocaleDateString('ru-RU')}</span>
                    </div>
                    {project.lastRun && (
                      <div className="flex items-center gap-2">
                        <Clock className="h-3 w-3" />
                        <span>Последний запуск: {project.lastRun}</span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" className="flex-1">
                      <Eye className="h-3 w-3 mr-1" />
                      Открыть
                    </Button>
                    <Button size="sm" variant="outline">
                      {project.status === "running" ? (
                        <Pause className="h-3 w-3" />
                      ) : (
                        <Play className="h-3 w-3" />
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <FolderOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                Проекты не найдены
              </h3>
              <p className="text-muted-foreground mb-4">
                {activeTab === "my" 
                  ? "У вас пока нет проектов. Создайте свой первый проект!"
                  : "Нет проектов, соответствующих критериям поиска"
                }
              </p>
              {activeTab === "my" && (
                <Button onClick={() => navigate("/projects/new")}>
                  <Plus className="h-4 w-4 mr-2" />
                  Создать проект
                </Button>
              )}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Plus, 
  Database,
  Upload,
  Search,
  Play,
  BarChart3,
  Settings,
  FileText,
  Zap,
  Eye,
  Download,
  Filter
} from "lucide-react";

interface Dataset {
  id: string;
  name: string;
  type: string;
  owner: string;
  updatedAt: Date;
  rows: number;
  status: 'active' | 'processing' | 'error';
}

const mockDatasets: Dataset[] = [
  {
    id: '1',
    name: 'Продажи 2024',
    type: 'CSV',
    owner: 'Аналитик',
    updatedAt: new Date('2024-01-15'),
    rows: 50000,
    status: 'active'
  },
  {
    id: '2', 
    name: 'Клиентская база',
    type: 'PostgreSQL',
    owner: 'ML Team',
    updatedAt: new Date('2024-01-14'),
    rows: 120000,
    status: 'active'
  },
  {
    id: '3',
    name: 'Веб-логи',
    type: 'JSON',
    owner: 'DevOps',
    updatedAt: new Date('2024-01-13'),
    rows: 1500000,
    status: 'processing'
  }
];

export default function Data() {
  const [datasets] = useState<Dataset[]>(mockDatasets);
  const [isConnectOpen, setIsConnectOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("datasets");

  const getStatusColor = (status: Dataset['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/10 text-green-700 border-green-200';
      case 'processing':
        return 'bg-blue-500/10 text-blue-700 border-blue-200';
      case 'error':
        return 'bg-red-500/10 text-red-700 border-red-200';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Данные</h1>
          <p className="text-muted-foreground">Управление данными и AutoML</p>
        </div>
        <Dialog open={isConnectOpen} onOpenChange={setIsConnectOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Подключить источник
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Подключение источника</DialogTitle>
              <DialogDescription>
                Выберите тип источника данных для подключения
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="source-type">Тип источника</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите тип" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="csv">CSV файл</SelectItem>
                    <SelectItem value="postgresql">PostgreSQL</SelectItem>
                    <SelectItem value="mysql">MySQL</SelectItem>
                    <SelectItem value="mongodb">MongoDB</SelectItem>
                    <SelectItem value="s3">Amazon S3</SelectItem>
                    <SelectItem value="api">REST API</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Название</Label>
                <Input id="name" placeholder="Название источника..." />
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsConnectOpen(false)}>
                  Отмена
                </Button>
                <Button onClick={() => setIsConnectOpen(false)}>
                  Подключить
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="datasets">Датасеты</TabsTrigger>
          <TabsTrigger value="automl">AutoML</TabsTrigger>
          <TabsTrigger value="transform">Трансформация</TabsTrigger>
        </TabsList>

        {/* Datasets Tab */}
        <TabsContent value="datasets" className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder="Поиск датасетов..." className="pl-10" />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Фильтр
            </Button>
          </div>

          <div className="space-y-4">
            {datasets.map((dataset) => (
              <Card key={dataset.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <Database className="h-5 w-5 text-primary" />
                        <h3 className="font-semibold">{dataset.name}</h3>
                        <Badge className={getStatusColor(dataset.status)}>
                          {dataset.status === 'active' ? 'Активен' :
                           dataset.status === 'processing' ? 'Обработка' : 'Ошибка'}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Тип: {dataset.type}</span>
                        <span>Строк: {dataset.rows.toLocaleString()}</span>
                        <span>Владелец: {dataset.owner}</span>
                        <span>Обновлен: {dataset.updatedAt.toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* AutoML Tab */}
        <TabsContent value="automl" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Классификация
                </CardTitle>
                <CardDescription>
                  Создание моделей для категоризации данных
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">Создать модель</Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  Регрессия
                </CardTitle>
                <CardDescription>
                  Прогнозирование числовых значений
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">Создать модель</Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Временные ряды
                </CardTitle>
                <CardDescription>
                  Анализ и прогнозирование трендов
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">Создать модель</Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Мастер AutoML</CardTitle>
              <CardDescription>
                Пошаговое создание модели машинного обучения
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Датасет</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите датасет" />
                    </SelectTrigger>
                    <SelectContent>
                      {datasets.map((dataset) => (
                        <SelectItem key={dataset.id} value={dataset.id}>
                          {dataset.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Целевая переменная</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите колонку" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="price">Цена</SelectItem>
                      <SelectItem value="category">Категория</SelectItem>
                      <SelectItem value="status">Статус</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button className="w-full">
                <Play className="h-4 w-4 mr-2" />
                Запустить AutoML
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Transform Tab */}
        <TabsContent value="transform" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Transform Builder</CardTitle>
              <CardDescription>
                Визуальный конструктор для преобразования данных
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-muted/20 border-2 border-dashed border-muted-foreground/20 rounded-lg flex items-center justify-center">
                <div className="text-center space-y-2">
                  <Settings className="h-12 w-12 mx-auto text-muted-foreground/50" />
                  <p className="text-muted-foreground">Перетащите операции для создания пайплайна</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
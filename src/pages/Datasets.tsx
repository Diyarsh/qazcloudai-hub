import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Database, 
  Upload, 
  Download, 
  Search, 
  Filter,
  FileText,
  Image,
  Music,
  Video,
  BarChart3,
  Eye,
  Plus,
  Share,
  Lock,
  Globe,
  Users,
  Calendar,
  HardDrive,
  Tag,
  MoreVertical
} from "lucide-react";

interface Dataset {
  id: string;
  name: string;
  description: string;
  type: 'text' | 'image' | 'audio' | 'video' | 'tabular';
  size: string;
  rows: number;
  columns?: number;
  visibility: 'public' | 'private' | 'restricted';
  owner: string;
  created: Date;
  lastModified: Date;
  downloads: number;
  tags: string[];
  format: string;
}

const mockDatasets: Dataset[] = [
  {
    id: '1',
    name: 'Казахстанские новости 2024',
    description: 'Коллекция новостных статей на казахском и русском языках за 2024 год',
    type: 'text',
    size: '2.1 GB',
    rows: 156742,
    columns: 8,
    visibility: 'public',
    owner: 'QazCloud Research',
    created: new Date('2024-01-01'),
    lastModified: new Date('2024-01-14'),
    downloads: 1247,
    tags: ['nlp', 'news', 'kazakh', 'russian'],
    format: 'CSV'
  },
  {
    id: '2',
    name: 'Медицинские снимки КТ',
    description: 'Анонимизированные КТ снимки для задач диагностики и сегментации',
    type: 'image',
    size: '15.7 GB',
    rows: 8934,
    visibility: 'restricted',
    owner: 'Medical AI Lab',
    created: new Date('2023-11-15'),
    lastModified: new Date('2024-01-10'),
    downloads: 89,
    tags: ['medical', 'ct-scan', 'segmentation', 'healthcare'],
    format: 'DICOM'
  },
  {
    id: '3',
    name: 'Финансовые транзакции',
    description: 'Синтетические данные банковских транзакций для обучения моделей фрод-детекции',
    type: 'tabular',
    size: '856 MB',
    rows: 2847362,
    columns: 23,
    visibility: 'private',
    owner: 'FinTech Solutions',
    created: new Date('2023-12-20'),
    lastModified: new Date('2024-01-12'),
    downloads: 342,
    tags: ['finance', 'fraud-detection', 'synthetic', 'banking'],
    format: 'Parquet'
  },
  {
    id: '4',
    name: 'Голосовые команды IoT',
    description: 'Записи голосовых команд для умного дома на казахском языке',
    type: 'audio',
    size: '4.2 GB',
    rows: 47832,
    visibility: 'public',
    owner: 'Smart Home KZ',
    created: new Date('2023-10-05'),
    lastModified: new Date('2024-01-08'),
    downloads: 623,
    tags: ['voice', 'iot', 'smart-home', 'kazakh-speech'],
    format: 'WAV'
  },
  {
    id: '5',
    name: 'Видео трафика Алматы',
    description: 'Видеозаписи дорожного движения для анализа трафика и детекции нарушений',
    type: 'video',
    size: '45.3 GB',
    rows: 1247,
    visibility: 'restricted',
    owner: 'Traffic Analytics',
    created: new Date('2023-09-12'),
    lastModified: new Date('2024-01-05'),
    downloads: 156,
    tags: ['traffic', 'computer-vision', 'surveillance', 'almaty'],
    format: 'MP4'
  },
  {
    id: '6',
    name: 'Клиентские отзывы e-commerce',
    description: 'Отзывы клиентов интернет-магазинов с разметкой тональности',
    type: 'text',
    size: '678 MB',
    rows: 89456,
    columns: 12,
    visibility: 'public',
    owner: 'E-commerce Analytics',
    created: new Date('2023-08-20'),
    lastModified: new Date('2024-01-07'),
    downloads: 892,
    tags: ['sentiment', 'reviews', 'ecommerce', 'nlp'],
    format: 'JSON'
  }
];

const dataTypes = ['Все', 'text', 'image', 'audio', 'video', 'tabular'];
const visibilityTypes = ['Все', 'public', 'private', 'restricted'];

export default function Datasets() {
  const [datasets] = useState<Dataset[]>(mockDatasets);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("Все");
  const [selectedVisibility, setSelectedVisibility] = useState("Все");
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const getTypeIcon = (type: Dataset['type']) => {
    switch (type) {
      case 'text':
        return <FileText className="h-4 w-4" />;
      case 'image':
        return <Image className="h-4 w-4" />;
      case 'audio':
        return <Music className="h-4 w-4" />;
      case 'video':
        return <Video className="h-4 w-4" />;
      case 'tabular':
        return <BarChart3 className="h-4 w-4" />;
    }
  };

  const getVisibilityIcon = (visibility: Dataset['visibility']) => {
    switch (visibility) {
      case 'public':
        return <Globe className="h-4 w-4 text-green-500" />;
      case 'private':
        return <Lock className="h-4 w-4 text-red-500" />;
      case 'restricted':
        return <Users className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getVisibilityColor = (visibility: Dataset['visibility']) => {
    switch (visibility) {
      case 'public':
        return 'bg-green-500/10 text-green-700 border-green-200';
      case 'private':
        return 'bg-red-500/10 text-red-700 border-red-200';
      case 'restricted':
        return 'bg-yellow-500/10 text-yellow-700 border-yellow-200';
    }
  };

  const filteredDatasets = datasets.filter(dataset => {
    const matchesSearch = dataset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dataset.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dataset.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = selectedType === "Все" || dataset.type === selectedType;
    const matchesVisibility = selectedVisibility === "Все" || dataset.visibility === selectedVisibility;
    
    return matchesSearch && matchesType && matchesVisibility;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Датасеты</h1>
          <p className="text-muted-foreground">Управление и каталог наборов данных для ML проектов</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Загрузить датасет
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Загрузка нового датасета</DialogTitle>
              <DialogDescription>
                Добавьте новый набор данных в каталог
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Название датасета</Label>
                  <Input id="name" placeholder="Введите название..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Тип данных</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите тип" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text">Текст</SelectItem>
                      <SelectItem value="image">Изображения</SelectItem>
                      <SelectItem value="audio">Аудио</SelectItem>
                      <SelectItem value="video">Видео</SelectItem>
                      <SelectItem value="tabular">Табличные данные</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Описание</Label>
                <Textarea id="description" placeholder="Описание датасета..." rows={3} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="format">Формат</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите формат" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="csv">CSV</SelectItem>
                      <SelectItem value="json">JSON</SelectItem>
                      <SelectItem value="parquet">Parquet</SelectItem>
                      <SelectItem value="xlsx">Excel</SelectItem>
                      <SelectItem value="zip">ZIP архив</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="visibility">Видимость</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите видимость" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Публичный</SelectItem>
                      <SelectItem value="private">Приватный</SelectItem>
                      <SelectItem value="restricted">Ограниченный</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="tags">Теги</Label>
                <Input id="tags" placeholder="machine-learning, nlp, computer-vision..." />
              </div>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm font-medium">Перетащите файлы сюда или нажмите для выбора</p>
                <p className="text-xs text-muted-foreground">Поддерживаются файлы до 100GB</p>
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                  Отмена
                </Button>
                <Button onClick={() => setIsCreateOpen(false)}>
                  Загрузить датасет
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: "Всего датасетов", value: "127", icon: Database, color: "text-primary" },
          { title: "Публичных", value: "89", icon: Globe, color: "text-green-500" },
          { title: "Общий размер", value: "2.3 TB", icon: HardDrive, color: "text-blue-500" },
          { title: "Скачиваний", value: "15.7K", icon: Download, color: "text-purple-500" }
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
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Поиск датасетов..."
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
          
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {dataTypes.map(type => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={selectedVisibility} onValueChange={setSelectedVisibility}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {visibilityTypes.map(visibility => (
                <SelectItem key={visibility} value={visibility}>{visibility}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Datasets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDatasets.map((dataset) => (
          <Card key={dataset.id} className="group hover:shadow-lg transition-all duration-300 hover:border-primary/50">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="flex items-center gap-2 group-hover:text-primary transition-colors">
                    {getTypeIcon(dataset.type)}
                    {dataset.name}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{dataset.type}</Badge>
                    <Badge className={getVisibilityColor(dataset.visibility)}>
                      {getVisibilityIcon(dataset.visibility)}
                      <span className="ml-1">
                        {dataset.visibility === 'public' ? 'Публичный' :
                         dataset.visibility === 'private' ? 'Приватный' : 'Ограниченный'}
                      </span>
                    </Badge>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <CardDescription className="text-sm line-clamp-2">
                {dataset.description}
              </CardDescription>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <HardDrive className="h-4 w-4 text-muted-foreground" />
                  <span>{dataset.size}</span>
                </div>
                <div className="flex items-center gap-1">
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                  <span>{dataset.rows.toLocaleString()} строк</span>
                </div>
                <div className="flex items-center gap-1">
                  <Download className="h-4 w-4 text-muted-foreground" />
                  <span>{dataset.downloads}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{dataset.created.toLocaleDateString()}</span>
                </div>
              </div>

              {dataset.columns && (
                <div className="text-xs text-muted-foreground">
                  Столбцов: {dataset.columns}
                </div>
              )}
              
              <div className="flex flex-wrap gap-1">
                {dataset.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
                {dataset.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{dataset.tags.length - 3}
                  </Badge>
                )}
              </div>
              
              <div className="text-xs text-muted-foreground">
                Владелец: {dataset.owner} • Формат: {dataset.format}
              </div>
              
              <div className="flex space-x-2 pt-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <Eye className="h-4 w-4 mr-1" />
                  Просмотр
                </Button>
                <Button size="sm" className="flex-1 bg-gradient-primary">
                  <Download className="h-4 w-4 mr-1" />
                  Скачать
                </Button>
                <Button size="sm" variant="outline">
                  <Share className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDatasets.length === 0 && (
        <div className="text-center py-12 space-y-3">
          <Database className="h-12 w-12 text-muted-foreground mx-auto" />
          <h3 className="text-lg font-medium">Датасеты не найдены</h3>
          <p className="text-muted-foreground">
            Попробуйте изменить критерии поиска или загрузите новый датасет
          </p>
        </div>
      )}
    </div>
  );
}
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { 
  User,
  Key,
  Users,
  CreditCard,
  Shield,
  Bell,
  Palette,
  Globe,
  Database,
  Zap,
  Trash2,
  Download,
  Upload,
  Plus,
  Eye,
  EyeOff,
  Copy,
  RotateCcw,
  HardDrive,
  Activity,
  AlertTriangle,
  CheckCircle2
} from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'Owner' | 'Admin' | 'Developer' | 'Viewer';
  status: 'active' | 'pending' | 'inactive';
  lastActive: Date;
}

interface Project {
  id: string;
  name: string;
  description: string;
  members: number;
  storage: string;
  created: Date;
}

interface APIKey {
  id: string;
  name: string;
  key: string;
  permissions: string[];
  created: Date;
  lastUsed?: Date;
  isVisible: boolean;
}

const mockTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Айдос Нұрланұлы',
    email: 'aidos.nurlanuly@qazcloud.kz',
    role: 'Owner',
    status: 'active',
    lastActive: new Date('2024-01-15T10:30:00')
  },
  {
    id: '2', 
    name: 'Гүлжан Әсетқызы',
    email: 'gulzhan.asetkyny@qazcloud.kz',
    role: 'Admin',
    status: 'active',
    lastActive: new Date('2024-01-15T09:15:00')
  },
  {
    id: '3',
    name: 'Бақытжан Сәбитұлы',
    email: 'bakytzhan.sabituly@qazcloud.kz',
    role: 'Developer',
    status: 'pending',
    lastActive: new Date('2024-01-14T16:45:00')
  }
];

const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Medical Image Analysis',
    description: 'Диагностика заболеваний по медицинским снимкам',
    members: 5,
    storage: '2.3 GB',
    created: new Date('2024-01-01')
  },
  {
    id: '2',
    name: 'Customer Sentiment Analysis',
    description: 'Анализ настроений клиентов по отзывам',
    members: 3,
    storage: '856 MB',
    created: new Date('2024-01-10')
  }
];

const mockAPIKeys: APIKey[] = [
  {
    id: '1',
    name: 'Production API Key',
    key: 'qaz_live_sk_1234567890abcdef',
    permissions: ['models:read', 'models:write', 'datasets:read'],
    created: new Date('2024-01-01'),
    lastUsed: new Date('2024-01-15T08:30:00'),
    isVisible: false
  },
  {
    id: '2',
    name: 'Development Key',
    key: 'qaz_test_sk_abcdef1234567890',
    permissions: ['models:read', 'datasets:read'],
    created: new Date('2024-01-10'),
    isVisible: false
  }
];

export default function Settings() {
  const [teamMembers] = useState<TeamMember[]>(mockTeamMembers);
  const [projects] = useState<Project[]>(mockProjects);
  const [apiKeys, setApiKeys] = useState<APIKey[]>(mockAPIKeys);
  const [notifications, setNotifications] = useState({
    email: true,
    slack: false,
    webhook: true,
    experiments: true,
    deployments: true,
    alerts: true
  });

  const toggleKeyVisibility = (keyId: string) => {
    setApiKeys(keys => keys.map(key => 
      key.id === keyId ? { ...key, isVisible: !key.isVisible } : key
    ));
  };

  const getRoleColor = (role: TeamMember['role']) => {
    switch (role) {
      case 'Owner':
        return 'bg-purple-500/10 text-purple-700 border-purple-200';
      case 'Admin':
        return 'bg-blue-500/10 text-blue-700 border-blue-200';
      case 'Developer':
        return 'bg-green-500/10 text-green-700 border-green-200';
      case 'Viewer':
        return 'bg-gray-500/10 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: TeamMember['status']) => {
    switch (status) {
      case 'active':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'inactive':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Настройки</h1>
          <p className="text-muted-foreground">Управление аккаунтом, проектами и интеграциями</p>
        </div>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="profile">Профиль</TabsTrigger>
          <TabsTrigger value="projects">Проекты</TabsTrigger>
          <TabsTrigger value="team">Команда</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
          <TabsTrigger value="billing">Тарифы</TabsTrigger>
          <TabsTrigger value="security">Безопасность</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Личная информация
                </CardTitle>
                <CardDescription>Обновите свой профиль и контактную информацию</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Имя</Label>
                    <Input id="firstName" defaultValue="Roman" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Фамилия</Label>
                    <Input id="lastName" defaultValue="Lefarov" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="roman.lefarov@qazcloud.kz" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Телефон</Label>
                  <Input id="phone" defaultValue="+7 (705) 789-12-34" />
                </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">О себе</Label>
                    <Textarea id="bio" rows={3} defaultValue="Senior Software Engineer с 7+ лет опыта в области машинного обучения и разработки AI решений." />
                  </div>
                <Button>Сохранить изменения</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Уведомления
                </CardTitle>
                <CardDescription>Настройте способы получения уведомлений</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Email уведомления</Label>
                      <p className="text-xs text-muted-foreground">Получать уведомления на email</p>
                    </div>
                    <Switch 
                      checked={notifications.email}
                      onCheckedChange={(checked) => setNotifications({...notifications, email: checked})}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Slack интеграция</Label>
                      <p className="text-xs text-muted-foreground">Отправлять в Slack канал</p>
                    </div>
                    <Switch 
                      checked={notifications.slack}
                      onCheckedChange={(checked) => setNotifications({...notifications, slack: checked})}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Webhook уведомления</Label>
                      <p className="text-xs text-muted-foreground">HTTP callbacks на ваш endpoint</p>
                    </div>
                    <Switch 
                      checked={notifications.webhook}
                      onCheckedChange={(checked) => setNotifications({...notifications, webhook: checked})}
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Типы уведомлений</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Завершение экспериментов</Label>
                      <Switch 
                        checked={notifications.experiments}
                        onCheckedChange={(checked) => setNotifications({...notifications, experiments: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Статус развертывания</Label>
                      <Switch 
                        checked={notifications.deployments}
                        onCheckedChange={(checked) => setNotifications({...notifications, deployments: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Системные алерты</Label>
                      <Switch 
                        checked={notifications.alerts}
                        onCheckedChange={(checked) => setNotifications({...notifications, alerts: checked})}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="projects" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Управление проектами</h2>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Создать проект
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card key={project.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>{project.name}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{project.members} участников</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <HardDrive className="h-4 w-4 text-muted-foreground" />
                      <span>{project.storage}</span>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Создан: {project.created.toLocaleDateString()}
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <User className="h-4 w-4 mr-1" />
                      Участники
                    </Button>
                    <Button size="sm" variant="outline">
                      <Key className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="team" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Управление командой</h2>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Пригласить участника
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Участники команды</CardTitle>
              <CardDescription>Управляйте доступом и ролями участников</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamMembers.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                       <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-medium">
                         {member.name.split(' ').map(n => n[0]).join('')}
                       </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{member.name}</p>
                          {getStatusIcon(member.status)}
                        </div>
                        <p className="text-sm text-muted-foreground">{member.email}</p>
                        <p className="text-xs text-muted-foreground">
                          Последняя активность: {member.lastActive.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getRoleColor(member.role)}>
                        {member.role}
                      </Badge>
                      <Select defaultValue={member.role.toLowerCase()}>
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="owner">Owner</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="developer">Developer</SelectItem>
                          <SelectItem value="viewer">Viewer</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">API ключи</h2>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Создать ключ
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Управление API ключами</CardTitle>
              <CardDescription>Создавайте и управляйте API ключами для интеграции</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {apiKeys.map((apiKey) => (
                  <div key={apiKey.id} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{apiKey.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          Создан: {apiKey.created.toLocaleDateString()}
                          {apiKey.lastUsed && ` • Последнее использование: ${apiKey.lastUsed.toLocaleString()}`}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => toggleKeyVisibility(apiKey.id)}
                        >
                          {apiKey.isVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <RotateCcw className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="bg-muted p-3 rounded font-mono text-sm">
                      {apiKey.isVisible ? apiKey.key : '•'.repeat(apiKey.key.length)}
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {apiKey.permissions.map((permission) => (
                        <Badge key={permission} variant="outline" className="text-xs">
                          {permission}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Текущий тариф
                </CardTitle>
                <CardDescription>Управление подпиской и использованием ресурсов</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg text-white bg-primary">
                  <h3 className="text-lg font-semibold">Enterprise Plan</h3>
                  <p className="text-white/80">$299/месяц</p>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>GPU часы (120 / 500)</span>
                      <span>24%</span>
                    </div>
                    <Progress value={24} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Хранилище (2.3TB / 5TB)</span>
                      <span>46%</span>
                    </div>
                    <Progress value={46} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>API вызовы (15K / 50K)</span>
                      <span>30%</span>
                    </div>
                    <Progress value={30} className="h-2" />
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button className="flex-1">Изменить тариф</Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Счета
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Использование ресурсов
                </CardTitle>
                <CardDescription>Статистика потребления за текущий месяц</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 border rounded-lg">
                    <div className="text-2xl font-bold text-primary">$847</div>
                    <div className="text-xs text-muted-foreground">Расходы в месяц</div>
                  </div>
                  <div className="text-center p-3 border rounded-lg">
                    <div className="text-2xl font-bold text-green-500">15.2%</div>
                    <div className="text-xs text-muted-foreground">Экономия</div>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>GPU вычисления</span>
                    <span className="font-medium">$523</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Хранилище данных</span>
                    <span className="font-medium">$156</span>
                  </div>
                  <div className="flex justify-between">
                    <span>API вызовы</span>
                    <span className="font-medium">$89</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Поддержка</span>
                    <span className="font-medium">$79</span>
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  Детальная аналитика
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Безопасность аккаунта
                </CardTitle>
                <CardDescription>Настройки безопасности и аутентификации</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Двухфакторная аутентификация</Label>
                      <p className="text-xs text-muted-foreground">Дополнительная защита аккаунта</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <Label>Изменить пароль</Label>
                    <div className="space-y-2">
                      <Input type="password" placeholder="Текущий пароль" />
                      <Input type="password" placeholder="Новый пароль" />
                      <Input type="password" placeholder="Подтвердите пароль" />
                      <Button size="sm">Обновить пароль</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Данные и конфиденциальность
                </CardTitle>
                <CardDescription>Управление персональными данными</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Аналитика использования</Label>
                      <p className="text-xs text-muted-foreground">Помогает улучшить платформу</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Экспорт данных
                    </Button>
                    <Button variant="destructive" className="w-full">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Удалить аккаунт
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Audit Log */}
          <Card>
            <CardHeader>
              <CardTitle>Журнал активности</CardTitle>
              <CardDescription>История действий в аккаунте</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { action: "Вход в систему", time: "15 января, 10:30", ip: "192.168.1.1" },
                  { action: "Создан API ключ", time: "14 января, 16:45", ip: "192.168.1.1" },
                  { action: "Запущен эксперимент", time: "14 января, 14:20", ip: "192.168.1.1" },
                  { action: "Изменены настройки", time: "13 января, 09:15", ip: "192.168.1.1" }
                ].map((log, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="text-sm font-medium">{log.action}</p>
                      <p className="text-xs text-muted-foreground">{log.time} • IP: {log.ip}</p>
                    </div>
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
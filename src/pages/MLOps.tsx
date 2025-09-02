import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Server, 
  GitBranch, 
  Shield, 
  BarChart3, 
  AlertTriangle,
  CheckCircle2,
  Clock,
  Activity,
  Cpu,
  HardDrive,
  Network,
  Eye,
  Settings,
  Play,
  Pause,
  RotateCcw,
  TrendingUp,
  Users,
  Zap
} from "lucide-react";

interface ModelDeployment {
  id: string;
  name: string;
  version: string;
  status: 'healthy' | 'warning' | 'error' | 'deploying';
  environment: string;
  requests: number;
  latency: number;
  accuracy: number;
  uptime: number;
  lastDeployed: Date;
}

interface SystemMetric {
  name: string;
  value: number;
  status: 'good' | 'warning' | 'critical';
  unit: string;
}

const mockDeployments: ModelDeployment[] = [
  {
    id: '1',
    name: 'QazLLM-Ultra',
    version: 'v2.1.3',
    status: 'healthy',
    environment: 'Production',
    requests: 15420,
    latency: 120,
    accuracy: 94.5,
    uptime: 99.9,
    lastDeployed: new Date('2024-01-10T14:30:00')
  },
  {
    id: '2',
    name: 'DocAnalyzer',
    version: 'v1.5.2',
    status: 'warning',
    environment: 'Production',
    requests: 8730,
    latency: 250,
    accuracy: 89.2,
    uptime: 97.8,
    lastDeployed: new Date('2024-01-08T09:15:00')
  },
  {
    id: '3',
    name: 'RecommendationEngine',
    version: 'v3.0.1',
    status: 'healthy',
    environment: 'Staging',
    requests: 2340,
    latency: 85,
    accuracy: 91.7,
    uptime: 99.5,
    lastDeployed: new Date('2024-01-12T11:45:00')
  },
  {
    id: '4',
    name: 'FraudDetector',
    version: 'v1.2.0',
    status: 'deploying',
    environment: 'Production',
    requests: 0,
    latency: 0,
    accuracy: 0,
    uptime: 0,
    lastDeployed: new Date('2024-01-15T10:00:00')
  }
];

const systemMetrics: SystemMetric[] = [
  { name: 'CPU Usage', value: 72, status: 'good', unit: '%' },
  { name: 'Memory', value: 85, status: 'warning', unit: '%' },
  { name: 'GPU Usage', value: 91, status: 'critical', unit: '%' },
  { name: 'Storage', value: 45, status: 'good', unit: '%' },
  { name: 'Network I/O', value: 23, status: 'good', unit: 'MB/s' },
  { name: 'API Latency', value: 120, status: 'good', unit: 'ms' }
];

export default function MLOps() {
  const [deployments] = useState<ModelDeployment[]>(mockDeployments);

  const getStatusIcon = (status: ModelDeployment['status']) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'error':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'deploying':
        return <Activity className="h-4 w-4 text-blue-500 animate-pulse" />;
    }
  };

  const getStatusColor = (status: ModelDeployment['status']) => {
    switch (status) {
      case 'healthy':
        return 'bg-green-500/10 text-green-700 border-green-200';
      case 'warning':
        return 'bg-yellow-500/10 text-yellow-700 border-yellow-200';
      case 'error':
        return 'bg-red-500/10 text-red-700 border-red-200';
      case 'deploying':
        return 'bg-blue-500/10 text-blue-700 border-blue-200';
    }
  };

  const getMetricStatus = (metric: SystemMetric) => {
    switch (metric.status) {
      case 'good':
        return 'bg-green-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'critical':
        return 'bg-red-500';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">MLOps Платформа</h1>
          <p className="text-muted-foreground">Управление жизненным циклом моделей машинного обучения</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Настройки
          </Button>
          <Button>
            <Server className="h-4 w-4 mr-2" />
            Деплой модели
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: "Активных моделей", value: "12", icon: Server, color: "text-primary", change: "+2" },
          { title: "Запросов/день", value: "847K", icon: TrendingUp, color: "text-green-500", change: "+12%" },
          { title: "Среднее время отклика", value: "125ms", icon: Zap, color: "text-blue-500", change: "-5ms" },
          { title: "Успешность", value: "99.2%", icon: CheckCircle2, color: "text-green-500", change: "+0.1%" }
        ].map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">{stat.change}</span> от вчера
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="deployments" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="deployments">Развертывания</TabsTrigger>
          <TabsTrigger value="monitoring">Мониторинг</TabsTrigger>
          <TabsTrigger value="pipelines">CI/CD</TabsTrigger>
          <TabsTrigger value="governance">Управление</TabsTrigger>
        </TabsList>

        <TabsContent value="deployments" className="space-y-6">
          {/* Model Deployments */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {deployments.map((deployment) => (
              <Card key={deployment.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <CardTitle className="flex items-center gap-2">
                        {getStatusIcon(deployment.status)}
                        {deployment.name}
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{deployment.version}</Badge>
                        <Badge className={getStatusColor(deployment.status)}>
                          {deployment.status === 'healthy' ? 'Здоровая' :
                           deployment.status === 'warning' ? 'Предупреждение' :
                           deployment.status === 'error' ? 'Ошибка' : 'Развертывание'}
                        </Badge>
                        <Badge variant="outline">{deployment.environment}</Badge>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {deployment.status !== 'deploying' && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Запросов сегодня</span>
                          <span className="font-medium">{deployment.requests.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Задержка</span>
                          <span className="font-medium">{deployment.latency}ms</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Точность</span>
                          <span className="font-medium">{deployment.accuracy}%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Время работы</span>
                          <span className="font-medium">{deployment.uptime}%</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {deployment.status === 'deploying' && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Прогресс развертывания</span>
                        <span>67%</span>
                      </div>
                      <Progress value={67} className="h-2" />
                    </div>
                  )}

                  <div className="text-xs text-muted-foreground">
                    Последнее развертывание: {deployment.lastDeployed.toLocaleString()}
                  </div>

                  <div className="flex space-x-2 pt-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-1" />
                      Логи
                    </Button>
                    <Button size="sm" variant="outline">
                      <BarChart3 className="h-4 w-4 mr-1" />
                      Метрики
                    </Button>
                    {deployment.status === 'healthy' ? (
                      <Button size="sm" variant="outline">
                        <Pause className="h-4 w-4 mr-1" />
                        Остановить
                      </Button>
                    ) : deployment.status !== 'deploying' ? (
                      <Button size="sm">
                        <Play className="h-4 w-4 mr-1" />
                        Запустить
                      </Button>
                    ) : null}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-6">
          {/* System Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Системные метрики
              </CardTitle>
              <CardDescription>Мониторинг ресурсов кластера в реальном времени</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {systemMetrics.map((metric, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{metric.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {metric.value}{metric.unit}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${getMetricStatus(metric)}`}
                        style={{ width: `${Math.min(metric.value, 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Real-time Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Активные уведомления
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 border border-yellow-200 bg-yellow-50 rounded-lg">
                  <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Высокая нагрузка на GPU</p>
                    <p className="text-xs text-muted-foreground">Использование GPU превышает 90% в течение 15 минут</p>
                  </div>
                  <Badge variant="outline" className="text-yellow-700">Warning</Badge>
                </div>
                <div className="flex items-start gap-3 p-3 border border-blue-200 bg-blue-50 rounded-lg">
                  <Activity className="h-4 w-4 text-blue-600 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Автомасштабирование запущено</p>
                    <p className="text-xs text-muted-foreground">Добавлен новый узел для обработки нагрузки</p>
                  </div>
                  <Badge variant="outline" className="text-blue-700">Info</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pipelines" className="space-y-6">
          {/* CI/CD Pipelines */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GitBranch className="h-5 w-5" />
                  CI/CD Пайплайны
                </CardTitle>
                <CardDescription>Автоматизированная сборка и развертывание</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: "QazLLM-Ultra/main", status: "success", duration: "3m 45s", commit: "feat: improve accuracy" },
                  { name: "DocAnalyzer/develop", status: "running", duration: "1m 23s", commit: "fix: memory optimization" },
                  { name: "RecommendationEngine/feature", status: "failed", duration: "45s", commit: "test: add unit tests" }
                ].map((pipeline, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{pipeline.name}</p>
                      <p className="text-xs text-muted-foreground">{pipeline.commit}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={
                        pipeline.status === 'success' ? 'bg-green-500/10 text-green-700' :
                        pipeline.status === 'running' ? 'bg-blue-500/10 text-blue-700' :
                        'bg-red-500/10 text-red-700'
                      }>
                        {pipeline.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{pipeline.duration}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Безопасность
                </CardTitle>
                <CardDescription>Проверки безопасности и соответствия</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Сканирование уязвимостей</span>
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Аудит доступа</span>
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Соответствие GDPR</span>
                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Шифрование данных</span>
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="governance" className="space-y-6">
          {/* Model Governance */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Управление доступом
                </CardTitle>
                <CardDescription>Роли и разрешения пользователей</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { user: "admin@qazcloud.kz", role: "Администратор", access: "Полный доступ" },
                  { user: "ml-engineer@qazcloud.kz", role: "ML Инженер", access: "Деплой, мониторинг" },
                  { user: "data-scientist@qazcloud.kz", role: "Data Scientist", access: "Только чтение" }
                ].map((user, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="text-sm font-medium">{user.user}</p>
                      <p className="text-xs text-muted-foreground">{user.access}</p>
                    </div>
                    <Badge variant="secondary">{user.role}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Соответствие требованиям
                </CardTitle>
                <CardDescription>Аудит и документация моделей</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Версионирование моделей</span>
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Документация API</span>
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Журнал изменений</span>
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Отчеты о производительности</span>
                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
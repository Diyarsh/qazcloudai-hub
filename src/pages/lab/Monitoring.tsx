import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Activity,
  AlertTriangle,
  CheckCircle2,
  Clock,
  DollarSign,
  Cpu,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Zap
} from "lucide-react";

interface Agent {
  id: string;
  name: string;
  status: 'active' | 'error' | 'idle';
  responseTime: number;
  errorRate: number;
  tokens: number;
  lastActive: Date;
}

interface Model {
  id: string;
  name: string;
  version: string;
  auc: number;
  f1: number;
  drift: 'low' | 'medium' | 'high';
  predictions: number;
  lastUpdated: Date;
}

interface CostData {
  category: string;
  budget: number;
  used: number;
  alerts: number;
}

const mockAgents: Agent[] = [
  {
    id: '1',
    name: 'FAQ Bot',
    status: 'active',
    responseTime: 1200,
    errorRate: 2.1,
    tokens: 45000,
    lastActive: new Date('2024-01-15T14:30:00')
  },
  {
    id: '2',
    name: 'SQL Assistant',
    status: 'active', 
    responseTime: 800,
    errorRate: 1.5,
    tokens: 32000,
    lastActive: new Date('2024-01-15T14:25:00')
  },
  {
    id: '3',
    name: 'Content Generator',
    status: 'error',
    responseTime: 0,
    errorRate: 100,
    tokens: 0,
    lastActive: new Date('2024-01-15T12:15:00')
  }
];

const mockModels: Model[] = [
  {
    id: '1',
    name: 'Demand Forecast',
    version: 'v2.1',
    auc: 0.94,
    f1: 0.89,
    drift: 'low',
    predictions: 15000,
    lastUpdated: new Date('2024-01-15T10:00:00')
  },
  {
    id: '2',
    name: 'Fraud Detection',
    version: 'v1.8',
    auc: 0.97,
    f1: 0.92,
    drift: 'medium',
    predictions: 8500,
    lastUpdated: new Date('2024-01-14T16:30:00')
  }
];

const mockCosts: CostData[] = [
  {
    category: 'GPU Compute',
    budget: 5000,
    used: 3200,
    alerts: 1
  },
  {
    category: 'API Calls',
    budget: 2000,
    used: 1800,
    alerts: 2
  },
  {
    category: 'Storage',
    budget: 500,
    used: 150,
    alerts: 0
  }
];

export default function Monitoring() {
  const [agents] = useState<Agent[]>(mockAgents);
  const [models] = useState<Model[]>(mockModels);
  const [costs] = useState<CostData[]>(mockCosts);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'error':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'idle':
        return <Clock className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/10 text-green-700 border-green-200';
      case 'error':
        return 'bg-red-500/10 text-red-700 border-red-200';
      case 'idle':
        return 'bg-yellow-500/10 text-yellow-700 border-yellow-200';
    }
  };

  const getDriftColor = (drift: string) => {
    switch (drift) {
      case 'low':
        return 'bg-green-500/10 text-green-700 border-green-200';
      case 'medium':
        return 'bg-yellow-500/10 text-yellow-700 border-yellow-200';
      case 'high':
        return 'bg-red-500/10 text-red-700 border-red-200';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Мониторинг</h1>
          <p className="text-muted-foreground">Отслеживание производительности агентов и моделей</p>
        </div>
      </div>

      <Tabs defaultValue="agents" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="agents">Агенты</TabsTrigger>
          <TabsTrigger value="models">Модели</TabsTrigger>
          <TabsTrigger value="costs">Стоимость</TabsTrigger>
        </TabsList>

        {/* Agents Tab */}
        <TabsContent value="agents" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Активные агенты</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Activity className="h-6 w-6 text-green-500" />
                  <span className="text-2xl font-bold">
                    {agents.filter(a => a.status === 'active').length}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Среднее время ответа</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Clock className="h-6 w-6 text-blue-500" />
                  <span className="text-2xl font-bold">
                    {Math.round(agents.reduce((acc, a) => acc + a.responseTime, 0) / agents.length)}ms
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Общая ошибок %</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-6 w-6 text-red-500" />
                  <span className="text-2xl font-bold">
                    {(agents.reduce((acc, a) => acc + a.errorRate, 0) / agents.length).toFixed(1)}%
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Всего токенов</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Zap className="h-6 w-6 text-purple-500" />
                  <span className="text-2xl font-bold">
                    {(agents.reduce((acc, a) => acc + a.tokens, 0) / 1000).toFixed(0)}K
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Детали по агентам</h3>
            {agents.map((agent) => (
              <Card key={agent.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <h4 className="font-semibold">{agent.name}</h4>
                        {getStatusIcon(agent.status)}
                        <Badge className={getStatusColor(agent.status)}>
                          {agent.status === 'active' ? 'Активен' :
                           agent.status === 'error' ? 'Ошибка' : 'Неактивен'}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Время ответа: {agent.responseTime}ms</span>
                        <span>Ошибки: {agent.errorRate}%</span>
                        <span>Токены: {agent.tokens.toLocaleString()}</span>
                        <span>Последняя активность: {agent.lastActive.toLocaleTimeString()}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Models Tab */}
        <TabsContent value="models" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Активные модели</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-6 w-6 text-blue-500" />
                  <span className="text-2xl font-bold">{models.length}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Средний AUC</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-6 w-6 text-green-500" />
                  <span className="text-2xl font-bold">
                    {(models.reduce((acc, m) => acc + m.auc, 0) / models.length).toFixed(2)}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Всего предсказаний</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Activity className="h-6 w-6 text-purple-500" />
                  <span className="text-2xl font-bold">
                    {(models.reduce((acc, m) => acc + m.predictions, 0) / 1000).toFixed(0)}K
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Дрейф признаков</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <TrendingDown className="h-6 w-6 text-yellow-500" />
                  <span className="text-2xl font-bold">
                    {models.filter(m => m.drift !== 'low').length}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Детали по моделям</h3>
            {models.map((model) => (
              <Card key={model.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <h4 className="font-semibold">{model.name}</h4>
                        <Badge variant="outline">{model.version}</Badge>
                        <Badge className={getDriftColor(model.drift)}>
                          Дрейф: {model.drift === 'low' ? 'Низкий' : 
                                   model.drift === 'medium' ? 'Средний' : 'Высокий'}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>AUC: {model.auc}</span>
                        <span>F1: {model.f1}</span>
                        <span>Предсказаний: {model.predictions.toLocaleString()}</span>
                        <span>Обновлено: {model.lastUpdated.toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Costs Tab */}
        <TabsContent value="costs" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {costs.map((cost) => (
              <Card key={cost.category}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">{cost.category}</CardTitle>
                    {cost.alerts > 0 && (
                      <Badge variant="destructive" className="text-xs">
                        {cost.alerts} предупреждений
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Использовано</span>
                    <span className="font-semibold">${cost.used}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Бюджет</span>
                    <span className="text-sm">${cost.budget}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        cost.used / cost.budget > 0.9 ? 'bg-red-500' :
                        cost.used / cost.budget > 0.7 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${Math.min((cost.used / cost.budget) * 100, 100)}%` }}
                    />
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {((cost.used / cost.budget) * 100).toFixed(0)}% использовано
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Общая статистика расходов
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    ${costs.reduce((acc, c) => acc + c.used, 0)}
                  </div>
                  <div className="text-sm text-muted-foreground">Всего потрачено</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    ${costs.reduce((acc, c) => acc + c.budget, 0)}
                  </div>
                  <div className="text-sm text-muted-foreground">Общий бюджет</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">
                    {costs.reduce((acc, c) => acc + c.alerts, 0)}
                  </div>
                  <div className="text-sm text-muted-foreground">Предупреждений</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
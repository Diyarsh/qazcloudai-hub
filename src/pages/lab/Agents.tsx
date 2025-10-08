import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { 
  Plus, 
  Play, 
  Save,
  Search,
  Zap,
  MessageSquare,
  Database,
  Wrench,
  Brain,
  Shield,
  Activity,
  Upload,
  Settings,
  Workflow
} from "lucide-react";

export default function Agents() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Агенты</h1>
          <p className="text-muted-foreground">Создавайте умных агентов с визуальным конструктором</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Создать флоу
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Новый флоу</DialogTitle>
              <DialogDescription>
                Создайте новый агент или используйте готовый шаблон
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Название флоу</Label>
                <Input id="name" placeholder="Введите название..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Описание</Label>
                <Textarea id="description" placeholder="Краткое описание функций..." rows={3} />
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                  Отмена
                </Button>
                <Button onClick={() => setIsCreateOpen(false)}>
                  Создать
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Main Canvas Area */}
      <div className="grid grid-cols-4 gap-6 h-[600px]">
        {/* Nodes Library */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="text-sm">Библиотека узлов</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Триггеры</h4>
              <div className="space-y-1">
                <Button variant="ghost" size="sm" className="w-full justify-start h-8">
                  <Zap className="h-3 w-3 mr-2" />
                  Webhook
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start h-8">
                  <Play className="h-3 w-3 mr-2" />
                  Расписание
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">LLM / Chat</h4>
              <div className="space-y-1">
                <Button variant="ghost" size="sm" className="w-full justify-start h-8">
                  <MessageSquare className="h-3 w-3 mr-2" />
                  Chat GPT
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start h-8">
                  <Brain className="h-3 w-3 mr-2" />
                  Claude
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Knowledge</h4>
              <div className="space-y-1">
                <Button variant="ghost" size="sm" className="w-full justify-start h-8">
                  <Database className="h-3 w-3 mr-2" />
                  RAG Search
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start h-8">
                  <Upload className="h-3 w-3 mr-2" />
                  Document
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Tools</h4>
              <div className="space-y-1">
                <Button variant="ghost" size="sm" className="w-full justify-start h-8">
                  <Wrench className="h-3 w-3 mr-2" />
                  HTTP
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start h-8">
                  <Database className="h-3 w-3 mr-2" />
                  SQL
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Безопасность</h4>
              <div className="space-y-1">
                <Button variant="ghost" size="sm" className="w-full justify-start h-8">
                  <Shield className="h-3 w-3 mr-2" />
                  Guardrails
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Canvas */}
        <Card className="col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm">Canvas</CardTitle>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Save className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Play className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="h-full">
            <div className="h-full bg-muted/20 border-2 border-dashed border-muted-foreground/20 rounded-lg flex items-center justify-center">
              <div className="text-center space-y-2">
                <Workflow className="h-12 w-12 mx-auto text-muted-foreground/50" />
                <p className="text-muted-foreground">Перетащите узлы для создания флоу</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Node Settings Panel */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="text-sm">Настройки узла</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center text-muted-foreground py-8">
                <Settings className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Выберите узел для настройки</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Debug Console */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Debug Console
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-black/90 text-green-400 p-4 rounded font-mono text-xs h-32 overflow-auto">
            <div className="text-gray-400">[DEBUG] Ожидание запуска флоу...</div>
          </div>
        </CardContent>
      </Card>

      {/* Monitoring Section */}
      <div className="mt-8 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Мониторинг агентов</h2>
          <p className="text-muted-foreground">Отслеживание производительности AI агентов</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Активные агенты</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Activity className="h-6 w-6 text-green-500" />
                <span className="text-2xl font-bold">2</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Среднее время ответа</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Activity className="h-6 w-6 text-blue-500" />
                <span className="text-2xl font-bold">1000ms</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Общая ошибок %</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Activity className="h-6 w-6 text-red-500" />
                <span className="text-2xl font-bold">1.8%</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Всего токенов</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Activity className="h-6 w-6 text-purple-500" />
                <span className="text-2xl font-bold">77K</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
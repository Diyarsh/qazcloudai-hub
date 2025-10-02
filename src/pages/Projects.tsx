import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreateProjectDialog } from "@/components/projects/CreateProjectDialog";
import { 
  Search, 
  Plus,
  Users,
  FileText,
  Brain,
  Sparkles
} from "lucide-react";

export default function Projects() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("my");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  const projects = [
    {
      id: "1",
      name: "HR Ассистент",
      description: "AI помощник для HR задач и управления персоналом",
      icon: Users,
      color: "text-blue-500",
      isShared: false
    },
    {
      id: "2", 
      name: "Анализ документов",
      description: "Обработка и анализ документов с помощью AI",
      icon: FileText,
      color: "text-green-500",
      isShared: false
    },
    {
      id: "3",
      name: "AI-HUB",
      description: "Центральная платформа для AI решений",
      icon: Brain,
      color: "text-purple-500",
      isShared: false
    }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "my" || (activeTab === "shared" && project.isShared);
    
    return matchesSearch && matchesTab;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Мои проекты</h1>
        </div>
        <Button 
          onClick={() => setCreateDialogOpen(true)} 
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Создать проект
        </Button>
      </div>

      <CreateProjectDialog 
        open={createDialogOpen} 
        onOpenChange={setCreateDialogOpen} 
      />

      {/* Tabs */}
      <div className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="flex items-center justify-between">
            <TabsList className="bg-muted">
              <TabsTrigger value="my">Мои проекты</TabsTrigger>
              <TabsTrigger value="shared">Общие проекты</TabsTrigger>
            </TabsList>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search ⌘K"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-80 bg-muted border-0"
              />
            </div>
          </div>

          <TabsContent value={activeTab} className="space-y-0">
            {/* Projects Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredProjects.map((project) => {
                const IconComponent = project.icon;
                return (
                  <Card 
                    key={project.id} 
                    className="group cursor-pointer hover:border-primary/50 transition-all duration-200 border-border bg-card"
                    onClick={() => navigate(`/projects/${project.id}`)}
                  >
                    <CardContent className="p-6 space-y-4">
                      {/* Project Icon */}
                      <div className={`w-12 h-12 rounded-lg bg-muted/50 flex items-center justify-center ${project.color}`}>
                        <IconComponent className="h-6 w-6" />
                      </div>

                      {/* Project Info */}
                      <div className="space-y-2">
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {project.name}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {project.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Empty State */}
            {filteredProjects.length === 0 && (
              <div className="text-center py-12">
                <Sparkles className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">
                  Проектов не найдено
                </h3>
                <p className="text-muted-foreground mb-4">
                  {activeTab === "my" 
                    ? "Создайте свой первый проект для начала работы с AI"
                    : "Нет проектов, соответствующих критериям поиска"
                  }
                </p>
                {activeTab === "my" && (
                  <Button 
                    onClick={() => setCreateDialogOpen(true)} 
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Создать проект
                  </Button>
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
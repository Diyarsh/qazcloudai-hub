import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Plus,
  Bot,
  Zap,
  MessageCircle
} from "lucide-react";

export default function Projects() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("my");

  const projects = [
    {
      id: "1",
      name: "QC",
      icon: "🤖",
      isShared: false
    },
    {
      id: "2", 
      name: "New Project",
      icon: "🔥",
      isShared: false
    },
    {
      id: "3",
      name: "New Project",
      icon: "🔗",
      isShared: false
    },
    {
      id: "4",
      name: "AI Assistant",
      icon: "💬",
      isShared: true
    },
    {
      id: "5",
      name: "Document Processor",
      icon: "📄",
      isShared: false
    },
    {
      id: "6",
      name: "Data Analytics",
      icon: "📊",
      isShared: true
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
          <h1 className="text-2xl font-semibold text-foreground">{t('projects.title')}</h1>
        </div>
        <Button onClick={() => navigate("/projects/new")} className="bg-white text-black hover:bg-gray-200">
          <Plus className="h-4 w-4 mr-2" />
          {t('projects.createNew')}
        </Button>
      </div>

      {/* Tabs */}
      <div className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="flex items-center justify-between">
            <TabsList className="bg-muted">
              <TabsTrigger value="my">{t('projects.title')}</TabsTrigger>
              <TabsTrigger value="shared">Shared with me</TabsTrigger>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
              {filteredProjects.map((project) => (
                <Card 
                  key={project.id} 
                  className="group cursor-pointer hover:bg-muted/50 transition-colors border-border bg-card"
                  onClick={() => navigate(`/projects/${project.id}`)}
                >
                  <CardContent className="p-6 space-y-4">
                    {/* Project Icon */}
                    <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center text-2xl">
                      {project.icon}
                    </div>

                    {/* Project Name */}
                    <div>
                      <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                        {project.name}
                      </h3>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Empty State */}
            {filteredProjects.length === 0 && (
              <div className="text-center py-12">
                <Bot className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">
                  {t('projects.noProjects')}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {activeTab === "my" 
                    ? t('projects.noProjectsDesc')
                    : "No projects match your search criteria"
                  }
                </p>
                {activeTab === "my" && (
                  <Button onClick={() => navigate("/projects/new")} className="bg-white text-black hover:bg-gray-200">
                    <Plus className="h-4 w-4 mr-2" />
                    {t('projects.createNew')}
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
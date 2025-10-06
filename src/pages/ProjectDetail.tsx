import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslation } from 'react-i18next';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChatHistory } from "@/hooks/useChatHistory";
import { AppLayout } from "@/components/layout/AppLayout";
import { 
  ChevronLeft,
  Settings,
  MoreHorizontal,
  Paperclip,
  Send,
  MessageSquare,
  Calendar,
  Bot,
  Search,
  Users,
  FileText,
  Brain,
  Sparkles,
  Plus
} from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("files");
  const [message, setMessage] = useState("");
  const { chatSessions, createNewChat, addMessage } = useChatHistory();

  // Mock project data based on ID
  const project = {
    id: id || "1",
    name: id === "1" ? "QC" : "New Project",
    icon: id === "1" ? "🤖" : "🔥"
  };

  // Get chat sessions for this project (filtering by project ID or creating project-specific sessions)
  const projectSessions = Object.values(chatSessions).filter(session => 
    session.title.includes(project.name) || session.id.includes(`project-${id}`)
  );

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    // Create or use existing project session
    let sessionId = projectSessions[0]?.id;
    if (!sessionId) {
      sessionId = createNewChat(`${project.name}: ${message}`);
    }

    // Add user message
    addMessage(sessionId, message, true);
    setMessage("");

    // Simulate AI response after a delay
    setTimeout(() => {
      addMessage(sessionId, "Это ответ от AI assistant для проекта " + project.name, false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const allProjects = [
    { id: "1", name: "HR Ассистент", icon: Users, color: "text-blue-500" },
    { id: "2", name: "Анализ документов", icon: FileText, color: "text-green-500" },
    { id: "3", name: "AI-HUB", icon: Brain, color: "text-purple-500" },
  ];

  return (
    <AppLayout>
      <div className="flex h-full">
        {/* Left Sidebar - Projects List */}
        <div className="w-60 border-r border-border flex flex-col bg-background">
          {/* Sidebar Header */}
          <div className="p-4 border-b border-border">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate("/projects")}
            className="mb-4"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t('projects.search') + " ⌘K"}
              className="pl-10 bg-muted border-0 h-9"
            />
          </div>

          <Button 
            variant="ghost" 
            className="w-full justify-start text-muted-foreground hover:text-foreground mb-2"
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            {t('projects.chat')}
          </Button>
          
          <Button 
            variant="ghost" 
            className="w-full justify-start text-muted-foreground hover:text-foreground"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            {t('projects.images')}
          </Button>
        </div>

        {/* Projects Section */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-3">
            <div className="text-xs font-medium text-muted-foreground mb-2 px-2">
              {t('navigation.myProjects')}
            </div>
            <div className="space-y-1">
              {allProjects.map((proj) => {
                const IconComponent = proj.icon;
                return (
                  <Button
                    key={proj.id}
                    variant={proj.id === id ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => navigate(`/projects/${proj.id}`)}
                  >
                    <IconComponent className={`h-4 w-4 mr-2 ${proj.color}`} />
                    <span className="truncate">{proj.name}</span>
                  </Button>
                );
              })}
              
              <Button
                variant="ghost"
                className="w-full justify-start text-primary"
                onClick={() => navigate("/projects")}
              >
                <Plus className="h-4 w-4 mr-2" />
                {t('projects.new')}
              </Button>
            </div>
          </div>

          <div className="p-3 pt-4">
            <Button
              variant="ghost"
              className="w-full justify-start text-muted-foreground hover:text-foreground"
            >
              <Calendar className="h-4 w-4 mr-2" />
              {t('projects.history')}
            </Button>
          </div>
        </div>

        {/* User Section */}
        <div className="p-4 border-t border-border">
          <Button variant="ghost" className="w-full justify-start" size="sm">
            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mr-2 text-xs">
              U
            </div>
            <span className="truncate">{t('projects.user')}</span>
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-3">
            {allProjects.find(p => p.id === id) && (() => {
              const currentProject = allProjects.find(p => p.id === id)!;
              const IconComponent = currentProject.icon;
              return (
                <>
                  <div className={`w-8 h-8 rounded-md bg-muted flex items-center justify-center ${currentProject.color}`}>
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <h1 className="text-lg font-semibold text-foreground">{currentProject.name}</h1>
                </>
              );
            })()}
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Instructions Section */}
        <div className="p-6 border-b border-border bg-muted/20">
          <div className="flex items-center gap-2 mb-2">
            <Settings className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">{t('projects.instructions')}</span>
          </div>
          <p className="text-sm text-muted-foreground">
            {t('projects.instructionsDesc')}
          </p>
        </div>

        {/* Content with Tabs and Chat */}
        <div className="flex-1 flex">
          {/* Center Panel - Tabs */}
          <div className="w-80 border-r border-border bg-muted/30">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full justify-start bg-transparent p-4 h-auto border-b border-border">
                <TabsTrigger value="files" className="text-sm">{t('projects.files')}</TabsTrigger>
                <TabsTrigger value="conversations" className="text-sm">{t('projects.conversations')}</TabsTrigger>
              </TabsList>
              
              <TabsContent value="files" className="p-4 mt-0">
                <div className="space-y-4">
                  <Button variant="outline" className="w-full justify-start border-border hover:bg-muted">
                    <Paperclip className="h-4 w-4 mr-2" />
                    {t('projects.attach')}
                  </Button>
                  
                  <div className="text-center py-12">
                    <div className="w-12 h-12 rounded-lg bg-muted mx-auto mb-3 flex items-center justify-center">
                      <svg className="w-6 h-6 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                      </svg>
                    </div>
                    <h3 className="text-sm font-medium text-foreground mb-1">{t('projects.noFiles')}</h3>
                    <p className="text-xs text-muted-foreground px-6">
                      {t('projects.noFilesDesc')}
                    </p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="conversations" className="p-0 mt-0">
                <ScrollArea className="h-[calc(100vh-280px)]">
                  <div className="p-4 space-y-2">
                    {projectSessions.length > 0 ? (
                      projectSessions.map((session) => (
                        <Card key={session.id} className="cursor-pointer hover:bg-muted/50 transition-colors border-border">
                          <CardContent className="p-3">
                            <h4 className="text-sm font-medium text-foreground mb-1 line-clamp-1">
                              {session.title}
                            </h4>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Calendar className="h-3 w-3" />
                              {formatDistanceToNow(session.updatedAt, { 
                                addSuffix: true, 
                                locale: ru 
                              })}
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <div className="text-center py-12">
                        <MessageSquare className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
                        <p className="text-xs text-muted-foreground px-6">
                          {t('projects.noConversations')}
                        </p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Panel - Chat */}
          <div className="flex-1 flex flex-col">
            {/* Chat Messages */}
            <ScrollArea className="flex-1 p-6">
              {projectSessions.length > 0 && projectSessions[0].messages.length > 0 ? (
                <div className="space-y-4 max-w-3xl mx-auto">
                  {projectSessions[0].messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] rounded-lg p-4 ${
                        msg.isUser 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted text-foreground'
                      }`}>
                        <p className="text-sm">{msg.content}</p>
                        <div className="text-xs opacity-70 mt-2">
                          {format(msg.timestamp, 'HH:mm', { locale: ru })}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center h-full">
                  <div className="text-center">
                    <Bot className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-lg font-medium text-foreground mb-2">
                      {t('projects.startConversation')}
                    </p>
                    <p className="text-sm text-muted-foreground max-w-md">
                      {t('projects.startConversationDesc')}
                    </p>
                  </div>
                </div>
              )}
            </ScrollArea>

            {/* Chat Input */}
            <div className="p-6 border-t border-border">
              <div className="max-w-3xl mx-auto">
                <div className="flex items-end gap-2 bg-muted rounded-lg p-3">
                  <Button variant="ghost" size="icon" className="shrink-0">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Textarea
                    placeholder={t('projects.chatPlaceholder')}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="min-h-[60px] resize-none border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                    rows={2}
                  />
                  <Button 
                    size="icon" 
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                    className="bg-primary hover:bg-primary/90 shrink-0"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                  <span>Grok 4 Fast</span>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
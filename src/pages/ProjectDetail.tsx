import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTranslation } from 'react-i18next';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChatHistory } from "@/hooks/useChatHistory";
import { 
  ArrowLeft,
  Settings,
  MoreHorizontal,
  Paperclip,
  Send,
  MessageSquare,
  Calendar,
  Bot
} from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("files");
  const [message, setMessage] = useState("");
  const { chatSessions, createNewChat, addMessage } = useChatHistory();
  const { t } = useTranslation();

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

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate("/projects")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center text-lg">
            {project.icon}
          </div>
          <h1 className="text-lg font-semibold text-foreground">{project.name}</h1>
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
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-2 mb-3">
          <Settings className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">{t('projects.instructions')}</span>
        </div>
        <p className="text-sm text-muted-foreground">
          {t('projects.instructionsDesc')}
        </p>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Left Panel - Tabs */}
        <div className="w-80 border-r border-border bg-muted/30">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full justify-start bg-transparent p-4 h-auto">
              <TabsTrigger value="files" className="text-sm">{t('projects.files')}</TabsTrigger>
              <TabsTrigger value="conversations" className="text-sm">{t('projects.conversations')}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="files" className="p-4">
              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <Paperclip className="h-4 w-4 mr-2" />
                  {t('projects.attach')}
                </Button>
                
                <div className="text-center py-8">
                  <div className="w-12 h-12 rounded-lg bg-muted mx-auto mb-3 flex items-center justify-center">
                    📁
                  </div>
                  <h3 className="text-sm font-medium text-foreground mb-1">{t('projects.noFiles')}</h3>
                  <p className="text-xs text-muted-foreground">
                    {t('projects.noFilesDesc')}
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="conversations" className="p-0">
              <ScrollArea className="h-[calc(100vh-200px)]">
                <div className="p-4 space-y-2">
                  {projectSessions.length > 0 ? (
                    projectSessions.map((session) => (
                      <Card key={session.id} className="cursor-pointer hover:bg-muted/50 transition-colors">
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
                    <div className="text-center py-8">
                      <MessageSquare className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-xs text-muted-foreground">
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
              <div className="space-y-4">
                {projectSessions[0].messages.map((msg, index) => (
                  <div key={index} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] rounded-lg p-3 ${
                      msg.isUser 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted text-foreground'
                    }`}>
                      <p className="text-sm">{msg.content}</p>
                      <div className="text-xs opacity-70 mt-1">
                        {format(msg.timestamp, 'HH:mm', { locale: ru })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <Bot className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-2">{t('projects.startConversation')}</p>
                  <p className="text-sm text-muted-foreground">
                    {t('projects.startConversationDesc')}
                  </p>
                </div>
              </div>
            )}
          </ScrollArea>

          {/* Chat Input */}
          <div className="p-6 border-t border-border">
            <div className="flex items-end gap-2">
              <div className="flex-1">
                <Textarea
                  placeholder={t('projects.chatPlaceholder')}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="min-h-[60px] resize-none"
                  rows={3}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Button variant="ghost" size="icon">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Button 
                  size="icon" 
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                  className="bg-primary hover:bg-primary/90"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
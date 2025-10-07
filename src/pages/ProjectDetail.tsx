import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslation } from 'react-i18next';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useChatHistory } from "@/hooks/useChatHistory";
import { AppLayout } from "@/components/layout/AppLayout";
import { ChevronLeft, Settings, MoreHorizontal, Paperclip, Send, MessageSquare, Calendar, Bot, Search, Users, FileText, Brain, Sparkles, Plus } from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";
export default function ProjectDetail() {
  const {
    id
  } = useParams<{
    id: string;
  }>();
  const navigate = useNavigate();
  const {
    t
  } = useTranslation();
  const [activeTab, setActiveTab] = useState("files");
  const [message, setMessage] = useState("");
  const [selectedModel, setSelectedModel] = useState("auto");
  const [instructions, setInstructions] = useState("");
  const {
    chatSessions,
    createNewChat,
    addMessage
  } = useChatHistory();

  // Mock project data based on ID
  const project = {
    id: id || "1",
    name: id === "1" ? "QC" : "New Project",
    icon: id === "1" ? "🤖" : "🔥"
  };

  // Get chat sessions for this project (filtering by project ID or creating project-specific sessions)
  const projectSessions = Object.values(chatSessions).filter(session => session.title.includes(project.name) || session.id.includes(`project-${id}`));
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
  const allProjects = [{
    id: "1",
    name: "HR Ассистент",
    icon: Users,
    color: "text-blue-500"
  }, {
    id: "2",
    name: "Анализ документов",
    icon: FileText,
    color: "text-green-500"
  }, {
    id: "3",
    name: "AI-HUB",
    icon: Brain,
    color: "text-purple-500"
  }];
  return <AppLayout>
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-3">
            {allProjects.find(p => p.id === id) && (() => {
            const currentProject = allProjects.find(p => p.id === id)!;
            const IconComponent = currentProject.icon;
            return <>
                  <div className={`w-8 h-8 rounded-md bg-muted flex items-center justify-center ${currentProject.color}`}>
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <h1 className="text-lg font-semibold text-foreground">{currentProject.name}</h1>
                </>;
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
        <div className="p-6 border-b border-border bg-muted/20 space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Settings className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">{t('projects.instructions')}</span>
            </div>
            <Textarea
              placeholder={t('projects.instructionsPlaceholder')}
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="min-h-[100px] resize-none bg-background"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              {t('projects.preferredModel')}
            </label>
            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectTrigger className="w-full bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-background">
                <SelectItem value="auto">
                  <div className="flex items-center gap-3">
                    <Sparkles className="h-4 w-4" />
                    <div className="flex flex-col items-start">
                      <span className="font-medium">Auto</span>
                      <span className="text-xs text-muted-foreground">Chooses Fast or Expert</span>
                    </div>
                  </div>
                </SelectItem>
                <SelectItem value="qazllm-ultra">
                  <div className="flex items-center gap-3">
                    <Brain className="h-4 w-4" />
                    <div className="flex flex-col items-start">
                      <span className="font-medium">QazLLM-Ultra</span>
                      <span className="text-xs text-muted-foreground">Sovereign model for complex tasks</span>
                    </div>
                  </div>
                </SelectItem>
                <SelectItem value="gpt4-turbo">
                  <div className="flex items-center gap-3">
                    <Bot className="h-4 w-4" />
                    <div className="flex flex-col items-start">
                      <span className="font-medium">GPT-4 Turbo</span>
                      <span className="text-xs text-muted-foreground">Fast and accurate responses</span>
                    </div>
                  </div>
                </SelectItem>
                <SelectItem value="claude-sonnet">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="h-4 w-4" />
                    <div className="flex flex-col items-start">
                      <span className="font-medium">Claude 3.5 Sonnet</span>
                      <span className="text-xs text-muted-foreground">Powerful reasoning capabilities</span>
                    </div>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
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
                    {projectSessions.length > 0 ? projectSessions.map(session => <Card key={session.id} className="cursor-pointer hover:bg-muted/50 transition-colors border-border">
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
                        </Card>) : <div className="text-center py-12">
                        <MessageSquare className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
                        <p className="text-xs text-muted-foreground px-6">
                          {t('projects.noConversations')}
                        </p>
                      </div>}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Panel - Chat */}
          <div className="flex-1 flex flex-col">
            {/* Chat Messages */}
            <ScrollArea className="flex-1 p-6">
              {projectSessions.length > 0 && projectSessions[0].messages.length > 0 ? <div className="space-y-4 max-w-3xl mx-auto">
                  {projectSessions[0].messages.map((msg, index) => <div key={index} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] rounded-lg p-4 ${msg.isUser ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'}`}>
                        <p className="text-sm">{msg.content}</p>
                        <div className="text-xs opacity-70 mt-2">
                          {format(msg.timestamp, 'HH:mm', {
                      locale: ru
                    })}
                        </div>
                      </div>
                    </div>)}
                </div> : <div className="flex-1 flex items-center justify-center h-full">
                  <div className="text-center">
                    <Bot className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-lg font-medium text-foreground mb-2">
                      {t('projects.startConversation')}
                    </p>
                    <p className="text-sm text-muted-foreground max-w-md">
                      {t('projects.startConversationDesc')}
                    </p>
                  </div>
                </div>}
            </ScrollArea>

            {/* Chat Input */}
            <div className="p-6 border-t border-border">
              <div className="max-w-3xl mx-auto">
                <div className="flex items-end gap-2 bg-muted rounded-lg p-3">
                  <Button variant="ghost" size="icon" className="shrink-0">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Textarea placeholder={t('projects.chatPlaceholder')} value={message} onChange={e => setMessage(e.target.value)} onKeyPress={handleKeyPress} className="min-h-[60px] resize-none border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0" rows={2} />
                  <Button size="icon" onClick={handleSendMessage} disabled={!message.trim()} className="bg-primary hover:bg-primary/90 shrink-0">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>;
}
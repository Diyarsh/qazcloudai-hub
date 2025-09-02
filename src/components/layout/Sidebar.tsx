import { useState } from "react";
import { Search, MessageSquarePlus, FolderOpen, Lightbulb, Clock, Settings, User, ChevronLeft, ChevronRight, MessageCircle, ChevronDown } from "lucide-react";
import { QazCloudLogo } from "@/components/ui/qazcloud-logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ChatSession } from "@/types/chat";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SidebarProps {
  currentView: string;
  onViewChange: (view: "chat" | "catalog" | "projects" | "solutions" | "history" | "chats") => void;
  userName?: string;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  chatSessions?: ChatSession[];
  currentSessionId?: string | null;
  onSelectChat?: (sessionId: string) => void;
  onNewChat?: () => void;
}

export const Sidebar = ({ 
  currentView, 
  onViewChange, 
  userName, 
  isCollapsed = false, 
  onToggleCollapse,
  chatSessions = [],
  currentSessionId,
  onSelectChat,
  onNewChat
}: SidebarProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const menuItems: Array<{
    id: "chat" | "catalog" | "projects" | "solutions" | "history" | "chats";
    label: string;
    icon: any;
  }> = [
    { id: "catalog", label: "Каталог моделей", icon: () => <QazCloudLogo className="h-4 w-4" /> },
    { id: "projects", label: "Жобалар", icon: FolderOpen },
    { id: "solutions", label: "Дайын шешімдер", icon: Lightbulb },
    { id: "chats", label: "Чаттар", icon: MessageCircle },
    { id: "history", label: "Тарих", icon: Clock },
  ];

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return "Сегодня";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Вчера";
    } else {
      return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
    }
  };

  const groupedChats = chatSessions.reduce((groups, session) => {
    const dateKey = formatDate(new Date(session.createdAt));
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(session);
    return groups;
  }, {} as Record<string, ChatSession[]>);

  // Projects dropdown list with Kazakh names
  const projects = [
    { id: "1", name: "Клиенттердің деректерін талдау" },
    { id: "2", name: "Құжат айналымын автоматтандыру" },
    { id: "3", name: "Ұсыныстар жүйесі" },
    { id: "4", name: "Қолдау чат-боты" }
  ];

  return (
    <div className={cn(
      "h-screen bg-sidebar-background border-r border-sidebar-border flex flex-col transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className={cn("p-4 space-y-4", isCollapsed && "px-2")}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-primary rounded-xl">
              <QazCloudLogo className="h-5 w-5" />
            </div>
            {!isCollapsed && (
              <div>
                <h1 className="text-lg font-bold text-sidebar-foreground">QC AI-HUB</h1>
              </div>
            )}
          </div>
          {onToggleCollapse && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleCollapse}
              className="h-8 w-8 p-0 text-sidebar-foreground hover:bg-sidebar-accent"
            >
              {isCollapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>
          )}
        </div>

        {/* Search */}
        {!isCollapsed && (
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Поиск"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-sidebar-accent border-sidebar-border"
            />
          </div>
        )}
      </div>

      <Separator className="bg-sidebar-border" />

      {/* New Chat Button */}
      <div className={cn("px-3 py-2", isCollapsed && "px-1")}>
        <Button
          variant="outline"
          className={cn(
            "w-full text-sidebar-foreground border-sidebar-border hover:bg-sidebar-accent",
            isCollapsed ? "justify-center p-2" : "justify-start"
          )}
          onClick={() => {
            onNewChat?.();
            onViewChange("chat");
          }}
          title={isCollapsed ? "Новый чат" : undefined}
        >
          <MessageSquarePlus className={cn("h-4 w-4", !isCollapsed && "mr-2")} />
          {!isCollapsed && "Новый чат"}
        </Button>
      </div>

      {/* Chat History */}
      {chatSessions.length > 0 && !isCollapsed && (
        <div className="px-3 py-2 flex-1 overflow-hidden">
          <h3 className="text-xs font-medium text-muted-foreground mb-2 px-2">История чатов</h3>
          <ScrollArea className="h-[300px]">
            <div className="space-y-3">
              {Object.entries(groupedChats).map(([dateGroup, sessions]) => (
                <div key={dateGroup}>
                  <h4 className="text-xs font-medium text-muted-foreground mb-1 px-2">{dateGroup}</h4>
                  <div className="space-y-1">
                    {sessions.map((session) => (
                      <Button
                        key={session.id}
                        variant="ghost"
                        className={cn(
                          "w-full justify-start text-left text-sidebar-foreground hover:bg-sidebar-accent p-2 h-auto",
                          currentSessionId === session.id && "bg-sidebar-accent text-sidebar-primary"
                        )}
                        onClick={() => {
                          onSelectChat?.(session.id);
                          onViewChange("chat");
                        }}
                      >
                        <div className="flex items-center w-full min-w-0">
                          <MessageCircle className="h-3 w-3 mr-2 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium truncate">{session.title}</p>
                            <p className="text-xs text-muted-foreground">
                              {formatTime(new Date(session.updatedAt))}
                            </p>
                          </div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}

      <Separator className="bg-sidebar-border" />

      {/* Navigation */}
      <ScrollArea className={cn("py-2", isCollapsed ? "px-1" : "px-3")}>
        <div className="space-y-1">
          {menuItems.map((item) => {
            // Специальная обработка для проектов и истории
            if ((item.id === "projects" || item.id === "history") && !isCollapsed) {
              return (
                <DropdownMenu key={item.id}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-between text-sidebar-foreground hover:bg-sidebar-accent group",
                        currentView === item.id && "bg-sidebar-accent text-sidebar-primary"
                      )}
                    >
                      <div className="flex items-center">
                        <item.icon className="h-4 w-4 mr-3" />
                        {item.label}
                      </div>
                      <ChevronDown className="h-3 w-3 opacity-50 group-hover:opacity-100" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="right" align="start" className="w-56">
                    {item.id === "projects" ? (
                      projects.map((project) => (
                        <DropdownMenuItem key={project.id} className="cursor-pointer">
                          <FolderOpen className="h-4 w-4 mr-2" />
                          {project.name}
                        </DropdownMenuItem>
                      ))
                    ) : (
                      chatSessions.slice(0, 5).map((session) => (
                        <DropdownMenuItem 
                          key={session.id} 
                          className="cursor-pointer"
                          onClick={() => {
                            onSelectChat?.(session.id);
                            onViewChange("chat");
                          }}
                        >
                          <MessageCircle className="h-4 w-4 mr-2" />
                          <div className="flex-1 min-w-0">
                            <p className="truncate text-sm">{session.title}</p>
                            <p className="text-xs text-muted-foreground">
                              {formatDate(new Date(session.createdAt))}
                            </p>
                          </div>
                        </DropdownMenuItem>
                      ))
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              );
            }
            
            return (
              <Button
                key={item.id}
                variant="ghost"
                className={cn(
                  "w-full text-sidebar-foreground hover:bg-sidebar-accent",
                  isCollapsed ? "justify-center p-2" : "justify-start",
                  currentView === item.id && "bg-sidebar-accent text-sidebar-primary"
                )}
                onClick={() => onViewChange(item.id)}
                title={isCollapsed ? item.label : undefined}
              >
                <item.icon className={cn("h-4 w-4", !isCollapsed && "mr-3")} />
                {!isCollapsed && item.label}
              </Button>
            );
          })}
        </div>
      </ScrollArea>

      <Separator className="bg-sidebar-border" />

      {/* User Profile */}
      <div className={cn("p-3 space-y-2", isCollapsed && "px-1")}>
        <div className={cn(
          "flex items-center p-2 rounded-lg hover:bg-sidebar-accent cursor-pointer",
          isCollapsed ? "justify-center" : "space-x-3"
        )}>
          <div className="p-2 bg-gradient-secondary rounded-lg">
            <User className="h-4 w-4 text-white" />
          </div>
          {!isCollapsed && (
            <>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">
                  {userName || "Пользователь"}
                </p>
                <p className="text-xs text-muted-foreground">Онлайн</p>
              </div>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
import { useState } from "react";
import { CompanyLogo } from "@/components/ui/company-logo";
import { NavLink, useLocation } from "react-router-dom";
import { useDeveloperMode } from "@/hooks/useDeveloperMode";
import { Switch } from "@/components/ui/switch";
import { useTranslation } from 'react-i18next';
import { useAuth } from "@/hooks/useAuth";
import {
  MessageSquare,
  Sparkles,
  FolderOpen,
  Clock,
  Cpu,
  Settings,
  FileText,
  LogOut,
  User,
  ChevronDown,
  Code
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const collapsed = state === "collapsed";
  const { isDeveloperMode, toggleDeveloperMode } = useDeveloperMode();
  const { user, signOut } = useAuth();
  const { t } = useTranslation();
  const [showSettings, setShowSettings] = useState(false);
  const [showDocumentation, setShowDocumentation] = useState(false);

  const navigationItems = [
    {
      titleKey: "navigation.chat",
      url: "/dashboard",
      icon: MessageSquare,
      group: "main"
    },
    {
      titleKey: "navigation.aiStudio",
      url: "/ai-studio",
      icon: Sparkles,
      group: "main"
    },
    {
      titleKey: "navigation.myProjects",
      url: "/projects",
      icon: FolderOpen,
      group: "main"
    },
    {
      titleKey: "navigation.history",
      url: "/history",
      icon: Clock,
      group: "main"
    },
    {
      titleKey: "navigation.laboratory",
      url: "/lab",
      icon: Cpu,
      group: "main",
      disabled: !isDeveloperMode
    }
  ];

  const groupedItems = navigationItems.reduce((acc, item) => {
    if (!acc[item.group]) {
      acc[item.group] = [];
    }
    acc[item.group].push(item);
    return acc;
  }, {} as Record<string, typeof navigationItems>);

  const groupLabels = {
    main: t("groups.main"),
    development: t("groups.development"),
    settings: t("groups.settings")
  };

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  const handleSignOut = async () => {
    await signOut();
  };

  const getUserInitials = () => {
    if (user?.email) {
      return user.email.substring(0, 2).toUpperCase();
    }
    return "U";
  };

  const getUserName = () => {
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name;
    }
    if (user?.email) {
      return user.email.split('@')[0];
    }
    return "Пользователь";
  };

  return (
    <Sidebar className="border-r border-sidebar-border">
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-3 px-4 py-3">
          <CompanyLogo className="h-10 w-10" />
          {!collapsed && (
            <div>
              <h1 className="text-lg font-bold text-sidebar-foreground">AI-HUB</h1>
              <p className="text-xs text-sidebar-foreground/70">Enterprise Platform</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        {Object.entries(groupedItems).map(([groupKey, items]) => {
          return (
            <SidebarGroup key={groupKey}>
              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map((item) => (
                    <SidebarMenuItem key={item.url}>
                      <SidebarMenuButton 
                        asChild={!item.disabled} 
                        isActive={isActive(item.url)}
                        className={item.disabled ? "opacity-50 cursor-not-allowed" : ""}
                      >
                        {item.disabled ? (
                          <div className="flex items-center gap-3">
                            <item.icon className="h-4 w-4" />
                            {!collapsed && <span>{t(item.titleKey)}</span>}
                          </div>
                        ) : (
                          <NavLink
                            to={item.url}
                            className={({ isActive }) =>
                              `flex items-center gap-3 ${
                                isActive
                                  ? "bg-sidebar-accent text-sidebar-primary"
                                  : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                              }`
                            }
                          >
                            <item.icon className="h-4 w-4" />
                            {!collapsed && <span>{t(item.titleKey)}</span>}
                          </NavLink>
                        )}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          );
        })}

        {/* Developer Mode Toggle */}
        {!collapsed && (
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <div className="flex items-center justify-between px-2 py-2 text-sidebar-foreground">
                    <div className="flex items-center space-x-2">
                      <Code className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">{t('navigation.devMode')}</span>
                    </div>
                    <Switch 
                      checked={isDeveloperMode} 
                      onCheckedChange={toggleDeveloperMode}
                    />
                  </div>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        {/* User Profile Section */}
        <div className="px-4 py-3">
          {!collapsed ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="w-full">
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-sidebar-accent/50 transition-colors">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground text-sm">
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium text-sidebar-foreground">{getUserName()}</p>
                    <p className="text-xs text-sidebar-foreground/70 truncate">{user?.email}</p>
                  </div>
                  <ChevronDown className="h-4 w-4 text-sidebar-foreground/70" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={() => setShowSettings(true)}>
                  <Settings className="h-4 w-4 mr-2" />
                  {t('navigation.settings')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setShowDocumentation(true)}>
                  <FileText className="h-4 w-4 mr-2" />
                  {t('navigation.documentation')}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="text-destructive">
                  <LogOut className="h-4 w-4 mr-2" />
                  {t('navigation.signOut')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className="h-8 w-8 mx-auto">
                  <AvatarFallback className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground text-sm">
                    {getUserInitials()}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={() => setShowSettings(true)}>
                  <Settings className="h-4 w-4 mr-2" />
                  {t('navigation.settings')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setShowDocumentation(true)}>
                  <FileText className="h-4 w-4 mr-2" />
                  {t('navigation.documentation')}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="text-destructive">
                  <LogOut className="h-4 w-4 mr-2" />
                  {t('navigation.signOut')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        <div className="px-4 py-1 text-xs text-sidebar-foreground/50">
          {!collapsed && "v2.0.0 Enterprise"}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
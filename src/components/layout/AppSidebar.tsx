import { useState } from "react";
import { CompanyLogo } from "@/components/ui/company-logo";
import { NavLink, useLocation } from "react-router-dom";
import { useDeveloperMode } from "@/hooks/useDeveloperMode";
import { Switch } from "@/components/ui/switch";
import { useTranslation } from 'react-i18next';
import {
  Database,
  FolderOpen,
  Settings,
  Cpu,
  Network,
  Lightbulb,
  GitBranch,
  FileText,
  Layers,
  Code,
  Package
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

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const collapsed = state === "collapsed";
  const { isDeveloperMode, toggleDeveloperMode } = useDeveloperMode();
  const { t } = useTranslation();

  const navigationItems = [
    {
      titleKey: "navigation.home",
      url: "/dashboard",
      icon: () => <CompanyLogo className="h-4 w-4" />,
      group: "main"
    },
    {
      titleKey: "navigation.modelCatalog",
      url: "/models",
      icon: Database,
      group: "main"
    },
    {
      titleKey: "navigation.myProjects",
      url: "/projects",
      icon: FolderOpen,
      group: "main"
    },
    {
      titleKey: "navigation.readySolutions",
      url: "/templates",
      icon: Package,
      group: "main"
    },
    {
      titleKey: "navigation.pipelines",
      url: "/pipelines",
      icon: Network,
      group: "main"
    },
    {
      titleKey: "navigation.laboratory",
      url: "/lab",
      icon: Cpu,
      group: "development"
    },
    {
      titleKey: "navigation.mlops",
      url: "/mlops",
      icon: GitBranch,
      group: "development"
    },
    {
      titleKey: "navigation.datasets",
      url: "/datasets",
      icon: Layers,
      group: "development"
    },
    {
      titleKey: "navigation.documentation",
      url: "/docs",
      icon: FileText,
      group: "settings"
    },
    {
      titleKey: "navigation.settings",
      url: "/settings",
      icon: Settings,
      group: "settings"
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
          // Скрываем группу разработка если режим разработчика отключен
          if (groupKey === 'development' && !isDeveloperMode) {
            return null;
          }
          
          return (
            <SidebarGroup key={groupKey}>
              {!collapsed && (
                <SidebarGroupLabel className="text-sidebar-foreground/70">
                  {groupLabels[groupKey as keyof typeof groupLabels]}
                </SidebarGroupLabel>
              )}
              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map((item) => (
                    <SidebarMenuItem key={item.url}>
                      <SidebarMenuButton asChild isActive={isActive(item.url)}>
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
        <div className="px-4 py-3 text-xs text-sidebar-foreground/50">
          {!collapsed && "v2.0.0 Enterprise"}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
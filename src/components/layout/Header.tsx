import { User, LogOut, Settings, Code } from "lucide-react";
import { QazCloudLogo } from "@/components/ui/qazcloud-logo";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { useTranslation } from 'react-i18next';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useDeveloperMode } from "@/hooks/useDeveloperMode";

export const Header = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const { isDeveloperMode, toggleDeveloperMode } = useDeveloperMode();
  const { t } = useTranslation();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Выход выполнен",
        description: "До свидания!",
      });
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось выйти из системы",
        variant: "destructive",
      });
    }
  };
  return (
    <header className="absolute top-0 left-0 right-0 z-50 bg-transparent">
      <div className="container mx-auto px-4 py-3 bg-transparent">
        <div className="flex items-center justify-between bg-transparent">
          {/* Logo in left corner */}
          <div className="flex items-center space-x-2">
            <QazCloudLogo className="h-10 w-10" />
          </div>
          
          {/* Language toggle on right */}
          <div className="flex items-center">
            <LanguageToggle />
          </div>
        </div>
      </div>
    </header>
  );
};
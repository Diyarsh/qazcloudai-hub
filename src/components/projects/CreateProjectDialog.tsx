import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Sparkles } from "lucide-react";

interface CreateProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateProjectDialog({ open, onOpenChange }: CreateProjectDialogProps) {
  const navigate = useNavigate();
  const [projectName, setProjectName] = useState("");
  const [instructions, setInstructions] = useState("");

  const handleNext = () => {
    // В будущем здесь будет логика создания проекта
    // Пока просто закрываем диалог и переходим на страницу нового проекта
    onOpenChange(false);
    navigate("/projects/new");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-card border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground">
            <Sparkles className="h-5 w-5 text-primary" />
            Название проекта
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="project-name" className="text-foreground">
              Название
            </Label>
            <Input
              id="project-name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Введите название проекта"
              className="bg-background border-border text-foreground"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="instructions" className="text-foreground">
              Инструкции проекта
            </Label>
            <Textarea
              id="instructions"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="Добавьте инструкции о тоне, стиле и персоне, которую должен принять AI"
              className="min-h-[200px] bg-background border-border text-foreground resize-none"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="text-muted-foreground hover:text-foreground"
          >
            Отмена
          </Button>
          <Button
            onClick={handleNext}
            disabled={!projectName.trim()}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Далее
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

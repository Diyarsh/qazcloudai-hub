import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
  const [projectName, setProjectName] = useState("");
  const [instructions, setInstructions] = useState("");
  const [step, setStep] = useState(1);

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else {
      // Создаем проект и переходим к нему
      onOpenChange(false);
      setStep(1);
      setProjectName("");
      setInstructions("");
      // Переходим на страницу проекта (используем рандомный ID для демо)
      navigate(`/projects/${Date.now()}`);
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    setStep(1);
    setProjectName("");
    setInstructions("");
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] bg-card border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground">
            <Sparkles className="h-5 w-5 text-primary" />
            {step === 1 ? t('projects.projectName') : t('projects.projectFiles')}
          </DialogTitle>
        </DialogHeader>
        
        {step === 1 ? (
          <>
            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <Label htmlFor="project-name" className="text-foreground">
                  {t('projects.nameLabel')}
                </Label>
                <Input
                  id="project-name"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder={t('projects.namePlaceholder')}
                  className="bg-background border-border text-foreground"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="instructions" className="text-foreground">
                  {t('projects.instructionsLabel')}
                </Label>
                <Textarea
                  id="instructions"
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  placeholder={t('projects.instructionsPlaceholder')}
                  className="min-h-[200px] bg-background border-border text-foreground resize-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button
                variant="ghost"
                onClick={handleClose}
                className="text-muted-foreground hover:text-foreground"
              >
                {t('projects.cancel')}
              </Button>
              <Button
                onClick={handleNext}
                disabled={!projectName.trim()}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {t('projects.next')}
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="py-8">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center">
                  <svg className="w-8 h-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                  </svg>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-foreground">{t('projects.addProjectFiles')}</h3>
                  <p className="text-sm text-muted-foreground max-w-md">
                    {t('projects.addProjectFilesDesc')}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-between gap-3">
              <Button
                variant="ghost"
                onClick={handleBack}
                className="text-muted-foreground hover:text-foreground"
              >
                {t('projects.back')}
              </Button>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="border-border text-foreground hover:bg-muted"
                >
                  {t('projects.attach')}
                </Button>
                <Button
                  onClick={handleNext}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  {t('projects.done')}
                </Button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

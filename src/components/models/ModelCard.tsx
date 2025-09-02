import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Zap, Star } from "lucide-react";
import { QazCloudLogo } from "@/components/ui/qazcloud-logo";

interface ModelCardProps {
  name: string;
  description: string;
  provider: string;
  category: string;
  rating: number;
  uses: number;
}

export const ModelCard = ({ name, description, provider, category, rating, uses }: ModelCardProps) => {
  return (
    <Card className="group hover:shadow-ai transition-all duration-300 bg-card border-border hover:border-ai-primary/50">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-secondary rounded-lg">
              <QazCloudLogo className="h-4 w-4" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold text-foreground group-hover:text-ai-primary transition-colors">
                {name}
              </CardTitle>
              <p className="text-sm text-muted-foreground">{provider}</p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-ai-muted text-ai-secondary">
            {category}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <CardDescription className="text-sm text-muted-foreground line-clamp-3">
          {description}
        </CardDescription>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span>{rating}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Zap className="h-4 w-4" />
              <span>{uses.toLocaleString()} использований</span>
            </div>
          </div>
        </div>
        
        <Button className="w-full bg-gradient-primary hover:bg-gradient-secondary text-white shadow-ai">
          Использовать модель
        </Button>
      </CardContent>
    </Card>
  );
};
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

interface CompanyLogoProps {
  className?: string;
}

export const CompanyLogo = ({ className }: CompanyLogoProps) => {
  const { theme } = useTheme();
  
  return (
    <img
      src={theme === "dark" 
        ? "/lovable-uploads/1f4d4e0e-3ca2-4cc9-98e4-84c901c60a47.png"
        : "/lovable-uploads/90e27eca-d34f-40c9-b9eb-0541731f4576.png"
      }
      alt="QazCloud"
      className={cn("object-contain", className)}
      onError={(e) => {
        // Fallback to a placeholder or alternative image
        (e.target as HTMLImageElement).style.display = 'none';
      }}
    />
  );
};
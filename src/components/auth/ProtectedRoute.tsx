import { useAuth } from "@/hooks/useAuth";
import { LoginForm } from "./LoginForm";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user } = useAuth();

  if (!user) {
    return <LoginForm onSuccess={() => window.location.reload()} />;
  }

  return <>{children}</>;
}
import { useAuth } from "@/hooks/useAuth";
import { LoginForm } from "./LoginForm";
import { ReactNode, useState } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const [loginSuccess, setLoginSuccess] = useState(false);

  console.log('ProtectedRoute - user:', user, 'loading:', loading);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (!user && !loginSuccess) {
    return <LoginForm onSuccess={() => setLoginSuccess(true)} />;
  }

  return <>{children}</>;
}
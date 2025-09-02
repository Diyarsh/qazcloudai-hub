import { useState } from "react";
import { WelcomeScreen } from "@/components/welcome/WelcomeScreen";
import { LoginForm } from "@/components/auth/LoginForm";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";

const Index = () => {
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    // Переходим на дашборд
    navigate("/dashboard");
  };

  const handleDemo = () => {
    // Переходим на дашборд для демо
    navigate("/dashboard");
  };

  const handleLoginSuccess = () => {
    setShowLogin(false);
    navigate("/dashboard");
  };

  if (showLogin) {
    return <LoginForm onSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <WelcomeScreen onGetStarted={handleGetStarted} onDemo={handleDemo} />
    </div>
  );
};

export default Index;

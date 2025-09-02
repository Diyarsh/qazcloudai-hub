import { useState } from "react";
import { Shield, TrendingUp, Lock, Settings, HeadphonesIcon, ArrowRight, Play, Cpu, Database, Brain } from "lucide-react";
import { QazCloudLogo } from "@/components/ui/qazcloud-logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from 'react-i18next';
import { LanguageToggle } from "@/components/ui/language-toggle";
interface WelcomeScreenProps {
  onGetStarted: () => void;
  onDemo: () => void;
}
export const WelcomeScreen = ({
  onGetStarted,
  onDemo
}: WelcomeScreenProps) => {
  const {
    t
  } = useTranslation();
  const [hoveredAdvantage, setHoveredAdvantage] = useState<number | null>(null);
  const [hoveredModel, setHoveredModel] = useState<number | null>(null);

  // Ключевые преимущества
  const advantages = [{
    icon: Shield,
    title: t('advantages.digitalSovereignty'),
    description: t('advantages.digitalSovereigntyDesc')
  }, {
    icon: TrendingUp,
    title: t('advantages.scalability'),
    description: t('advantages.scalabilityDesc')
  }, {
    icon: Lock,
    title: t('advantages.security'),
    description: t('advantages.securityDesc')
  }];

  // Модели взаимодействия
  const serviceModels = [{
    icon: Settings,
    title: t('serviceModels.selfService'),
    description: t('serviceModels.selfServiceDesc'),
    features: [t('serviceModels.features.gpuAccess'), t('serviceModels.features.modelLibrary'), t('serviceModels.features.autonomousDev')]
  }, {
    icon: HeadphonesIcon,
    title: t('serviceModels.aiAsService'),
    description: t('serviceModels.aiAsServiceDesc'),
    features: [t('serviceModels.features.expertConsultation'), t('serviceModels.features.customDev'), t('serviceModels.features.techSupport')]
  }];
  return <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex flex-col relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-l from-blue-500/15 to-cyan-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      

      {/* Main Content */}
      <div className="relative flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-7xl mx-auto space-y-20">
          
          {/* Hero Section */}
          <div className="text-center space-y-8">
            
            
            <Badge variant="outline" className="bg-cyan-400/10 border-cyan-400/30 text-cyan-400 backdrop-blur-sm px-4 py-2 text-sm font-medium">
              {t('welcome.badge')}
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-cyan-400 to-blue-400 bg-clip-text text-transparent leading-tight">
              {t('welcome.title')}
            </h1>
            
            <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed font-light">
              {t('welcome.subtitle')}
            </p>


            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-6">
              <Button onClick={onGetStarted} size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white shadow-lg px-12 py-6 text-lg font-semibold group transition-all duration-300 rounded-2xl">
                <span>{t('welcome.getStarted')}</span>
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button onClick={onDemo} variant="outline" size="lg" className="border-cyan-400/30 bg-white/5 backdrop-blur-sm text-white hover:bg-cyan-400/10 hover:border-cyan-400 px-12 py-6 text-lg font-semibold group transition-all duration-300 rounded-2xl">
                <Play className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
                <span>{t('welcome.learnMore')}</span>
              </Button>
            </div>
          </div>

          {/* Ключевые преимущества */}
          <div className="space-y-12">
            <h2 className="text-4xl font-bold text-center text-white mb-12">
              {t('advantages.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {advantages.map((advantage, index) => <Card key={index} className={`group cursor-pointer transition-all duration-500 bg-white/5 backdrop-blur-sm border-cyan-400/20 hover:border-cyan-400/60 hover:bg-cyan-400/5 ${hoveredAdvantage === index ? "shadow-2xl shadow-cyan-400/20 scale-105 border-cyan-400" : "hover:shadow-xl"}`} onMouseEnter={() => setHoveredAdvantage(index)} onMouseLeave={() => setHoveredAdvantage(null)}>
                  <CardHeader className="text-center space-y-6 p-8">
                    <div className="mx-auto p-6 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-2xl group-hover:from-cyan-400/30 group-hover:to-blue-400/30 transition-all duration-300 backdrop-blur-sm border border-cyan-400/20">
                      <advantage.icon className="h-8 w-8 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
                    </div>
                    <CardTitle className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {advantage.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8 pt-0">
                    <CardDescription className="text-center text-white/70 leading-relaxed">
                      {advantage.description}
                    </CardDescription>
                  </CardContent>
                </Card>)}
            </div>
          </div>

          {/* Модели взаимодействия */}
          <div className="space-y-12">
            <h2 className="text-4xl font-bold text-center text-white mb-12">
              {t('serviceModels.title')}
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {serviceModels.map((model, index) => <Card key={index} className={`group cursor-pointer transition-all duration-500 bg-white/5 backdrop-blur-sm border-cyan-400/20 hover:border-cyan-400/60 hover:bg-cyan-400/5 ${hoveredModel === index ? "shadow-2xl shadow-cyan-400/20 scale-102 border-cyan-400" : "hover:shadow-xl"}`} onMouseEnter={() => setHoveredModel(index)} onMouseLeave={() => setHoveredModel(null)}>
                  <CardHeader className="space-y-6 p-8">
                    <div className="flex items-center space-x-4">
                      <div className="p-4 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-xl group-hover:from-cyan-400/30 group-hover:to-blue-400/30 transition-all duration-300 backdrop-blur-sm border border-cyan-400/20">
                        <model.icon className="h-6 w-6 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
                      </div>
                      <CardTitle className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                        {model.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-8 pt-0 space-y-6">
                    <CardDescription className="text-white/70 leading-relaxed text-lg">
                      {model.description}
                    </CardDescription>
                    <ul className="space-y-3">
                      {model.features.map((feature, idx) => <li key={idx} className="flex items-center text-white/80">
                          <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
                          {feature}
                        </li>)}
                    </ul>
                  </CardContent>
                </Card>)}
            </div>
          </div>

          {/* О платформе */}
          <div className="space-y-12">
            <h2 className="text-4xl font-bold text-center text-white mb-12">
              О платформе AI-HUB
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-2xl flex items-center justify-center border border-cyan-400/20">
                  <Cpu className="h-8 w-8 text-cyan-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">Мощные вычисления</h3>
                <p className="text-white/70">
                  Высокопроизводительные GPU и CPU для обучения и инференса AI-моделей
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-2xl flex items-center justify-center border border-cyan-400/20">
                  <Database className="h-8 w-8 text-cyan-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">Безопасные данные</h3>
                <p className="text-white/70">
                  Надежное хранение и обработка данных в соответствии с законодательством РК
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-2xl flex items-center justify-center border border-cyan-400/20">
                  <Brain className="h-8 w-8 text-cyan-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">Готовые модели</h3>
                <p className="text-white/70">
                  Библиотека предобученных моделей для быстрого старта проектов
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center space-y-8 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur-sm rounded-3xl border border-cyan-400/20 p-12">
            <h3 className="text-3xl font-bold text-white mb-6">Готовы начать?</h3>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Присоединяйтесь к цифровой трансформации Казахстана с помощью искусственного интеллекта
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={onGetStarted} size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white shadow-lg px-8 py-4 text-base font-semibold group transition-all duration-300 rounded-xl">
                Получить консультацию
              </Button>
              <Button variant="outline" size="lg" className="border-cyan-400/30 bg-white/5 backdrop-blur-sm text-white hover:bg-cyan-400/10 hover:border-cyan-400 px-8 py-4 text-base font-semibold group transition-all duration-300 rounded-xl">
                Изучить документацию
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
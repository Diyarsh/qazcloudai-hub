import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/hooks/useAuth";
import { AppLayout } from "@/components/layout/AppLayout";
import Index from "./pages/Index";
import Chat from "./pages/Chat";
import AIStudio from "./pages/AIStudio";
import Projects from "./pages/Projects";
import NewProject from "./pages/NewProject";
import History from "./pages/History";
import Laboratory from "./pages/Laboratory";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      <AuthProvider>
        <TooltipProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dashboard" element={
                <AppLayout>
                  <Chat />
                </AppLayout>
              } />
              <Route path="/ai-studio" element={
                <AppLayout>
                  <AIStudio />
                </AppLayout>
              } />
              <Route path="/projects" element={
                <AppLayout>
                  <Projects />
                </AppLayout>
              } />
              <Route path="/projects/new" element={<NewProject />} />
              <Route path="/history" element={
                <AppLayout>
                  <History />
                </AppLayout>
              } />
               <Route path="/lab/*" element={
                 <AppLayout>
                   <Laboratory />
                 </AppLayout>
               } />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;

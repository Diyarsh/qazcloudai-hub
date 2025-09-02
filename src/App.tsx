import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/hooks/useAuth";
import { AppLayout } from "@/components/layout/AppLayout";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Models from "./pages/Models";
import Projects from "./pages/Projects";
import NewProject from "./pages/NewProject";
import Pipelines from "./pages/Pipelines";
import Templates from "./pages/Templates";
import Laboratory from "./pages/Laboratory";
import MLOps from "./pages/MLOps";
import Datasets from "./pages/Datasets";
import Documentation from "./pages/Documentation";
import Settings from "./pages/Settings";
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
                  <Dashboard />
                </AppLayout>
              } />
              <Route path="/models" element={
                <AppLayout>
                  <Models />
                </AppLayout>
              } />
              <Route path="/projects" element={
                <AppLayout>
                  <Projects />
                </AppLayout>
              } />
              <Route path="/projects/new" element={<NewProject />} />
              <Route path="/pipelines" element={
                <AppLayout>
                  <Pipelines />
                </AppLayout>
              } />
              <Route path="/templates" element={
                <AppLayout>
                  <Templates />
                </AppLayout>
              } />
               <Route path="/lab" element={
                 <AppLayout>
                   <Laboratory />
                 </AppLayout>
               } />
              <Route path="/mlops" element={
                <AppLayout>
                  <MLOps />
                </AppLayout>
              } />
              <Route path="/datasets" element={
                <AppLayout>
                  <Datasets />
                </AppLayout>
              } />
              <Route path="/docs" element={
                <AppLayout>
                  <Documentation />
                </AppLayout>
              } />
              <Route path="/settings" element={
                <AppLayout>
                  <Settings />
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

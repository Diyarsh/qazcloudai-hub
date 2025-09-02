import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, Lock, Building, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

const loginSchema = z.object({
  email: z.string().email("Введите корректный email адрес").refine(
    (email) => email.includes("@") && email.split("@")[1]?.includes("."),
    "Введите корпоративный email адрес"
  ),
  password: z.string().min(6, "Пароль должен содержать минимум 6 символов"),
});

type LoginForm = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSuccess: () => void;
}

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const { signInDemo } = useAuth();

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginForm) => {
    setIsLoading(true);
    setError(null);

    // Demo credentials for testing
    const demoCredentials = {
      email: "admin@company.com",
      password: "123456"
    };

    // Check if Supabase is configured
    if (!isSupabaseConfigured || !supabase) {
      // Demo mode - check against test credentials
      if (values.email === demoCredentials.email && values.password === demoCredentials.password) {
        signInDemo(values.email);
        toast({
          title: "Демо-вход выполнен",
          description: `Добро пожаловать, ${values.email}! (Демо-режим)`,
        });
        setIsLoading(false);
        onSuccess();
        return;
      } else {
        setError("Неверные данные. Используйте: admin@company.com / 123456 (демо-режим)");
        setIsLoading(false);
        return;
      }
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (error) {
        if (error.message.includes("Invalid login credentials")) {
          setError("Неверный email или пароль");
        } else {
          setError(error.message);
        }
        return;
      }

      if (data.user) {
        toast({
          title: "Вход выполнен успешно",
          description: `Добро пожаловать, ${data.user.email}!`,
        });
        onSuccess();
      }
    } catch (err) {
      setError("Произошла ошибка при входе в систему");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="w-full max-w-md shadow-ai">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto p-3 bg-gradient-primary rounded-xl">
            <Building className="h-8 w-8 text-white" />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-2xl font-bold">Корпоративный вход</CardTitle>
            <CardDescription>
              Войдите в систему с использованием корпоративного email
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Корпоративный Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          {...field}
                          type="email"
                          placeholder="admin@company.com (демо)"
                          className="pl-10"
                          disabled={isLoading}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Пароль</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          {...field}
                          type="password"
                          placeholder="123456 (демо)"
                          className="pl-10"
                          disabled={isLoading}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full text-white"
                disabled={isLoading}
              >
                {isLoading ? "Выполняется вход..." : "Войти в систему"}
              </Button>
            </form>
          </Form>

          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              Не можете войти в систему?
            </p>
            <Button variant="link" className="text-ai-primary p-0 h-auto">
              Обратитесь к администратору
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
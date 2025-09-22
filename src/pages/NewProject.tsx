import { useState } from "react";
import { ArrowLeft, Upload, FileText, Upload as UploadIcon, Paperclip, HardDrive, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

export default function NewProject() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("attachments");
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const handleFileUpload = (fileName: string) => {
    setUploadedFiles(prev => [...prev, fileName]);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/projects")}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Назад
          </Button>
          <h1 className="text-2xl font-bold">Новый проект</h1>
        </div>
        <Button variant="ghost" size="sm">
          <Upload className="h-4 w-4 mr-2" />
          Инструкции
        </Button>
      </div>

      {/* Initial Input */}
      <div className="p-6 border-b">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <Input
              placeholder="Начать разговор в этом проекте"
              className="pr-12 h-12 text-base"
              onKeyPress={(e) => {
                if (e.key === "Enter" && e.currentTarget.value.trim()) {
                  navigate("/projects");
                }
              }}
            />
            <Button
              size="sm"
              onClick={() => navigate("/projects")}
              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="flex items-center justify-between mb-6">
              <TabsList>
                <TabsTrigger value="attachments">Вложения</TabsTrigger>
                <TabsTrigger value="chats">Чаты</TabsTrigger>
              </TabsList>
              <Button variant="ghost" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Инструкции
              </Button>
            </div>

            <TabsContent value="attachments" className="space-y-6">
              {/* Welcome Section */}
              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">Добро пожаловать</CardTitle>
                  <CardDescription className="max-w-md mx-auto">
                    Начни с прикрепления файлов к своей рабочей области. 
                    Они будут использоваться во всех разговорах в этой рабочей области.
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Button
                    variant="outline"
                    onClick={() => handleFileUpload("Новый файл.pdf")}
                    className="mx-auto"
                  >
                    <Paperclip className="h-4 w-4 mr-2" />
                    Прикрепить файл
                  </Button>
                </CardContent>
              </Card>

              {/* File Upload Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card 
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleFileUpload("Загруженный файл.docx")}
                >
                  <CardContent className="p-4 text-center">
                    <UploadIcon className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <div className="text-sm font-medium">Загрузить файл</div>
                  </CardContent>
                </Card>

                <Card 
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleFileUpload("Текстовый документ.txt")}
                >
                  <CardContent className="p-4 text-center">
                    <FileText className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <div className="text-sm font-medium">Добавить текст</div>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4 text-center">
                    <HardDrive className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <div className="text-sm font-medium">Присоединить google диск</div>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4 text-center">
                    <Clock className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <div className="text-sm font-medium">Последние файлы</div>
                  </CardContent>
                </Card>
              </div>

              {/* Uploaded Files */}
              {uploadedFiles.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Загруженные файлы</h3>
                  <div className="space-y-2">
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-card border rounded-lg">
                        <div className="p-2 bg-muted rounded">
                          <FileText className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-sm">{file}</div>
                        </div>
                        <Button variant="ghost" size="sm" className="text-muted-foreground">
                          ×
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleFileUpload("Еще один файл.pdf")}
                  >
                    <Paperclip className="h-4 w-4 mr-2" />
                    Прикрепить файл
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="chats" className="space-y-6">
              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">История чатов</CardTitle>
                  <CardDescription>
                    Здесь будут отображаться ваши разговоры в этом проекте
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground mb-4">
                    Пока нет активных чатов. Начните разговор выше.
                  </p>
                  <Button onClick={() => navigate("/projects")}>
                    Начать первый чат
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
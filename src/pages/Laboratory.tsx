import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Agents from "./lab/Agents";
import Data from "./lab/Data";
import Catalog from "./lab/Catalog";
import Monitoring from "./lab/Monitoring";
import Documentation from "./Documentation";

export default function Laboratory() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Лаборатория</h1>
          <p className="text-muted-foreground">Создание и управление AI агентами и моделями</p>
        </div>
      </div>

      <Tabs defaultValue="agents" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="agents">Агенты</TabsTrigger>
          <TabsTrigger value="data">ML-Студия</TabsTrigger>
          <TabsTrigger value="catalog">Каталог</TabsTrigger>
          <TabsTrigger value="monitoring">Мониторинг</TabsTrigger>
          <TabsTrigger value="docs">Документация</TabsTrigger>
        </TabsList>

        <TabsContent value="agents">
          <Agents />
        </TabsContent>

        <TabsContent value="data">
          <Data />
        </TabsContent>

        <TabsContent value="catalog">
          <Catalog />
        </TabsContent>

        <TabsContent value="monitoring">
          <Monitoring />
        </TabsContent>

        <TabsContent value="docs">
          <Documentation />
        </TabsContent>
      </Tabs>
    </div>
  );
}
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Agents from "./lab/Agents";
import Data from "./lab/Data";
export default function Laboratory() {
  return <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Лаборатория</h1>
          <p className="text-muted-foreground">Создание и управление AI агентами и моделями</p>
        </div>
      </div>

      <Tabs defaultValue="ml" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="ml">ML-Studio</TabsTrigger>
          <TabsTrigger value="agents">Agents-Studio</TabsTrigger>
        </TabsList>

        <TabsContent value="ml">
          <Data />
        </TabsContent>

        <TabsContent value="agents">
          <Agents />
        </TabsContent>
      </Tabs>
    </div>;
}
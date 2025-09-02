import { useState, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { 
  Workflow, 
  Settings, 
  X, 
  Play, 
  Link, 
  Database, 
  Cpu, 
  BarChart3, 
  Zap,
  Trash2,
  ArrowRight
} from 'lucide-react';

interface CanvasBlock {
  id: string;
  type: 'data-ingestion' | 'data-processing' | 'model-training' | 'evaluation' | 'deployment';
  name: string;
  position: { x: number; y: number };
  config: any;
  inputs: string[];
  outputs: string[];
}

interface Connection {
  id: string;
  from: string;
  to: string;
  fromOutput: string;
  toInput: string;
}

interface PipelineCanvasProps {
  blocks: any[];
}

export const PipelineCanvas = ({ blocks }: PipelineCanvasProps) => {
  const [canvasBlocks, setCanvasBlocks] = useState<CanvasBlock[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [selectedBlock, setSelectedBlock] = useState<CanvasBlock | null>(null);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [draggedBlock, setDraggedBlock] = useState<any>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const getBlockIcon = (type: string) => {
    switch (type) {
      case 'data-ingestion': return <Database className="h-4 w-4" />;
      case 'data-processing': return <Settings className="h-4 w-4" />;
      case 'model-training': return <Cpu className="h-4 w-4" />;
      case 'evaluation': return <BarChart3 className="h-4 w-4" />;
      case 'deployment': return <Zap className="h-4 w-4" />;
      default: return <Workflow className="h-4 w-4" />;
    }
  };

  const getBlockColor = (type: string) => {
    switch (type) {
      case 'data-ingestion': return 'border-blue-500 bg-blue-50 dark:bg-blue-950';
      case 'data-processing': return 'border-orange-500 bg-orange-50 dark:bg-orange-950';
      case 'model-training': return 'border-purple-500 bg-purple-50 dark:bg-purple-950';
      case 'evaluation': return 'border-green-500 bg-green-50 dark:bg-green-950';
      case 'deployment': return 'border-red-500 bg-red-50 dark:bg-red-950';
      default: return 'border-gray-500 bg-gray-50 dark:bg-gray-950';
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (!draggedBlock || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newBlock: CanvasBlock = {
      id: `block-${Date.now()}`,
      type: draggedBlock.type,
      name: draggedBlock.name,
      position: { x, y },
      config: {},
      inputs: draggedBlock.inputs,
      outputs: draggedBlock.outputs
    };

    setCanvasBlocks(prev => [...prev, newBlock]);
    setDraggedBlock(null);
  }, [draggedBlock]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleBlockClick = (block: CanvasBlock) => {
    setSelectedBlock(block);
    setIsConfigOpen(true);
  };

  const handleDeleteBlock = (blockId: string) => {
    setCanvasBlocks(prev => prev.filter(b => b.id !== blockId));
    setConnections(prev => prev.filter(c => c.from !== blockId && c.to !== blockId));
  };

  const updateBlockConfig = (config: any) => {
    if (!selectedBlock) return;
    
    setCanvasBlocks(prev => prev.map(block => 
      block.id === selectedBlock.id 
        ? { ...block, config }
        : block
    ));
  };

  const runPipeline = () => {
    // Simulate pipeline execution
    console.log('Running pipeline with blocks:', canvasBlocks);
    console.log('Connections:', connections);
  };

  return (
    <div className="h-full relative">
      <div 
        ref={canvasRef}
        className="w-full h-full border-2 border-dashed border-muted-foreground/30 rounded-lg bg-grid relative overflow-hidden"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        style={{
          backgroundImage: `
            radial-gradient(circle, hsl(var(--muted)) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }}
      >
        {canvasBlocks.length === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-2">
              <Workflow className="h-12 w-12 text-muted-foreground mx-auto" />
              <p className="text-muted-foreground">Перетащите блоки сюда для создания пайплайна</p>
            </div>
          </div>
        ) : (
          <>
            {/* Render blocks */}
            {canvasBlocks.map((block) => (
              <div
                key={block.id}
                className={`absolute cursor-pointer border-2 rounded-lg p-3 min-w-[150px] shadow-md hover:shadow-lg transition-all ${getBlockColor(block.type)}`}
                style={{
                  left: block.position.x,
                  top: block.position.y,
                  transform: 'translate(-50%, -50%)'
                }}
                onClick={() => handleBlockClick(block)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getBlockIcon(block.type)}
                    <span className="font-medium text-sm">{block.name}</span>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 w-6 p-0 hover:bg-red-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteBlock(block.id);
                    }}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
                
                <div className="space-y-1">
                  {block.inputs.length > 0 && (
                    <div className="text-xs text-muted-foreground">
                      Входы: {block.inputs.join(', ')}
                    </div>
                  )}
                  {block.outputs.length > 0 && (
                    <div className="text-xs text-muted-foreground">
                      Выходы: {block.outputs.join(', ')}
                    </div>
                  )}
                </div>

                {/* Connection points */}
                <div className="absolute -left-2 top-1/2 w-4 h-4 bg-blue-500 rounded-full transform -translate-y-1/2 border-2 border-white shadow"></div>
                <div className="absolute -right-2 top-1/2 w-4 h-4 bg-green-500 rounded-full transform -translate-y-1/2 border-2 border-white shadow"></div>
              </div>
            ))}

            {/* Run Pipeline Button */}
            {canvasBlocks.length > 0 && (
              <div className="absolute top-4 right-4">
                <Button onClick={runPipeline}>
                  <Play className="h-4 w-4 mr-2" />
                  Запустить пайплайн
                </Button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Block Configuration Modal */}
      {selectedBlock && (
        <Dialog open={isConfigOpen} onOpenChange={setIsConfigOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {getBlockIcon(selectedBlock.type)}
                Настройки: {selectedBlock.name}
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Название блока</Label>
                <Input 
                  value={selectedBlock.name} 
                  onChange={(e) => {
                    const updatedBlock = { ...selectedBlock, name: e.target.value };
                    setSelectedBlock(updatedBlock);
                    setCanvasBlocks(prev => prev.map(b => 
                      b.id === selectedBlock.id ? updatedBlock : b
                    ));
                  }}
                />
              </div>

              {selectedBlock.type === 'data-ingestion' && (
                <div className="space-y-2">
                  <Label>Источник данных</Label>
                  <Select 
                    value={selectedBlock.config.source} 
                    onValueChange={(value) => updateBlockConfig({ ...selectedBlock.config, source: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите источник" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="csv">CSV файл</SelectItem>
                      <SelectItem value="database">База данных</SelectItem>
                      <SelectItem value="api">API</SelectItem>
                      <SelectItem value="stream">Поток данных</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {selectedBlock.type === 'data-processing' && (
                <div className="space-y-2">
                  <Label>Тип обработки</Label>
                  <Select 
                    value={selectedBlock.config.processing} 
                    onValueChange={(value) => updateBlockConfig({ ...selectedBlock.config, processing: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите тип" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cleaning">Очистка данных</SelectItem>
                      <SelectItem value="transformation">Трансформация</SelectItem>
                      <SelectItem value="normalization">Нормализация</SelectItem>
                      <SelectItem value="feature-engineering">Feature Engineering</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {selectedBlock.type === 'model-training' && (
                <div className="space-y-2">
                  <Label>Алгоритм</Label>
                  <Select 
                    value={selectedBlock.config.algorithm} 
                    onValueChange={(value) => updateBlockConfig({ ...selectedBlock.config, algorithm: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите алгоритм" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="automl">AutoML</SelectItem>
                      <SelectItem value="linear">Линейная регрессия</SelectItem>
                      <SelectItem value="random-forest">Random Forest</SelectItem>
                      <SelectItem value="neural-network">Нейронная сеть</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="space-y-2">
                <Label>Описание</Label>
                <Textarea 
                  value={selectedBlock.config.description || ''} 
                  onChange={(e) => updateBlockConfig({ ...selectedBlock.config, description: e.target.value })}
                  placeholder="Описание блока..."
                  rows={3}
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsConfigOpen(false)}>
                  Закрыть
                </Button>
                <Button onClick={() => setIsConfigOpen(false)}>
                  Сохранить
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Bot, Zap, Settings, BarChart3 } from "lucide-react";

const OpenAISettings = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [model, setModel] = useState('gpt-4');
  const [autoResponse, setAutoResponse] = useState(false);
  const [systemPrompt, setSystemPrompt] = useState('Você é um assistente virtual especializado em atendimento ao cliente. Seja prestativo, educado e eficiente.');
  const { toast } = useToast();

  const handleConnect = () => {
    if (!apiKey.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, insira sua chave de API da OpenAI",
        variant: "destructive",
      });
      return;
    }

    setIsConnected(!isConnected);
    toast({
      title: isConnected ? "Desconectado" : "Conectado com sucesso!",
      description: isConnected 
        ? "OpenAI foi desconectada" 
        : "Integração com OpenAI ativada",
    });
  };

  const handleSaveSettings = () => {
    toast({
      title: "Configurações salvas",
      description: "Suas configurações da OpenAI foram atualizadas",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bot className="h-6 w-6" />
              <div>
                <CardTitle>OpenAI / ChatGPT</CardTitle>
                <CardDescription>
                  Configure a integração com OpenAI para respostas automáticas inteligentes
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant={isConnected ? "default" : "secondary"}>
                {isConnected ? "Conectado" : "Desconectado"}
              </Badge>
              <Button 
                onClick={handleConnect}
                variant={isConnected ? "destructive" : "default"}
              >
                {isConnected ? "Desconectar" : "Conectar"}
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="connection" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="connection">Conexão</TabsTrigger>
          <TabsTrigger value="models">Modelos</TabsTrigger>
          <TabsTrigger value="automation">Automação</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="connection" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configuração da API</CardTitle>
              <CardDescription>
                Configure sua chave de API da OpenAI
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="apiKey">Chave de API da OpenAI</Label>
                <Input
                  id="apiKey"
                  type="password"
                  placeholder="sk-..."
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
                <p className="text-sm text-muted-foreground">
                  Sua chave será armazenada de forma segura nos Supabase Secrets
                </p>
              </div>
              <Button onClick={handleSaveSettings} className="w-full">
                Salvar Configurações
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="models" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configuração de Modelos</CardTitle>
              <CardDescription>
                Escolha o modelo da OpenAI para suas automações
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="model">Modelo do ChatGPT</Label>
                <Select value={model} onValueChange={setModel}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o modelo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gpt-4">GPT-4 (Mais inteligente)</SelectItem>
                    <SelectItem value="gpt-4-turbo">GPT-4 Turbo (Balanceado)</SelectItem>
                    <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo (Mais rápido)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="systemPrompt">Prompt do Sistema</Label>
                <Textarea
                  id="systemPrompt"
                  placeholder="Defina como o assistente deve se comportar..."
                  value={systemPrompt}
                  onChange={(e) => setSystemPrompt(e.target.value)}
                  rows={4}
                />
              </div>
              <Button onClick={handleSaveSettings} className="w-full">
                Salvar Configurações
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="automation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Automação com IA</CardTitle>
              <CardDescription>
                Configure quando e como a IA deve responder automaticamente
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="auto-response" className="text-base">
                    Resposta Automática
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Ativar respostas automáticas do ChatGPT
                  </p>
                </div>
                <Switch
                  id="auto-response"
                  checked={autoResponse}
                  onCheckedChange={setAutoResponse}
                />
              </div>
              
              {autoResponse && (
                <div className="space-y-4 border-t pt-4">
                  <div className="space-y-2">
                    <Label>Configurações de Automação</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="delay" className="text-sm">Delay para resposta (segundos)</Label>
                        <Input id="delay" type="number" defaultValue="2" />
                      </div>
                      <div>
                        <Label htmlFor="confidence" className="text-sm">Nível de confiança mínimo</Label>
                        <Input id="confidence" type="number" defaultValue="80" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <Button onClick={handleSaveSettings} className="w-full">
                Salvar Automação
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Mensagens Hoje
                </CardTitle>
                <Bot className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.156</div>
                <p className="text-xs text-muted-foreground">
                  +20.1% desde ontem
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Taxa de Precisão
                </CardTitle>
                <Zap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">94.2%</div>
                <p className="text-xs text-muted-foreground">
                  +2.3% desde o mês passado
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Tokens Utilizados
                </CardTitle>
                <Settings className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">156.2k</div>
                <p className="text-xs text-muted-foreground">
                  De 250k disponíveis
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Tempo Médio
                </CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1.2s</div>
                <p className="text-xs text-muted-foreground">
                  Tempo de resposta
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Conversas Recentes com IA</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { client: "João Silva", message: "Preciso de informações sobre preços", response: "Enviado catálogo atualizado", time: "2 min" },
                  { client: "Maria Santos", message: "Como faço para cancelar?", response: "Explicado processo de cancelamento", time: "5 min" },
                  { client: "Pedro Costa", message: "Produto com defeito", response: "Direcionado para suporte técnico", time: "8 min" },
                ].map((conversation, index) => (
                  <div key={index} className="border-b pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{conversation.client}</p>
                        <p className="text-sm text-muted-foreground">{conversation.message}</p>
                        <p className="text-xs text-green-600">IA: {conversation.response}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">{conversation.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OpenAISettings;
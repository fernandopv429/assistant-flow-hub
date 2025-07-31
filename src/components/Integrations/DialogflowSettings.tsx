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
import { MessageSquare, Brain, Workflow, TrendingUp } from "lucide-react";

const DialogflowSettings = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [projectId, setProjectId] = useState('');
  const [serviceAccountKey, setServiceAccountKey] = useState('');
  const [language, setLanguage] = useState('pt-BR');
  const [autoIntent, setAutoIntent] = useState(false);
  const { toast } = useToast();

  const handleConnect = () => {
    if (!projectId.trim() || !serviceAccountKey.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, preencha o Project ID e a Service Account Key",
        variant: "destructive",
      });
      return;
    }

    setIsConnected(!isConnected);
    toast({
      title: isConnected ? "Desconectado" : "Conectado com sucesso!",
      description: isConnected 
        ? "Dialogflow foi desconectado" 
        : "Integração com Dialogflow ativada",
    });
  };

  const handleSaveSettings = () => {
    toast({
      title: "Configurações salvas",
      description: "Suas configurações do Dialogflow foram atualizadas",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-6 w-6" />
              <div>
                <CardTitle>Google Dialogflow</CardTitle>
                <CardDescription>
                  Configure a integração com Dialogflow para conversas inteligentes
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
          <TabsTrigger value="intents">Intents</TabsTrigger>
          <TabsTrigger value="automation">Automação</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="connection" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configuração do Google Cloud</CardTitle>
              <CardDescription>
                Configure sua conexão com o Dialogflow
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="projectId">Project ID do Google Cloud</Label>
                <Input
                  id="projectId"
                  placeholder="meu-projeto-dialogflow"
                  value={projectId}
                  onChange={(e) => setProjectId(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="serviceKey">Service Account Key (JSON)</Label>
                <Textarea
                  id="serviceKey"
                  placeholder='{"type": "service_account", "project_id": "..."}'
                  value={serviceAccountKey}
                  onChange={(e) => setServiceAccountKey(e.target.value)}
                  rows={4}
                />
                <p className="text-sm text-muted-foreground">
                  Cole aqui o conteúdo do arquivo JSON da Service Account
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="language">Idioma Padrão</Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o idioma" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                    <SelectItem value="en-US">Inglês (Estados Unidos)</SelectItem>
                    <SelectItem value="es-ES">Espanhol (Espanha)</SelectItem>
                    <SelectItem value="fr-FR">Francês (França)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleSaveSettings} className="w-full">
                Salvar Configurações
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="intents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gerenciar Intents</CardTitle>
              <CardDescription>
                Configure as intenções do seu agente Dialogflow
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="auto-intent" className="text-base">
                    Criação Automática de Intents
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Criar intents automaticamente baseado nas conversas
                  </p>
                </div>
                <Switch
                  id="auto-intent"
                  checked={autoIntent}
                  onCheckedChange={setAutoIntent}
                />
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Intents Configurados</h4>
                <div className="space-y-2">
                  {[
                    { name: "Saudação", phrases: 5, responses: 3, enabled: true },
                    { name: "Informações de Preço", phrases: 8, responses: 2, enabled: true },
                    { name: "Suporte Técnico", phrases: 12, responses: 4, enabled: true },
                    { name: "Cancelamento", phrases: 6, responses: 2, enabled: false },
                  ].map((intent, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{intent.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {intent.phrases} frases de treinamento • {intent.responses} respostas
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={intent.enabled ? "default" : "secondary"}>
                          {intent.enabled ? "Ativo" : "Inativo"}
                        </Badge>
                        <Button variant="outline" size="sm">
                          Editar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <Button className="w-full">
                  Adicionar Nova Intent
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="automation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Automação Dialogflow</CardTitle>
              <CardDescription>
                Configure quando e como o Dialogflow deve responder
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Fallback Inteligente</Label>
                    <p className="text-sm text-muted-foreground">
                      Usar OpenAI quando Dialogflow não encontrar intent
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Aprendizado Contínuo</Label>
                    <p className="text-sm text-muted-foreground">
                      Treinar automaticamente com novas conversas
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Transferência para Humano</Label>
                    <p className="text-sm text-muted-foreground">
                      Transferir para atendente quando necessário
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <div className="space-y-4 border-t pt-4">
                <h4 className="font-medium">Configurações Avançadas</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="confidence-threshold" className="text-sm">Threshold de Confiança</Label>
                    <Input id="confidence-threshold" type="number" defaultValue="0.8" step="0.1" />
                  </div>
                  <div>
                    <Label htmlFor="session-timeout" className="text-sm">Timeout da Sessão (min)</Label>
                    <Input id="session-timeout" type="number" defaultValue="30" />
                  </div>
                </div>
              </div>

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
                  Intents Detectados
                </CardTitle>
                <Brain className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1.284</div>
                <p className="text-xs text-muted-foreground">
                  +15% desde ontem
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Taxa de Acerto
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">89.7%</div>
                <p className="text-xs text-muted-foreground">
                  +3.2% desde o mês passado
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Fallbacks
                </CardTitle>
                <Workflow className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">142</div>
                <p className="text-xs text-muted-foreground">
                  -8% desde ontem
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Sessões Ativas
                </CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">23</div>
                <p className="text-xs text-muted-foreground">
                  Conversas em andamento
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Top Intents Hoje</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { intent: "Saudação", count: 456, confidence: "95%" },
                  { intent: "Informações de Preço", count: 324, confidence: "92%" },
                  { intent: "Suporte Técnico", count: 187, confidence: "88%" },
                  { intent: "Horário de Funcionamento", count: 156, confidence: "96%" },
                  { intent: "Cancelamento", count: 89, confidence: "85%" },
                ].map((item, index) => (
                  <div key={index} className="flex justify-between items-center border-b pb-2">
                    <div>
                      <p className="font-medium">{item.intent}</p>
                      <p className="text-sm text-muted-foreground">{item.count} detecções hoje</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{item.confidence}</p>
                      <p className="text-xs text-muted-foreground">confiança média</p>
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

export default DialogflowSettings;
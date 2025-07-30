import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, Bot, Clock, Send, Settings, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const WhatsAppSettings = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [autoResponse, setAutoResponse] = useState(true);
  const [businessHours, setBusinessHours] = useState(true);
  const { toast } = useToast();

  const [settings, setSettings] = useState({
    welcomeMessage: 'Olá! 👋 Sou o assistente virtual da empresa. Como posso ajudá-lo hoje?',
    autoResponseMessage: 'Obrigado pela sua mensagem! Vou analisar sua solicitação e responder em breve.',
    businessStart: '09:00',
    businessEnd: '18:00',
    outOfHoursMessage: 'Nosso horário de atendimento é das 9h às 18h. Sua mensagem será respondida no próximo dia útil.',
    apiToken: '',
    phoneNumber: '',
  });

  const handleSaveSettings = () => {
    toast({
      title: "Configurações salvas!",
      description: "As configurações do WhatsApp foram atualizadas.",
    });
  };

  const simulateConnection = () => {
    setIsConnected(!isConnected);
    toast({
      title: isConnected ? "WhatsApp desconectado" : "WhatsApp conectado!",
      description: isConnected ? "O bot foi desativado." : "O bot está ativo e respondendo mensagens.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Automação WhatsApp</h2>
          <p className="text-muted-foreground">Configure seu assistente virtual</p>
        </div>
        
        <div className="flex items-center gap-4">
          <Badge variant={isConnected ? "default" : "secondary"}>
            {isConnected ? "Conectado" : "Desconectado"}
          </Badge>
          <Button onClick={simulateConnection}>
            <MessageSquare className="w-4 h-4 mr-2" />
            {isConnected ? "Desconectar" : "Conectar"}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="connection" className="space-y-4">
        <TabsList>
          <TabsTrigger value="connection">Conexão</TabsTrigger>
          <TabsTrigger value="messages">Mensagens</TabsTrigger>
          <TabsTrigger value="automation">Automação</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="connection">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Configuração de Conexão
              </CardTitle>
              <CardDescription>
                Configure a conexão com a API do WhatsApp
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="phoneNumber">Número do WhatsApp Business</Label>
                <Input
                  id="phoneNumber"
                  placeholder="+55 11 99999-9999"
                  value={settings.phoneNumber}
                  onChange={(e) => setSettings({...settings, phoneNumber: e.target.value})}
                />
              </div>
              
              <div>
                <Label htmlFor="apiToken">Token da API</Label>
                <Input
                  id="apiToken"
                  type="password"
                  placeholder="Token da WhatsApp Business API"
                  value={settings.apiToken}
                  onChange={(e) => setSettings({...settings, apiToken: e.target.value})}
                />
              </div>

              <Button onClick={handleSaveSettings} className="w-full">
                Salvar Configurações
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="messages">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="w-5 h-5" />
                  Mensagens Automáticas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="welcomeMessage">Mensagem de Boas-vindas</Label>
                  <Textarea
                    id="welcomeMessage"
                    value={settings.welcomeMessage}
                    onChange={(e) => setSettings({...settings, welcomeMessage: e.target.value})}
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="autoResponseMessage">Resposta Automática</Label>
                  <Textarea
                    id="autoResponseMessage"
                    value={settings.autoResponseMessage}
                    onChange={(e) => setSettings({...settings, autoResponseMessage: e.target.value})}
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="outOfHoursMessage">Mensagem Fora do Horário</Label>
                  <Textarea
                    id="outOfHoursMessage"
                    value={settings.outOfHoursMessage}
                    onChange={(e) => setSettings({...settings, outOfHoursMessage: e.target.value})}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="automation">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Regras de Automação
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Resposta Automática</h4>
                    <p className="text-sm text-muted-foreground">
                      Enviar confirmação automática quando receber mensagens
                    </p>
                  </div>
                  <Switch checked={autoResponse} onCheckedChange={setAutoResponse} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Horário Comercial</h4>
                    <p className="text-sm text-muted-foreground">
                      Ativar mensagens diferentes fora do horário comercial
                    </p>
                  </div>
                  <Switch checked={businessHours} onCheckedChange={setBusinessHours} />
                </div>

                {businessHours && (
                  <div className="grid grid-cols-2 gap-4 p-4 border rounded-lg">
                    <div>
                      <Label htmlFor="businessStart">Início do Expediente</Label>
                      <Input
                        id="businessStart"
                        type="time"
                        value={settings.businessStart}
                        onChange={(e) => setSettings({...settings, businessStart: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="businessEnd">Fim do Expediente</Label>
                      <Input
                        id="businessEnd"
                        type="time"
                        value={settings.businessEnd}
                        onChange={(e) => setSettings({...settings, businessEnd: e.target.value})}
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="text-2xl font-bold">245</div>
                  <p className="text-xs text-muted-foreground">Mensagens Hoje</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="text-2xl font-bold">89%</div>
                  <p className="text-xs text-muted-foreground">Taxa de Resposta</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">Leads Gerados</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="text-2xl font-bold">2.5min</div>
                  <p className="text-xs text-muted-foreground">Tempo Médio</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Conversas Recentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "João Silva", message: "Gostaria de agendar uma consulta", time: "14:30", status: "novo" },
                    { name: "Maria Santos", message: "Qual o horário de funcionamento?", time: "14:15", status: "respondido" },
                    { name: "Pedro Costa", message: "Preciso cancelar meu agendamento", time: "13:45", status: "em_andamento" },
                  ].map((conversation, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium">{conversation.name}</div>
                        <div className="text-sm text-muted-foreground">{conversation.message}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">{conversation.time}</div>
                        <Badge variant={conversation.status === "novo" ? "default" : "secondary"}>
                          {conversation.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
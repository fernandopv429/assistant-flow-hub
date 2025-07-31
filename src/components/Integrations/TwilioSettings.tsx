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
import { MessageSquare, Phone, Settings, BarChart3, Zap } from "lucide-react";

const TwilioSettings = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [accountSid, setAccountSid] = useState('');
  const [authToken, setAuthToken] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [whatsappEnabled, setWhatsappEnabled] = useState(false);
  const [smsEnabled, setSmsEnabled] = useState(true);
  const [autoResponse, setAutoResponse] = useState(false);
  const [welcomeMessage, setWelcomeMessage] = useState('Olá! Bem-vindo ao nosso atendimento. Como posso ajudá-lo hoje?');
  const { toast } = useToast();

  const handleConnect = () => {
    if (!accountSid.trim() || !authToken.trim() || !phoneNumber.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios",
        variant: "destructive",
      });
      return;
    }

    setIsConnected(!isConnected);
    toast({
      title: isConnected ? "Desconectado" : "Conectado com sucesso!",
      description: isConnected 
        ? "Twilio foi desconectado" 
        : "Integração com Twilio ativada",
    });
  };

  const handleSaveSettings = () => {
    toast({
      title: "Configurações salvas",
      description: "Suas configurações do Twilio foram atualizadas",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-6 w-6 text-red-600" />
              <div>
                <CardTitle>Integração Twilio</CardTitle>
                <CardDescription>
                  Configure SMS e WhatsApp Business através do Twilio
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant={isConnected ? "default" : "secondary"}>
                {isConnected ? "Conectado" : "Desconectado"}
              </Badge>
              <Button onClick={handleConnect} variant={isConnected ? "destructive" : "default"}>
                {isConnected ? "Desconectar" : "Conectar"}
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="connection" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="connection">
            <Settings className="h-4 w-4 mr-2" />
            Conexão
          </TabsTrigger>
          <TabsTrigger value="services">
            <MessageSquare className="h-4 w-4 mr-2" />
            Serviços
          </TabsTrigger>
          <TabsTrigger value="automation">
            <Zap className="h-4 w-4 mr-2" />
            Automação
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <BarChart3 className="h-4 w-4 mr-2" />
            Análises
          </TabsTrigger>
        </TabsList>

        <TabsContent value="connection" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Credenciais do Twilio</CardTitle>
              <CardDescription>
                Configure suas credenciais da conta Twilio
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="accountSid">Account SID *</Label>
                <Input
                  id="accountSid"
                  type="text"
                  placeholder="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                  value={accountSid}
                  onChange={(e) => setAccountSid(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="authToken">Auth Token *</Label>
                <Input
                  id="authToken"
                  type="password"
                  placeholder="Seu token de autenticação"
                  value={authToken}
                  onChange={(e) => setAuthToken(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Número do Twilio *</Label>
                <Input
                  id="phoneNumber"
                  type="text"
                  placeholder="+5511999999999"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <Button onClick={handleSaveSettings} className="w-full">
                Salvar Credenciais
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Serviços Disponíveis</CardTitle>
              <CardDescription>
                Configure quais serviços do Twilio você deseja utilizar
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">SMS</Label>
                  <div className="text-sm text-muted-foreground">
                    Envio e recebimento de mensagens SMS
                  </div>
                </div>
                <Switch
                  checked={smsEnabled}
                  onCheckedChange={setSmsEnabled}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">WhatsApp Business</Label>
                  <div className="text-sm text-muted-foreground">
                    Integração com WhatsApp Business API
                  </div>
                </div>
                <Switch
                  checked={whatsappEnabled}
                  onCheckedChange={setWhatsappEnabled}
                />
              </div>

              <div className="space-y-4 pt-4 border-t">
                <h4 className="font-medium">Configurações de Mensagens</h4>
                <div className="space-y-2">
                  <Label htmlFor="welcomeMessage">Mensagem de Boas-vindas</Label>
                  <Textarea
                    id="welcomeMessage"
                    placeholder="Digite sua mensagem de boas-vindas..."
                    value={welcomeMessage}
                    onChange={(e) => setWelcomeMessage(e.target.value)}
                    rows={3}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="automation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Regras de Automação</CardTitle>
              <CardDescription>
                Configure automações para suas mensagens
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Resposta Automática</Label>
                  <div className="text-sm text-muted-foreground">
                    Enviar resposta automática para novas mensagens
                  </div>
                </div>
                <Switch
                  checked={autoResponse}
                  onCheckedChange={setAutoResponse}
                />
              </div>

              {autoResponse && (
                <div className="space-y-4 p-4 border rounded-lg">
                  <div className="space-y-2">
                    <Label>Palavras-chave para Acionamento</Label>
                    <Input placeholder="Ex: oi, olá, ajuda (separadas por vírgula)" />
                  </div>
                  <div className="space-y-2">
                    <Label>Horário de Funcionamento</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm">Início</Label>
                        <Input type="time" defaultValue="08:00" />
                      </div>
                      <div>
                        <Label className="text-sm">Fim</Label>
                        <Input type="time" defaultValue="18:00" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label>Webhook URL</Label>
                <Input 
                  placeholder="https://seusite.com/webhook/twilio"
                  className="font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground">
                  URL para receber notificações de mensagens
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">SMS Enviados</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,234</div>
                <p className="text-xs text-muted-foreground">+20% desde ontem</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">WhatsApp</CardTitle>
                <Phone className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">567</div>
                <p className="text-xs text-muted-foreground">+15% desde ontem</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Taxa de Entrega</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">98.5%</div>
                <p className="text-xs text-muted-foreground">+0.2% desde ontem</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Custos Hoje</CardTitle>
                <Settings className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ 45.67</div>
                <p className="text-xs text-muted-foreground">-5% desde ontem</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Mensagens Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { type: "SMS", number: "+5511999999999", message: "Olá! Gostaria de informações...", time: "14:30", status: "entregue" },
                  { type: "WhatsApp", number: "+5511888888888", message: "Bom dia! Preciso de ajuda com...", time: "14:15", status: "lido" },
                  { type: "SMS", number: "+5511777777777", message: "Obrigado pelo atendimento!", time: "13:45", status: "entregue" },
                ].map((msg, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Badge variant={msg.type === "SMS" ? "default" : "secondary"}>
                        {msg.type}
                      </Badge>
                      <div>
                        <p className="font-medium">{msg.number}</p>
                        <p className="text-sm text-muted-foreground truncate max-w-[300px]">{msg.message}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{msg.time}</p>
                      <Badge variant={msg.status === "lido" ? "default" : "secondary"} className="text-xs">
                        {msg.status}
                      </Badge>
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

export default TwilioSettings;
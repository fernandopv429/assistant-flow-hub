import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Header } from "@/components/Header";
import { Dashboard } from "@/components/Dashboard";
import { SchedulingForm } from "@/components/SchedulingForm";
import { LeadsManager } from "@/components/CRM/LeadsManager";
import { WhatsAppSettings } from "@/components/Automation/WhatsAppSettings";
import { CalendarManager } from "@/components/Calendar/CalendarManager";
import OpenAISettings from "@/components/Integrations/OpenAISettings";
import DialogflowSettings from "@/components/Integrations/DialogflowSettings";
import TwilioSettings from "@/components/Integrations/TwilioSettings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import heroImage from "@/assets/hero-dashboard.jpg";

type View = "dashboard" | "scheduling";

const Index = () => {
  const { user, loading, signInWithGoogle, signOut } = useAuth();
  const [currentView, setCurrentView] = useState<View>("dashboard");

  const handleSignIn = async () => {
    await signInWithGoogle();
  };

  const handleSignOut = async () => {
    await signOut();
    setCurrentView("dashboard");
  };

  const handleNewAppointment = () => {
    setCurrentView("scheduling");
  };

  const handleBackToDashboard = () => {
    setCurrentView("dashboard");
  };

  const handleScheduleAppointment = (appointment: any) => {
    console.log("Novo agendamento:", appointment);
    setCurrentView("dashboard");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-subtle">
        <Header user={user} onSignIn={handleSignIn} onSignOut={handleSignOut} />
        
        {/* Hero Landing Page */}
        <main className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold">
                  <span className="bg-gradient-primary bg-clip-text text-transparent">
                    Assistant Flow Hub
                  </span>
                </h1>
                <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
                  Seu assistente administrativo inteligente
                </h2>
                <p className="text-lg text-muted-foreground max-w-xl">
                  Automatize agendamentos, comunicações e atendimento ao cliente com IA integrada. 
                  Conecte-se ao Google Agenda, WhatsApp e Gmail em uma só plataforma.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handleSignIn}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-white bg-gradient-hero rounded-xl shadow-elegant hover:shadow-float transform hover:scale-105 transition-all duration-300"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Entrar com Google
                </button>
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="px-8 py-4 text-lg font-medium text-foreground border-2 border-border rounded-xl hover:bg-muted transition-colors duration-300">
                      Ver Demonstração
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold text-center">
                        Demonstração - Assistant Flow Hub
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6 p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <h3 className="text-xl font-semibold text-primary">🤖 Automação Inteligente</h3>
                          <ul className="space-y-2 text-muted-foreground">
                            <li>• Respostas automáticas via WhatsApp</li>
                            <li>• Agendamento inteligente com IA</li>
                            <li>• Classificação automática de leads</li>
                            <li>• Lembretes e follow-ups</li>
                          </ul>
                        </div>
                        
                        <div className="space-y-4">
                          <h3 className="text-xl font-semibold text-secondary">📊 CRM Completo</h3>
                          <ul className="space-y-2 text-muted-foreground">
                            <li>• Gestão completa de leads</li>
                            <li>• Pipeline de vendas visual</li>
                            <li>• Histórico de interações</li>
                            <li>• Relatórios e métricas</li>
                          </ul>
                        </div>
                        
                        <div className="space-y-4">
                          <h3 className="text-xl font-semibold text-accent">📅 Agenda Integrada</h3>
                          <ul className="space-y-2 text-muted-foreground">
                            <li>• Sincronização com Google Agenda</li>
                            <li>• Agendamento online automático</li>
                            <li>• Lembretes automáticos</li>
                            <li>• Gestão de disponibilidade</li>
                          </ul>
                        </div>
                        
                        <div className="space-y-4">
                          <h3 className="text-xl font-semibold text-success">💬 WhatsApp Business</h3>
                          <ul className="space-y-2 text-muted-foreground">
                            <li>• API oficial do WhatsApp</li>
                            <li>• Templates de mensagens</li>
                            <li>• Chatbot inteligente</li>
                            <li>• Integração com CRM</li>
                          </ul>
                        </div>
                      </div>
                      
                      <div className="bg-muted/30 rounded-lg p-6 text-center">
                        <h4 className="text-lg font-semibold mb-3">Pronto para começar?</h4>
                        <p className="text-muted-foreground mb-4">
                          Entre com sua conta Google e comece a automatizar seu atendimento hoje mesmo!
                        </p>
                        <button 
                          onClick={handleSignIn}
                          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-primary text-white rounded-lg hover:opacity-90 transition-opacity"
                        >
                          <svg className="w-4 h-4" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                          </svg>
                          Começar Agora
                        </button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">24/7</div>
                  <div className="text-sm text-muted-foreground">Automação IA</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary">99%</div>
                  <div className="text-sm text-muted-foreground">Precisão</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-success">500+</div>
                  <div className="text-sm text-muted-foreground">Clientes</div>
                </div>
              </div>
            </div>

            <div className="relative animate-slide-in">
              <div className="relative">
                <img 
                  src={heroImage} 
                  alt="Dashboard do Assistant Flow Hub" 
                  className="rounded-2xl shadow-float w-full"
                />
                <div className="absolute inset-0 bg-gradient-primary/10 rounded-2xl"></div>
              </div>
              
              {/* Floating Cards */}
              <div className="absolute -top-6 -left-6 bg-white rounded-xl p-4 shadow-elegant animate-float">
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 bg-success rounded-full"></div>
                  <span className="text-sm font-medium">8 reuniões hoje</span>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -right-6 bg-white rounded-xl p-4 shadow-elegant animate-float" style={{animationDelay: '1s'}}>
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 bg-primary rounded-full"></div>
                  <span className="text-sm font-medium">IA respondendo</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} onSignIn={handleSignIn} onSignOut={handleSignOut} />
      
      <main className="container mx-auto px-6 py-8">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-8">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="leads">Leads</TabsTrigger>
            <TabsTrigger value="calendario">Agenda</TabsTrigger>
            <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
            <TabsTrigger value="twilio">Twilio</TabsTrigger>
            <TabsTrigger value="openai">OpenAI</TabsTrigger>
            <TabsTrigger value="dialogflow">Dialogflow</TabsTrigger>
            <TabsTrigger value="agendamento">Agendar</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard">
            <Dashboard onNewAppointment={handleNewAppointment} />
          </TabsContent>
          
          <TabsContent value="leads">
            <LeadsManager />
          </TabsContent>
          
          <TabsContent value="calendario">
            <CalendarManager />
          </TabsContent>
          
          <TabsContent value="whatsapp">
            <WhatsAppSettings />
          </TabsContent>
          
          <TabsContent value="twilio">
            <TwilioSettings />
          </TabsContent>
          
          <TabsContent value="openai">
            <OpenAISettings />
          </TabsContent>
          
          <TabsContent value="dialogflow">
            <DialogflowSettings />
          </TabsContent>
          
          <TabsContent value="agendamento">
            <SchedulingForm 
              onBack={handleBackToDashboard}
              onSchedule={handleScheduleAppointment}
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;

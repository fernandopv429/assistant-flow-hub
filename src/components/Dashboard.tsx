import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Clock, TrendingUp, Plus, MessageSquare, Phone, Mail } from "lucide-react";

interface DashboardProps {
  onNewAppointment: () => void;
}

export const Dashboard = ({ onNewAppointment }: DashboardProps) => {
  const stats = [
    {
      title: "Agendamentos Hoje",
      value: "8",
      change: "+2 desde ontem",
      icon: Calendar,
      color: "text-primary"
    },
    {
      title: "Total de Clientes",
      value: "142",
      change: "+5 este mês",
      icon: Users,
      color: "text-secondary"
    },
    {
      title: "Reuniões Concluídas",
      value: "95%",
      change: "+12% desde ontem",
      icon: TrendingUp,
      color: "text-success"
    },
    {
      title: "Tempo Médio",
      value: "45min",
      change: "-5min desde ontem",
      icon: Clock,
      color: "text-warning"
    }
  ];

  const recentAppointments = [
    {
      id: 1,
      client: "Maria Silva",
      email: "maria@email.com",
      time: "09:00",
      type: "Consultoria",
      status: "confirmado"
    },
    {
      id: 2,
      client: "João Santos",
      email: "joao@email.com", 
      time: "10:30",
      type: "Reunião",
      status: "pendente"
    },
    {
      id: 3,
      client: "Ana Costa",
      email: "ana@email.com",
      time: "14:00",
      type: "Follow-up",
      status: "confirmado"
    }
  ];

  const quickActions = [
    { icon: Plus, label: "Novo Agendamento", action: onNewAppointment, variant: "hero" as const },
    { icon: MessageSquare, label: "WhatsApp", action: () => {}, variant: "outline" as const },
    { icon: Phone, label: "Ligação", action: () => {}, variant: "outline" as const },
    { icon: Mail, label: "E-mail", action: () => {}, variant: "outline" as const }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-hero p-8 text-white">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-2">Bem-vindo ao seu Assistant Flow Hub</h2>
          <p className="text-white/80 mb-6 max-w-2xl">
            Gerencie agendamentos, automatize comunicações e mantenha seus clientes sempre informados com IA integrada.
          </p>
          <div className="flex flex-wrap gap-3">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant={action.variant}
                onClick={action.action}
                className="gap-2"
              >
                <action.icon className="h-4 w-4" />
                {action.label}
              </Button>
            ))}
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32 animate-float"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-card transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Appointments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="hover:shadow-card transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Próximos Agendamentos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAppointments.map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                  <div className="flex-1">
                    <h4 className="font-medium">{appointment.client}</h4>
                    <p className="text-sm text-muted-foreground">{appointment.email}</p>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-sm font-medium">{appointment.time}</span>
                      <span className="text-sm text-muted-foreground">{appointment.type}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      appointment.status === 'confirmado' 
                        ? 'bg-success/10 text-success' 
                        : 'bg-warning/10 text-warning'
                    }`}>
                      {appointment.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-card transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-secondary" />
              Atividades Recentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <div className="h-2 w-2 rounded-full bg-primary mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm">WhatsApp enviado para Maria Silva</p>
                  <p className="text-xs text-muted-foreground">Lembrete de reunião • há 5 min</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <div className="h-2 w-2 rounded-full bg-secondary mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm">Evento criado no Google Agenda</p>
                  <p className="text-xs text-muted-foreground">Reunião com João Santos • há 12 min</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <div className="h-2 w-2 rounded-full bg-success mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm">E-mail de confirmação enviado</p>
                  <p className="text-xs text-muted-foreground">Para Ana Costa • há 25 min</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
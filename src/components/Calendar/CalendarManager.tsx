import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CalendarDays, Clock, Plus, Edit, Trash2, Video, MapPin, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, serverTimestamp, query, where, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { format, addDays, startOfDay, endOfDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface Appointment {
  id?: string;
  titulo: string;
  cliente: string;
  email: string;
  telefone?: string;
  data: Date;
  horario: string;
  duracao: number;
  tipo: 'presencial' | 'online' | 'telefone';
  local?: string;
  link?: string;
  observacoes?: string;
  status: 'agendado' | 'confirmado' | 'concluido' | 'cancelado';
  lembreteEnviado?: boolean;
  createdAt?: any;
}

export const CalendarManager = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState<Omit<Appointment, 'id'>>({
    titulo: '',
    cliente: '',
    email: '',
    telefone: '',
    data: new Date(),
    horario: '',
    duracao: 60,
    tipo: 'presencial',
    local: '',
    link: '',
    observacoes: '',
    status: 'agendado',
  });

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      const q = query(
        collection(db, 'appointments'),
        orderBy('data', 'asc')
      );
      const querySnapshot = await getDocs(q);
      const appointmentsData = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          data: data.data?.toDate() || new Date(),
        };
      }) as Appointment[];
      setAppointments(appointmentsData);
    } catch (error) {
      console.error('Erro ao carregar agendamentos:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const appointmentData = {
        ...formData,
        data: formData.data,
      };

      if (editingAppointment?.id) {
        await updateDoc(doc(db, 'appointments', editingAppointment.id), {
          ...appointmentData,
          updatedAt: serverTimestamp()
        });
        toast({
          title: "Agendamento atualizado!",
          description: "As informações foram atualizadas com sucesso.",
        });
      } else {
        await addDoc(collection(db, 'appointments'), {
          ...appointmentData,
          createdAt: serverTimestamp(),
          lembreteEnviado: false
        });
        toast({
          title: "Agendamento criado!",
          description: `Reunião agendada para ${format(formData.data, 'dd/MM/yyyy', { locale: ptBR })} às ${formData.horario}`,
        });
      }

      resetForm();
      loadAppointments();
    } catch (error) {
      console.error('Erro ao salvar agendamento:', error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao salvar o agendamento.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      titulo: '',
      cliente: '',
      email: '',
      telefone: '',
      data: selectedDate,
      horario: '',
      duracao: 60,
      tipo: 'presencial',
      local: '',
      link: '',
      observacoes: '',
      status: 'agendado',
    });
    setEditingAppointment(null);
    setDialogOpen(false);
  };

  const handleEdit = (appointment: Appointment) => {
    setEditingAppointment(appointment);
    setFormData({ ...appointment });
    setDialogOpen(true);
  };

  const handleDelete = async (appointmentId: string) => {
    if (!confirm('Tem certeza que deseja excluir este agendamento?')) return;

    try {
      await deleteDoc(doc(db, 'appointments', appointmentId));
      toast({
        title: "Agendamento excluído",
        description: "O agendamento foi removido do calendário.",
      });
      loadAppointments();
    } catch (error) {
      console.error('Erro ao excluir agendamento:', error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao excluir o agendamento.",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      agendado: 'default',
      confirmado: 'secondary',
      concluido: 'default',
      cancelado: 'destructive'
    } as const;

    return <Badge variant={variants[status as keyof typeof variants] || 'default'}>{status}</Badge>;
  };

  const getTypeIcon = (tipo: string) => {
    switch (tipo) {
      case 'online':
        return <Video className="w-4 h-4" />;
      case 'telefone':
        return <Clock className="w-4 h-4" />;
      default:
        return <MapPin className="w-4 h-4" />;
    }
  };

  const todayAppointments = appointments.filter(appointment => {
    const appointmentDate = new Date(appointment.data);
    const today = new Date();
    return appointmentDate.toDateString() === today.toDateString();
  });

  const selectedDateAppointments = appointments.filter(appointment => {
    const appointmentDate = new Date(appointment.data);
    return appointmentDate.toDateString() === selectedDate.toDateString();
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Gerenciamento de Agenda</h2>
          <p className="text-muted-foreground">Organize seus agendamentos e compromissos</p>
        </div>
        
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()}>
              <Plus className="w-4 h-4 mr-2" />
              Novo Agendamento
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingAppointment ? 'Editar Agendamento' : 'Novo Agendamento'}
              </DialogTitle>
              <DialogDescription>
                Preencha as informações do agendamento
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="titulo">Título *</Label>
                  <Input
                    id="titulo"
                    value={formData.titulo}
                    onChange={(e) => setFormData({...formData, titulo: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="cliente">Cliente *</Label>
                  <Input
                    id="cliente"
                    value={formData.cliente}
                    onChange={(e) => setFormData({...formData, cliente: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input
                    id="telefone"
                    value={formData.telefone || ''}
                    onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="horario">Horário *</Label>
                  <Input
                    id="horario"
                    type="time"
                    value={formData.horario}
                    onChange={(e) => setFormData({...formData, horario: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="duracao">Duração (min)</Label>
                  <Input
                    id="duracao"
                    type="number"
                    value={formData.duracao}
                    onChange={(e) => setFormData({...formData, duracao: parseInt(e.target.value)})}
                  />
                </div>
                <div>
                  <Label htmlFor="tipo">Tipo</Label>
                  <Select value={formData.tipo} onValueChange={(value: any) => setFormData({...formData, tipo: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="presencial">Presencial</SelectItem>
                      <SelectItem value="online">Online</SelectItem>
                      <SelectItem value="telefone">Telefone</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {formData.tipo === 'presencial' && (
                <div>
                  <Label htmlFor="local">Local</Label>
                  <Input
                    id="local"
                    value={formData.local || ''}
                    onChange={(e) => setFormData({...formData, local: e.target.value})}
                  />
                </div>
              )}

              {formData.tipo === 'online' && (
                <div>
                  <Label htmlFor="link">Link da Reunião</Label>
                  <Input
                    id="link"
                    value={formData.link || ''}
                    onChange={(e) => setFormData({...formData, link: e.target.value})}
                    placeholder="https://meet.google.com/..."
                  />
                </div>
              )}

              <div>
                <Label htmlFor="observacoes">Observações</Label>
                <Textarea
                  id="observacoes"
                  value={formData.observacoes || ''}
                  onChange={(e) => setFormData({...formData, observacoes: e.target.value})}
                  rows={3}
                />
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? 'Salvando...' : (editingAppointment ? 'Atualizar' : 'Criar Agendamento')}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarDays className="w-5 h-5" />
              Calendário
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        {/* Today's Appointments */}
        <Card>
          <CardHeader>
            <CardTitle>Hoje ({todayAppointments.length})</CardTitle>
            <CardDescription>
              {format(new Date(), 'dd/MM/yyyy', { locale: ptBR })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {todayAppointments.map((appointment) => (
                <div key={appointment.id} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(appointment.tipo)}
                      <span className="font-medium">{appointment.horario}</span>
                    </div>
                    {getStatusBadge(appointment.status)}
                  </div>
                  <div className="mt-1">
                    <div className="font-medium">{appointment.titulo}</div>
                    <div className="text-sm text-muted-foreground">{appointment.cliente}</div>
                  </div>
                </div>
              ))}
              {todayAppointments.length === 0 && (
                <p className="text-center text-muted-foreground py-4">
                  Nenhum agendamento para hoje
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Selected Date Appointments */}
      <Card>
        <CardHeader>
          <CardTitle>
            Agendamentos - {format(selectedDate, 'dd/MM/yyyy', { locale: ptBR })}
          </CardTitle>
          <CardDescription>
            {selectedDateAppointments.length} agendamento(s) encontrado(s)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Horário</TableHead>
                <TableHead>Título</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {selectedDateAppointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell className="font-medium">{appointment.horario}</TableCell>
                  <TableCell>{appointment.titulo}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{appointment.cliente}</div>
                      <div className="text-sm text-muted-foreground">{appointment.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getTypeIcon(appointment.tipo)}
                      {appointment.tipo}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(appointment.status)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEdit(appointment)}
                      >
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => appointment.id && handleDelete(appointment.id)}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {selectedDateAppointments.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    Nenhum agendamento encontrado para esta data.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
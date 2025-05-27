
import React, { useState } from 'react';
import DashboardHeader from '@/components/DashboardHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Plus, Clock, User, Trash2, Edit } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AgendaPage = () => {
  const [appointments, setAppointments] = useState([
    { id: 1, client: 'João Silva', date: '2024-01-20', time: '14:00', service: 'Consulta', status: 'Confirmado' },
    { id: 2, client: 'Maria Santos', date: '2024-01-21', time: '10:30', service: 'Reunião', status: 'Pendente' },
    { id: 3, client: 'Pedro Costa', date: '2024-01-22', time: '16:00', service: 'Apresentação', status: 'Confirmado' },
  ]);

  const [newAppointment, setNewAppointment] = useState({
    client: '',
    date: '',
    time: '',
    service: '',
    notes: ''
  });

  const handleAddAppointment = () => {
    if (newAppointment.client && newAppointment.date && newAppointment.time) {
      const appointment = {
        id: Date.now(),
        ...newAppointment,
        status: 'Pendente'
      };
      setAppointments([...appointments, appointment]);
      setNewAppointment({ client: '', date: '', time: '', service: '', notes: '' });
    }
  };

  const handleDeleteAppointment = (id: number) => {
    setAppointments(appointments.filter(apt => apt.id !== id));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader title="Agenda" />
      
      <main className="flex-1 p-6 bg-gray-50">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Gerenciamento de Agenda</h2>
          <p className="text-gray-600">Configure a IA para agendar compromissos automaticamente</p>
        </div>

        <Tabs defaultValue="calendar" className="w-full">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="calendar">Agenda</TabsTrigger>
            <TabsTrigger value="auto-config">Configuração Automática</TabsTrigger>
            <TabsTrigger value="rules">Regras de Horário</TabsTrigger>
          </TabsList>

          <TabsContent value="calendar" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Compromissos Agendados
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {appointments.map((appointment) => (
                        <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex-1">
                            <div className="flex items-center gap-4">
                              <div>
                                <h4 className="font-medium">{appointment.client}</h4>
                                <p className="text-sm text-gray-600">{appointment.service}</p>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Calendar className="h-4 w-4" />
                                {new Date(appointment.date).toLocaleDateString('pt-BR')}
                              </div>
                              <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Clock className="h-4 w-4" />
                                {appointment.time}
                              </div>
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                appointment.status === 'Confirmado' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {appointment.status}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleDeleteAppointment(appointment.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Plus className="h-5 w-5" />
                      Novo Compromisso
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="client">Cliente</Label>
                      <Input
                        id="client"
                        placeholder="Nome do cliente"
                        value={newAppointment.client}
                        onChange={(e) => setNewAppointment({...newAppointment, client: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="date">Data</Label>
                      <Input
                        id="date"
                        type="date"
                        value={newAppointment.date}
                        onChange={(e) => setNewAppointment({...newAppointment, date: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="time">Horário</Label>
                      <Input
                        id="time"
                        type="time"
                        value={newAppointment.time}
                        onChange={(e) => setNewAppointment({...newAppointment, time: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="service">Serviço</Label>
                      <Input
                        id="service"
                        placeholder="Tipo de serviço"
                        value={newAppointment.service}
                        onChange={(e) => setNewAppointment({...newAppointment, service: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="notes">Observações</Label>
                      <Textarea
                        id="notes"
                        placeholder="Observações adicionais"
                        value={newAppointment.notes}
                        onChange={(e) => setNewAppointment({...newAppointment, notes: e.target.value})}
                      />
                    </div>
                    <Button 
                      className="w-full bg-luxfy-purple hover:bg-luxfy-darkPurple"
                      onClick={handleAddAppointment}
                    >
                      Agendar Compromisso
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="auto-config" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configuração de Agendamento Automático</CardTitle>
                <CardDescription>Configure como a IA deve agendar compromissos automaticamente</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="auto-prompt">Prompt para Agendamento</Label>
                  <Textarea
                    id="auto-prompt"
                    className="min-h-[100px]"
                    placeholder="Instrua a IA sobre como deve proceder ao agendar compromissos..."
                    defaultValue="Quando um cliente solicitar um agendamento, verifique a disponibilidade e confirme os detalhes antes de agendar. Sempre pergunte sobre o tipo de serviço desejado."
                  />
                </div>
                <div>
                  <Label htmlFor="confirmation">Mensagem de Confirmação</Label>
                  <Textarea
                    id="confirmation"
                    placeholder="Mensagem enviada após agendamento..."
                    defaultValue="Seu agendamento foi confirmado para {data} às {horario}. Caso precise remarcar, entre em contato conosco."
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rules" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Regras de Horário por Cliente</CardTitle>
                <CardDescription>Configure horários específicos para diferentes clientes ou tipos de serviço</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  {[
                    { client: 'João Silva', days: 'Segunda a Sexta', hours: '09:00 - 17:00', type: 'VIP' },
                    { client: 'Clientes Gerais', days: 'Segunda a Sábado', hours: '08:00 - 18:00', type: 'Padrão' }
                  ].map((rule, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">{rule.client}</h4>
                        <p className="text-sm text-gray-600">{rule.days} • {rule.hours}</p>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">{rule.type}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">Editar</Button>
                        <Button variant="ghost" size="sm" className="text-red-500">Remover</Button>
                      </div>
                    </div>
                  ))}
                </div>
                <Button className="bg-luxfy-purple hover:bg-luxfy-darkPurple">
                  <Plus className="mr-2" size={16} /> Adicionar Nova Regra
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AgendaPage;

import { Injectable, signal } from '@angular/core';

export type TicketStatus = 'open' | 'in-progress' | 'resolved';
export type MessageSender = 'client' | 'technician';

export interface ChatMessage {
  sender: MessageSender;
  text: string;
  time: string;
}

export interface Ticket {
  id: string;
  name: string;
  email: string;
  subject: string;
  description?: string;
  status: TicketStatus;
  createdAt: string;
  messages: ChatMessage[];
}

export interface Account {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'technician';
}

const demoTickets: Ticket[] = [
  {
    id: 'CH-1048', name: 'Mariana Costa', email: 'mariana@email.com', subject: 'Internet lento no escritório',
    status: 'in-progress', createdAt: 'Hoje, 09:42',
    messages: [
      { sender: 'client', text: 'A internet está muito lenta desde o início da manhã. Já reiniciei o roteador.', time: '09:42' },
      { sender: 'technician', text: 'Oi, Mariana! Vou verificar a conexão do seu setor. Você consegue me dizer se acontece em todos os computadores?', time: '09:48' }
    ]
  },
  {
    id: 'CH-1047', name: 'Rafael Mendes', email: 'rafael@email.com', subject: 'Computador não liga',
    status: 'open', createdAt: 'Hoje, 08:16',
    messages: [{ sender: 'client', text: 'Meu computador não liga. A luz do gabinete acende, mas não aparece imagem.', time: '08:16' }]
  },
  {
    id: 'CH-1042', name: 'Beatriz Lima', email: 'beatriz@email.com', subject: 'Impressora sem conexão',
    status: 'resolved', createdAt: 'Ontem, 16:30',
    messages: [
      { sender: 'client', text: 'A impressora do financeiro aparece como offline.', time: '16:30' },
      { sender: 'technician', text: 'Reconfigurei a conexão de rede. Pode tentar imprimir novamente?', time: '16:44' },
      { sender: 'client', text: 'Funcionou, obrigada!', time: '16:51' }
    ]
  }
];

const demoAccounts: Account[] = [
  { name: 'Alex Técnico', email: 'tecnico@chamados.com', password: 'tecnico123', role: 'technician' },
  { name: 'Mariana Costa', email: 'cliente@chamados.com', password: 'cliente123', role: 'user' }
];

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly ticketsKey = 'chamados-tecnicos-tickets';
  private readonly accountsKey = 'chamados-tecnicos-accounts';
  private ticketsSignal = signal<Ticket[]>(this.readStorage(this.ticketsKey, demoTickets));
  private accountsSignal = signal<Account[]>(this.readStorage(this.accountsKey, demoAccounts));

  getTickets() { return this.ticketsSignal; }
  getAccounts() { return this.accountsSignal; }

  addTicket(ticket: Pick<Ticket, 'name' | 'email' | 'subject'> & { description?: string }) {
    const newTicket: Ticket = {
      ...ticket,
      id: `CH-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'open',
      createdAt: 'Agora',
      messages: [{ sender: 'client', text: ticket.description?.trim() || `Olá! Preciso de ajuda com: ${ticket.subject}.`, time: this.currentTime() }]
    };
    this.updateTickets([newTicket, ...this.ticketsSignal()]);
    return newTicket;
  }

  getTicketMessages(ticketId: string) {
    return this.ticketsSignal().find(ticket => ticket.id === ticketId)?.messages ?? [];
  }

  sendMessage(ticketId: string, sender: MessageSender, text: string) {
    const message = text.trim();
    if (!message) return;
    this.updateTickets(this.ticketsSignal().map(ticket => ticket.id === ticketId
      ? { ...ticket, messages: [...ticket.messages, { sender, text: message, time: this.currentTime() }] }
      : ticket));
  }

  updateTicketStatus(ticketId: string, status: TicketStatus) {
    this.updateTickets(this.ticketsSignal().map(ticket => ticket.id === ticketId ? { ...ticket, status } : ticket));
  }

  registerAccount(account: Account) {
    const accounts = [...this.accountsSignal(), account];
    this.accountsSignal.set(accounts);
    this.writeStorage(this.accountsKey, accounts);
  }

  private updateTickets(tickets: Ticket[]) {
    this.ticketsSignal.set(tickets);
    this.writeStorage(this.ticketsKey, tickets);
  }

  private currentTime() {
    return new Intl.DateTimeFormat('pt-BR', { hour: '2-digit', minute: '2-digit' }).format(new Date());
  }

  private readStorage<T>(key: string, fallback: T): T {
    try {
      const stored = localStorage.getItem(key);
      if (stored) return JSON.parse(stored) as T;
    } catch { /* Use the demo data when browser storage is unavailable or invalid. */ }
    return fallback;
  }

  private writeStorage(key: string, value: unknown) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* The app still works for this session. */ }
  }
}

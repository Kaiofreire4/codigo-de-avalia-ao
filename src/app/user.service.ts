import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface ChatMessage {
  sender: 'client' | 'technician';
  text: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private mockJsonUrl = 'mocks/tickets-mock.json';
  private ticketsSignal = signal<any[]>([]);

  // 1. Recriando a lousa mágica de contas que o seu login antigo usava
  private accountsSignal = signal<any[]>([]);

  //
  private chatSignal = signal<ChatMessage[]>([
    { sender: 'client', text: 'Hello, I need help with: slow internet' },
    { sender: 'technician', text: 'Hello! Your request has already been received by our technical team.' },
    { sender: 'technician', text: 'A support analyst is currently investigating the slowness on your network. Please wait..' }
  ]);

  constructor(private http: HttpClient) {
    this.loadInitialTickets();
    this.loadInitialAccounts();
  }
  private loadInitialTickets() {
    this.http.get<any[]>(this.mockJsonUrl).subscribe({
      next: (data) => {
        this.ticketsSignal.set(data);
      },
      error: (err) => console.error('Erro ao carregar mock de tickets:', err)
    });
  }
  private loadInitialAccounts() {
    this.http.get<any[]>(this.mockJsonUrl).subscribe({
      next: (data) => this.accountsSignal.set(data),
      error: (err) => console.error('Erro ao carregar contas:', err)
    });
  }

  getTickets() {
    return this.ticketsSignal;
  }
  addTicket(newTicket: any) {
    const currentTickets = this.ticketsSignal();
    this.ticketsSignal.set([newTicket, ...currentTickets]);
  }
  getAccounts() {
    return this.accountsSignal;
  }
  registerAccount(newAccount: any) {
    const currentAccounts = this.accountsSignal();
    this.accountsSignal.set([...currentAccounts, newAccount]);


    this.addTicket(newAccount);
  }

  getChatMessages() {
    return this.chatSignal;
  }

  sendMessage(sender: 'client' | 'technician', text: string) {
    const currentMessages = this.chatSignal();
    this.chatSignal.set([...currentMessages, { sender, text }]);
  }
}

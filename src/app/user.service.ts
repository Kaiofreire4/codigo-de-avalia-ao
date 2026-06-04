import { Injectable, signal } from '@angular/core';

export interface Account {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'technician';
}

export interface Ticket {
  name: string;
  email: string;
  subject: string;
  status: 'open' | 'in-progress' | 'closed';
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private accountsList = signal<Account[]>([

    { name: 'Tech Master', email: 'admin@tech.com', password: '12345', role: 'technician' }
  ]);

  private ticketsList = signal<Ticket[]>([]);

  getAccounts() {
    return this.accountsList;
  }

  registerAccount(account: Account) {
    this.accountsList.update(current => [...current, account]);
  }

  getTickets() {
    return this.ticketsList;
  }

  addTicket(ticket: Ticket) {
    this.ticketsList.update(current => [...current, ticket]);
  }
}

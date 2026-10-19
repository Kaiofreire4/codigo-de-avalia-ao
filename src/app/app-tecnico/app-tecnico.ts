import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { UserService, Ticket, TicketStatus } from '../user.service';

@Component({
  selector: 'app-tecnico',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, MatIconModule],
  templateUrl: './app-tecnico.html',
  styleUrl: './app-tecnico.scss'
})
export class AppTecnicoComponent {
  private userService = inject(UserService);
  tickets = this.userService.getTickets();
  search = signal('');
  activeFilter = signal<'all' | TicketStatus>('all');
  selectedTicketId = signal<string | null>(this.tickets()[0]?.id ?? null);
  reply = '';

  selectedTicket = computed(() => this.tickets().find(ticket => ticket.id === this.selectedTicketId()) ?? null);
  filteredTickets = computed(() => {
    const query = this.search().trim().toLocaleLowerCase('pt-BR');
    return this.tickets().filter(ticket => {
      const matchesFilter = this.activeFilter() === 'all' || ticket.status === this.activeFilter();
      const matchesQuery = !query || `${ticket.id} ${ticket.name} ${ticket.subject}`.toLocaleLowerCase('pt-BR').includes(query);
      return matchesFilter && matchesQuery;
    });
  });
  openCount = computed(() => this.tickets().filter(ticket => ticket.status === 'open').length);
  progressCount = computed(() => this.tickets().filter(ticket => ticket.status === 'in-progress').length);
  resolvedCount = computed(() => this.tickets().filter(ticket => ticket.status === 'resolved').length);

  selectTicket(ticket: Ticket) { this.selectedTicketId.set(ticket.id); }
  setFilter(filter: 'all' | TicketStatus) { this.activeFilter.set(filter); }
  statusLabel(status: TicketStatus) {
    return status === 'open' ? 'Aberto' : status === 'in-progress' ? 'Em andamento' : 'Resolvido';
  }
  sendReply() {
    const ticket = this.selectedTicket();
    if (!ticket || !this.reply.trim()) return;
    this.userService.sendMessage(ticket.id, 'technician', this.reply);
    this.reply = '';
    if (ticket.status === 'open') this.userService.updateTicketStatus(ticket.id, 'in-progress');
  }
  resolveTicket() {
    const ticket = this.selectedTicket();
    if (ticket) this.userService.updateTicketStatus(ticket.id, ticket.status === 'resolved' ? 'in-progress' : 'resolved');
  }
  trackById(_index: number, ticket: Ticket) { return ticket.id; }
}

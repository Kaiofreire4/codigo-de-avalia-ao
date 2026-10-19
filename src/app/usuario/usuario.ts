import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { UserService, Ticket, TicketStatus } from '../user.service';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, MatIconModule],
  templateUrl: './usuario.html',
  styleUrls: ['./usuario.scss', '../app-tecnico/app-tecnico.scss']
})
export class AppUsuarios {
  private userService = inject(UserService);
  tickets = this.userService.getTickets();
  selectedTicketId = signal<string | null>(this.tickets()[0]?.id ?? null);
  reply = '';
  selectedTicket = computed(() => this.tickets().find(ticket => ticket.id === this.selectedTicketId()) ?? null);
  openCount = computed(() => this.tickets().filter(ticket => ticket.status !== 'resolved').length);

  selectTicket(ticket: Ticket) { this.selectedTicketId.set(ticket.id); }
  statusLabel(status: TicketStatus) {
    return status === 'open' ? 'Aguardando atendimento' : status === 'in-progress' ? 'Em andamento' : 'Resolvido';
  }
  sendReply() {
    const ticket = this.selectedTicket();
    if (!ticket || !this.reply.trim()) return;
    this.userService.sendMessage(ticket.id, 'client', this.reply);
    this.reply = '';
  }
  trackById(_index: number, ticket: Ticket) { return ticket.id; }
}

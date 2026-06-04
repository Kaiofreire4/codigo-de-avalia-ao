import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { UserService } from '../user.service';

@Component({
  selector: 'app-app-tecnico',
  standalone: true,
  imports: [MatTableModule, RouterLink, NgIf, NgFor],
  templateUrl: './app-tecnico.html',
  styleUrl: './app-tecnico.scss'
})
export class AppTecnicoComponent {
  private userService = inject(UserService);

  dataSource = this.userService.getUsers();
  displayedColumns: string[] = ['name', 'subject', 'actions'];

  selectedTicket: any = null;
  chatHistory: string[] = [];

  selectTicket(ticket: any) {
    this.selectedTicket = ticket;
    this.chatHistory = [];
  }

  sendReply(message: string) {
    if (!message.trim()) return;
    this.chatHistory.push(message);
  }
}

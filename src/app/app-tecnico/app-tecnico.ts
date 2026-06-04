import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';


import { MatTableModule } from '@angular/material/table';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { UserService } from '../user.service';

@Component({
  selector: 'app-app-tecnico',
  standalone: true,

  imports: [
    MatTableModule,
    MatBadgeModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    RouterLink,
    NgIf,
    NgFor
  ],
  templateUrl: './app-tecnico.html',
  styleUrl: './app-tecnico.scss'
})
export class AppTecnicoComponent {
  private userService = inject(UserService);

  dataSource = this.userService.getUsers();
  displayedColumns: string[] = ['name', 'subject', 'actions'];

  selectedTicket: any = null;
  chatHistory: string[] = [];
  unreadCount = 0;

  selectTicket(ticket: any) {
    this.selectedTicket = ticket;
    this.chatHistory = [];
    this.unreadCount = 0;
  }

  sendReply(message: string) {
    if (!message.trim()) return;
    this.chatHistory.push(message);
    this.unreadCount++;
  }
}

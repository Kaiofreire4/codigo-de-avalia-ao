import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { UserService } from '../user.service';

@Component({
  selector: 'app-tecnico',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatBadgeModule
  ],
  templateUrl: './app-tecnico.html',
  styleUrls: ['./app-tecnico.scss']
})
export class AppTecnicoComponent {
  private userService = inject(UserService);

  displayedColumns: string[] = ['name', 'subject', 'actions'];
  dataSource = this.userService.getTickets();

  chatMessages = this.userService.getChatMessages();

  selectedTicket: any = null;
  unreadCount = 0;


  selectTicket(ticket: any) {
    this.selectedTicket = ticket;
    this.unreadCount = 0;
  }

  sendReply(message: string) {
    if (!message.trim()) return;


    this.userService.sendMessage('technician', message);
  }
}

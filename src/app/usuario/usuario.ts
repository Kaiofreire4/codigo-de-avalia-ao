import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { UserService } from '../user.service';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [
    RouterLink,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    CommonModule
  ],
  templateUrl: './usuario.html',
  styleUrls: ['./usuario.scss', '../app-tecnico/app-tecnico.scss']
})
export class AppUsuarios {
  private userService = inject(UserService);

  displayedColumns: string[] = ['name', 'email', 'subject'];
  dataSource = this.userService.getTickets();


  chatMessages = this.userService.getChatMessages();

  sendReply(message: string) {
    if (!message.trim()) return;
    this.userService.sendMessage('client', message);
  }
}

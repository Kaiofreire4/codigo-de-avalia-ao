import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../user.service';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-app-cadastro',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './app-cadastro.html',
  styleUrl: './app-cadastro.scss'
})
export class AppCadastro {
  private userService = inject(UserService);
  private router = inject(Router);

  name = '';
  email = '';
  subject = '';
  description = '';
  errorMessage = '';

  sendComplaint() {
    this.errorMessage = '';
    if (!this.name.trim() || !this.email.trim() || !this.subject.trim() || !this.description.trim()) {
      this.errorMessage = 'Preencha todos os campos para abrir o chamado.';
      return;
    }

    this.userService.addTicket({
      name: this.name.trim(),
      email: this.email.trim(),
      subject: this.subject.trim(),
      description: this.description.trim()
    });

    this.router.navigate(['/users']);
  }
}

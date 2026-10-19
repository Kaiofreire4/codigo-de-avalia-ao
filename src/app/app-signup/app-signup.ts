import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-app-signup',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule, MatIconModule],
  templateUrl: './app-signup.html',
  styleUrl: './app-signup.scss'
})
export class AppSignupComponent {
  private userService = inject(UserService);
  private router = inject(Router);

  name = '';
  email = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';
  role: 'user' | 'technician' = 'user';

  createAccount() {
    this.errorMessage = '';
    if (!this.name.trim() || !this.email.trim() || !this.password) {
      this.errorMessage = 'Preencha todos os campos para continuar.';
      return;
    }
    if (this.password.length < 6) {
      this.errorMessage = 'Sua senha precisa ter pelo menos 6 caracteres.';
      return;
    }
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'As senhas não coincidem.';
      return;
    }
    if (this.userService.getAccounts()().some(account => account.email.toLowerCase() === this.email.trim().toLowerCase())) {
      this.errorMessage = 'Este e-mail já possui uma conta.';
      return;
    }

    this.userService.registerAccount({
      name: this.name,
      email: this.email.trim(),
      password: this.password,
      role: this.role
    });

    this.router.navigate(['/login']);
  }
}

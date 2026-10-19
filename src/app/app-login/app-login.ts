import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../user.service';
@Component({
  selector: 'app-app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule, MatIconModule],
  templateUrl: './app-login.html',
  styleUrl: './app-login.scss'
})
export class AppLoginComponent {
  private userService = inject(UserService);
  private router = inject(Router);

  email = '';
  password = '';
  errorMessage = '';

  login() {
    this.errorMessage = '';
    if (!this.email.trim() || !this.password) {
      this.errorMessage = 'Preencha seu e-mail e sua senha para continuar.';
      return;
    }

    const accounts = this.userService.getAccounts()();

    const foundAccount = accounts.find(
      acc => acc.email.toLowerCase() === this.email.trim().toLowerCase() && acc.password === this.password
    );

    if (foundAccount) {
      if (foundAccount.role === 'technician') {
        this.router.navigate(['/technician']);
      } else {
        this.router.navigate(['/users']);
      }
    } else {
      this.errorMessage = 'E-mail ou senha incorretos. Confira os dados e tente novamente.';
    }
  }
}

import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './app-login.html',
  styleUrl: './app-login.scss'
})
export class AppLoginComponent {
  private router = inject(Router);

  email = '';
  password = '';

  login() {

    if (this.email === 'admin@tech.com' && this.password === '12345') {
      alert('Login successful! Welcome back.');
      this.router.navigate(['/technician']);
    } else {
      alert('Invalid email or password. Access denied.');
    }
  }
}

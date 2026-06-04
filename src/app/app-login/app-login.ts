import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from '../user.service';
@Component({
  selector: 'app-app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './app-login.html',
  styleUrl: './app-login.scss'
})
export class AppLoginComponent {
  private userService = inject(UserService);
  private router = inject(Router);

  email = '';
  password = '';

  login() {
    if (!this.email || !this.password) {
      alert('Please fill in all fields!');
      return;
    }

    const accounts = this.userService.getAccounts()();

    const foundAccount = accounts.find(
      acc => acc.email === this.email && acc.password === this.password
    );

    if (foundAccount) {
      alert(`Login successful! Welcome back, ${foundAccount.name}.`);

      if (foundAccount.role === 'technician') {
        this.router.navigate(['/technician']);
      } else {
        this.router.navigate(['/register']);
      }
    } else {
      alert('Invalid email or password. Access denied.');
    }
  }
}

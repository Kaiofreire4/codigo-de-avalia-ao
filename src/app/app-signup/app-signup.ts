import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from '../user.service';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-app-signup',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatRadioModule,
  ],
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
  role: 'user' | 'technician' = 'user';

  createAccount() {
    if (!this.name || !this.email || !this.password ) {
      alert('Please fill in all fields to register!');
      return;
    }

    this.userService.registerAccount({
      name: this.name,
      email: this.email,
      password: this.password,
      role: this.role
    });

    alert(`Account created successfully as ${this.role === 'technician' ? 'Technician' : 'User'}!`);
    this.router.navigate(['/login']);
  }
}

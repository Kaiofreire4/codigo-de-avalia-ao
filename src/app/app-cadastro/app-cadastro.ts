import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './app-cadastro.html',
  styleUrl: './app-cadastro.scss'
})
export class AppCadastro {
  name: string = '';
  email: string = '';
  phone: number = 0;
  password: number = 0;
  subject: string = '';


  private userService = inject(UserService);
  private router = inject(Router);

  save() {
    if (!this.name || !this.email || !this.subject) {
      alert('Please fill in all fields!');
      return;
    }


   this.userService.addUser({
      name: this.name,
      email: this.email,
      password: this.password,
      phone: this.phone,
      subject: this.subject,
      role: 'user'
    });

    alert('User registered successfully!');


    this.name = '';
    this.email = '';
    this.subject = '';


    this.router.navigate(['/users']);
  }
}

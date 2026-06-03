import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { UserService, User } from '../user.service'; // <-- Importando o User daqui


@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [RouterLink, MatTableModule],
  templateUrl: './usuario.html',
  styleUrl: './usuario.scss'
})
export class AppUsuarios {
  private userService = inject(UserService);

  displayedColumns: string[] = ['name', 'email', 'phone', 'password', 'subject'];


  dataSource = this.userService.getUsers();
}

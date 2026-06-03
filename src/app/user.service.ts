import { Injectable, signal } from '@angular/core';

export interface User {
  name: string;
  email: string;
  phone: number;
  password: number;
  subject: string;
  role: 'user' | 'technician';
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersSignal = signal<User[]>([]);

  getUsers() {
    return this.usersSignal;
  }

  addUser(user: User) {
    this.usersSignal.update(currentUsers => [...currentUsers, user]);
  }
}

import { Injectable, signal } from '@angular/core';

export interface User {
  name: string;
  email: string;
  subject: string;
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

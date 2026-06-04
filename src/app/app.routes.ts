import { Routes } from '@angular/router';
import { AppCadastro } from './app-cadastro/app-cadastro';
import { AppUsuarios } from './usuario/usuario';
import { AppTecnicoComponent } from './app-tecnico/app-tecnico';
import { AppLoginComponent } from './app-login/app-login';

export const routes: Routes = [
  { path: 'register', component: AppCadastro },
  { path: 'users', component: AppUsuarios },
  { path: 'login', component: AppLoginComponent },
  { path: 'technician', component: AppTecnicoComponent },
  { path: '', redirectTo: '/register', pathMatch: 'full' }
];

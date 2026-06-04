import { Routes } from '@angular/router';
import { AppCadastro } from './app-cadastro/app-cadastro';
import { AppUsuarios } from './usuario/usuario';
import { AppTecnicoComponent } from './app-tecnico/app-tecnico';
import { AppLoginComponent } from './app-login/app-login';
import { AppSignupComponent } from './app-signup/app-signup';

export const routes: Routes = [
  { path: 'login', component: AppLoginComponent },
  { path: 'signup', component: AppSignupComponent },
  { path: 'register', component: AppCadastro },
  { path: 'users', component: AppUsuarios },
  { path: 'technician', component: AppTecnicoComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

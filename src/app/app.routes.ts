import { Routes } from '@angular/router';
import { AppCadastro } from './app-cadastro/app-cadastro';
import { AppUsuarios } from './usuario/usuario';
import { AppTecnicoComponent } from './app-tecnico/app-tecnico';

export const routes: Routes = [
  { path: 'register', component: AppCadastro },
  { path: 'users', component: AppUsuarios },
  { path: 'technician', component: AppTecnicoComponent },
  { path: '', redirectTo: '/register', pathMatch: 'full' }
];

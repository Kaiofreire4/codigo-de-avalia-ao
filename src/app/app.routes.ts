import { Routes } from '@angular/router';
import { AppCadastro } from './app-cadastro/app-cadastro';
import { AppUsuarios } from './usuario/usuario';

export const routes: Routes = [
  { path: '', redirectTo: 'register', pathMatch: 'full' }, // Se entrar vazio, vai pro cadastro
  { path: 'register', component: AppCadastro },
  { path: 'users', component: AppUsuarios }
];

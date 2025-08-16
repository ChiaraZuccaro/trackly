import { Routes } from '@angular/router';
import { Dashboard } from '@pages/dashboard/dashboard';
import { Login } from '@pages/login/login';
import { Register } from '@pages/register/register';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'dashboard', component: Dashboard },
  { path: 'register', component: Register },
  { path: '**', redirectTo: '/login' }
];

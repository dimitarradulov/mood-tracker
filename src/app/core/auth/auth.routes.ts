import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth.component';

export const routes: Routes = [
  {
    path: 'login',
    component: AuthComponent,
    data: { authMode: 'login' },
  },
  {
    path: 'signup',
    component: AuthComponent,
    data: { authMode: 'signup' },
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

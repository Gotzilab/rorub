import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'customer',
    pathMatch: 'full',
  },
  {
    path: 'customer',
    loadComponent: () => import('./features/customer/customer').then((m) => m.CustomerComponent),
  },
];

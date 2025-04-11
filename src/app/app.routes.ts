import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'top',
    loadComponent: () => import('./pages/top/top.component').then((M) => M.TopComponent),
  },
  {
    path: '**',
    redirectTo: 'top',
    pathMatch: 'full',
  }
];

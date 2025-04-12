import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'top',
    loadComponent: () => import('./pages/top/top.component').then((M) => M.TopComponent),
  },
  {
    path: 'blog/:blogId',
    loadComponent: () => import('./pages/blog/blog.component').then((M) => M.BlogComponent),
  },
  {
    path: '**',
    redirectTo: 'top',
    pathMatch: 'full',
  }
];

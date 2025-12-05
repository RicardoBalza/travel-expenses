import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: '', 
    redirectTo: '', 
    pathMatch: 'full' 
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'app',
    loadChildren: () => import('./pages/pages.module').then(m => m.AppModule)
  },
  { 
    path: '', 
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
  },
  /* {
    path: '**',
    redirectTo: ''
  } */
];

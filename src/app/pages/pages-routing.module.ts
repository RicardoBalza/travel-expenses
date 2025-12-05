import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';

const routes: Routes = [
  { 
    path: '', 
    component: DashboardLayoutComponent,
    children: [
      { 
        path: 'dashboard', 
        loadComponent: () => import('./dashboard-main/dashboard-main.component').then(c => c.DashboardMainComponent)
      },
      {
        path: 'lists',
        loadComponent: () => import('./list-renditions/list-renditions.component').then(m => m.ListRenditionsComponent)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { ListsViewComponent } from './lists-view/lists-view.component';

const routes: Routes = [
  { 
    path: '', 
    component: DashboardLayoutComponent,
    children: [
      { 
        path: '', 
        loadComponent: () => import('./dashboard-main/dashboard-main.component').then(c => c.DashboardMainComponent)
      },
      { 
        path: 'lists', 
        component: ListsViewComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopbarComponent } from './topbar/topbar.component';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { ListsViewComponent } from './lists-view/lists-view.component';

@NgModule({
  declarations: [
    SidebarComponent,
    TopbarComponent,
    DashboardLayoutComponent,
    ListsViewComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }

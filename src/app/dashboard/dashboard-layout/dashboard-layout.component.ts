import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css'
})
export class DashboardLayoutComponent implements OnInit {
  sidebarCollapsed = false;
  isMobile = false;

  ngOnInit(): void {
    // Detectar si estamos en móvil al iniciar
    this.checkMobile();
    // Escuchar cambios de tamaño de ventana
    window.addEventListener('resize', () => this.checkMobile());
  }

  checkMobile(): void {
    this.isMobile = window.innerWidth <= 768;
    // Solo cambiar si es diferente al estado actual
    if (this.sidebarCollapsed !== this.isMobile) {
      this.sidebarCollapsed = this.isMobile;
    }
  }

  toggleSidebar(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  closeSidebar(): void {
    if (this.isMobile) {
      this.sidebarCollapsed = true;
    }
  }

  isSidebarOpen(): boolean {
    return !this.sidebarCollapsed && this.isMobile;
  }
}

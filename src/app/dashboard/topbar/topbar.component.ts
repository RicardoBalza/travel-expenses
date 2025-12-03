import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})
export class TopbarComponent {
  userMenuOpen = false;
  @Output() sidebarToggle = new EventEmitter<void>();

  constructor(private router: Router) {}

  toggleSidebar(): void {
    this.sidebarToggle.emit();
  }

  toggleUserMenu(): void {
    this.userMenuOpen = !this.userMenuOpen;
  }

  logout(): void {
    this.router.navigate(['/auth/login']);
  }
}

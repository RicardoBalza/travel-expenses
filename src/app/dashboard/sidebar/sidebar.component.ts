import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @Input() collapsed: boolean = false;
  activeSubmenu: string | null = null;

  toggleSubmenu(event: Event, submenu: string): void {
    event.preventDefault();
    this.activeSubmenu = this.activeSubmenu === submenu ? null : submenu;
  }

  openWishlist(): void {
    // TODO: Implement wishlist modal functionality
    console.log('Abriendo Caja de Deseos...');
  }
}

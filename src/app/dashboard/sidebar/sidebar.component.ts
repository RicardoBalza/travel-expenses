import { Component, Input } from '@angular/core';
import { AuthUser } from "../../Shared/Models/Login/loginDTO";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
  
export class SidebarComponent {
  @Input() collapsed: boolean = false;
  activeSubmenu: string | null = null;

  user: AuthUser = new AuthUser();
  acronym: string = "";

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('authUser') || '{}');
    this.acronym = this.getAcronym(this.user.fullName);
    if(this.user){
      console.log('Datos del usuario:', this.user);
    }else{
      console.log('No hay usuario');
    }
  }
  
  getAcronym(name: string): string {
    return name
    .trim()
    .split(/\s+/)              // separa por uno o más espacios
    .filter(w => w.length > 0) // evita strings vacíos
    .map(w => w[0])            // toma la primera letra
    .join('')                  // une las letras
    .toUpperCase();            // opcional: todo en mayúsculas
  }
  
  toggleSubmenu(event: Event, submenu: string): void {
    event.preventDefault();
    this.activeSubmenu = this.activeSubmenu === submenu ? null : submenu;
  }

  openWishlist(): void {
    // TODO: Implement wishlist modal functionality
    console.log('Abriendo Caja de Deseos...');
  }
}

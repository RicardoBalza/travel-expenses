import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUser } from "../../Shared/Models/Login/loginDTO";

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})
export class TopbarComponent {
  @Input() sidebarCollapsed: boolean = false;
  userMenuOpen = false;
  @Output() sidebarToggle = new EventEmitter<void>();

  constructor(private router: Router) {}
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

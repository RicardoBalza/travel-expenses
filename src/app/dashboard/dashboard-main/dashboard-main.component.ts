import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-main',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.css']
})
export class DashboardMainComponent implements OnInit {
  recentExpenses: any[] = [];
  categorySummary: any[] = [];

  ngOnInit(): void {
    this.loadRecentExpenses();
    this.loadCategorySummary();
  }

  loadRecentExpenses(): void {
    this.recentExpenses = [
      {
        date: '15/11/2024',
        concept: 'Hotel Marriott',
        category: 'Alojamiento',
        amount: '450.00',
        status: 'Aprobado',
        statusClass: 'badge-success'
      },
      {
        date: '14/11/2024',
        concept: 'Restaurante La Casa',
        category: 'Comidas',
        amount: '85.50',
        status: 'Pendiente',
        statusClass: 'badge-warning'
      },
      {
        date: '13/11/2024',
        concept: 'Taxi Aeropuerto',
        category: 'Transporte',
        amount: '35.00',
        status: 'Aprobado',
        statusClass: 'badge-success'
      },
      {
        date: '12/11/2024',
        concept: 'Material Oficina',
        category: 'Suministros',
        amount: '120.00',
        status: 'Rechazado',
        statusClass: 'badge-danger'
      }
    ];
  }

  loadCategorySummary(): void {
    this.categorySummary = [
      { name: 'Alojamiento', amount: '4,500', percentage: 36 },
      { name: 'Transporte', amount: '2,800', percentage: 22 },
      { name: 'Comidas', amount: '3,200', percentage: 26 },
      { name: 'Suministros', amount: '1,950', percentage: 16 }
    ];
  }
}

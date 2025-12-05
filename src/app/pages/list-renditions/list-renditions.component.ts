import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LiquidationService } from '../../services/liquidation.service';
import { LiquidationDto } from '../../Shared/Models/liquidationDto';

@Component({
  selector: 'app-list-renditions',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './list-renditions.component.html',
  styleUrl: './list-renditions.component.css'
})
export class ListRenditionsComponent implements OnInit {
  selectedSection: string = 'renditions';
  loading = false;
  error: string | null = null;
  
  sections = [
    { id: 'renditions', name: 'Rendiciones', icon: 'expenses' },
    { id: 'advances', name: 'Anticipos', icon: 'advances' }
  ];

  renditions: any[] = [];
  advances = [
    { 
      id: 1, 
      concept: 'Anticipo Viaje Buenos Aires', 
      date: '15/01/2024', 
      period: 'Enero 2024', 
      amount: 1500.00, 
      number: 'A-2024-001', 
      status: 'aprobado', 
      statusClass: 'badge-success' 
    },
    { 
      id: 2, 
      concept: 'Anticipo Evento Corporativo', 
      date: '14/01/2024', 
      period: 'Enero 2024', 
      amount: 500.00, 
      number: 'A-2024-002', 
      status: 'pendiente', 
      statusClass: 'badge-warning' 
    }
  ];

  constructor(private liquidationService: LiquidationService) {}

  ngOnInit(): void {
    this.loadRenditions();
  }

  loadRenditions(): void {
    this.loading = true;
    this.error = null;
    
    this.liquidationService.getLiquidations().subscribe({
      next: (data: LiquidationDto[]) => {
        console.log('Datos recibidos del servicio:', data);
        
        // Procesar expenses para renditions
        const allExpenses: any[] = [];
        data.forEach(liquidation => {
          liquidation.expenses?.forEach(expense => {
            allExpenses.push({
              id: expense.expenseId,
              concept: `${expense.description}`,
              date: this.formatDate(expense.expenseDate),
              period: this.formatPeriod(expense.expenseDate),
              amount: parseFloat(expense.totalAmount || '0'),
              number: `${liquidation.liquidationNumber}-E${expense.expenseId}`,
              status: expense.liquidationStatus,
              statusClass: this.getStatusClass('pending'),
              liquidationId: liquidation.liquidationId
            });
          });
        });
        
        // Procesar liquidations para anticipos
        const advancesData = data.map(liquidation => {
          const totalAmount = liquidation.expenses?.reduce((sum, expense) => 
            sum + parseFloat(expense.totalAmount || '0'), 0) || 0;
          
          const firstExpenseDate = liquidation.expenses?.[0]?.expenseDate || liquidation.liquidationDate;
          
          return {
            id: liquidation.liquidationId,
            concept: `${liquidation.liquidationNumber}`,
            date: this.formatDate(firstExpenseDate),
            period: this.formatPeriod(firstExpenseDate),
            amount: totalAmount,
            number: liquidation.liquidationNumber,
            status: "Pendiente",
            statusClass: this.getStatusClass("pending"),
            expenses: liquidation.expenses || []
          };
        });
        
        this.renditions = allExpenses;
        this.advances = advancesData;
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Error al cargar las liquidaciones:', err);
        this.error = 'Error al cargar las liquidaciones';
        this.loading = false;
        
        // Usar datos mock en caso de error
        this.renditions = [
          { 
            id: 1, 
            concept: 'Rendición Viaje Buenos Aires', 
            date: '15/01/2024', 
            period: 'Enero 2024', 
            amount: 1250.00, 
            number: 'R-2024-001', 
            status: 'aprobado', 
            statusClass: 'badge-success',
            expenses: []
          },
          { 
            id: 2, 
            concept: 'Rendición Gastos Representación', 
            date: '14/01/2024', 
            period: 'Enero 2024', 
            amount: 320.00, 
            number: 'R-2024-002', 
            status: 'pendiente', 
            statusClass: 'badge-warning',
            expenses: []
          }
        ];
        
        this.advances = [
          { 
            id: 1, 
            concept: 'Anticipo Viaje Buenos Aires', 
            date: '15/01/2024', 
            period: 'Enero 2024', 
            amount: 1500.00, 
            number: 'A-2024-001', 
            status: 'aprobado', 
            statusClass: 'badge-success' 
          },
          { 
            id: 2, 
            concept: 'Anticipo Evento Corporativo', 
            date: '14/01/2024', 
            period: 'Enero 2024', 
            amount: 500.00, 
            number: 'A-2024-002', 
            status: 'pendiente', 
            statusClass: 'badge-warning' 
          }
        ];
      }
    });
  }

  // Métodos de transformación
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-CL', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }

  formatPeriod(dateString: string): string {
    const date = new Date(dateString);
    const month = date.toLocaleDateString('es-CL', { month: 'long', year: 'numeric' });
    return month.charAt(0).toUpperCase() + month.slice(1);
  }

  getStatusText(status: string): string {
    switch(status) {
      case 'pending': return 'pendiente';
      case 'approved': return 'aprobado';
      case 'rejected': return 'rechazado';
      default: return status;
    }
  }

  getStatusClass(status: string): string {
    switch(status) {
      case 'pending': return 'badge-warning';
      case 'approved': return 'badge-success';
      case 'rejected': return 'badge-danger';
      default: return 'badge-secondary';
    }
  }

  selectSection(sectionId: string): void {
    this.selectedSection = sectionId;
  }

  getCurrentData(): any[] {
    switch (this.selectedSection) {
      case 'renditions': return this.renditions;
      case 'advances': return this.advances;
      default: return [];
    }
  }

  approveItem(id: number): void {
    console.log('Aprobando item:', id);
  }

  rejectItem(id: number): void {
    console.log('Rechazando item:', id);
  }

  viewDetails(id: number): void {
    console.log('Viendo detalles del item:', id);
  }

  downloadDocuments(id: number): void {
    console.log('Descargando documentos del item:', id);
  }

  goToDetail(id: number): void {
    console.log('Navegando a vista de detalle del item:', id);
  }
}

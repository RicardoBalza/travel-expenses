import { Component } from '@angular/core';

@Component({
  selector: 'app-lists-view',
  templateUrl: './lists-view.component.html',
  styleUrl: './lists-view.component.css'
})
export class ListsViewComponent {
  selectedSection: string = 'renditions';
  
  sections = [
    { id: 'renditions', name: 'Rendiciones', icon: 'expenses' },
    { id: 'advances', name: 'Anticipos', icon: 'advances' }
  ];

  renditions = [
    { 
      id: 1, 
      concept: 'Rendición Viaje Buenos Aires', 
      date: '15/01/2024', 
      period: 'Enero 2024', 
      amount: 1250.00, 
      number: 'R-2024-001', 
      status: 'aprobado', 
      statusClass: 'badge-success' 
    },
    { 
      id: 2, 
      concept: 'Rendición Gastos Representación', 
      date: '14/01/2024', 
      period: 'Enero 2024', 
      amount: 320.00, 
      number: 'R-2024-002', 
      status: 'pendiente', 
      statusClass: 'badge-warning' 
    },
    { 
      id: 3, 
      concept: 'Rendición Capacitación Técnica', 
      date: '13/01/2024', 
      period: 'Enero 2024', 
      amount: 850.00, 
      number: 'R-2024-003', 
      status: 'aprobado', 
      statusClass: 'badge-success' 
    },
    { 
      id: 4, 
      concept: 'Rendición Material Marketing', 
      date: '12/01/2024', 
      period: 'Enero 2024', 
      amount: 450.00, 
      number: 'R-2024-004', 
      status: 'rechazado', 
      statusClass: 'badge-danger' 
    },
    { 
      id: 5, 
      concept: 'Rendición Viaje São Paulo', 
      date: '11/01/2024', 
      period: 'Enero 2024', 
      amount: 2100.00, 
      number: 'R-2024-005', 
      status: 'pendiente', 
      statusClass: 'badge-warning' 
    }
  ];

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
    },
    { 
      id: 3, 
      concept: 'Anticipo Capacitación', 
      date: '13/01/2024', 
      period: 'Enero 2024', 
      amount: 1000.00, 
      number: 'A-2024-003', 
      status: 'aprobado', 
      statusClass: 'badge-success' 
    },
    { 
      id: 4, 
      concept: 'Anticipo Marketing', 
      date: '12/01/2024', 
      period: 'Enero 2024', 
      amount: 600.00, 
      number: 'A-2024-004', 
      status: 'pendiente', 
      statusClass: 'badge-warning' 
    },
    { 
      id: 5, 
      concept: 'Anticipo Viaje São Paulo', 
      date: '11/01/2024', 
      period: 'Enero 2024', 
      amount: 2500.00, 
      number: 'A-2024-005', 
      status: 'aprobado', 
      statusClass: 'badge-success' 
    }
  ];

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
    // TODO: Implementar navegación a vista de detalle
    // this.router.navigate(['/dashboard/detail', id]);
  }
}

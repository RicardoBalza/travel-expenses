import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Liquidation {
  id: number;
  concept: string;
  date: string;
  period: string;
  amount: number;
  number: string;
  status: string;
  statusClass: string;
}

@Injectable({
  providedIn: 'root'
})
export class LiquidationService {
  private apiUrl = 'http://localhost:3000/api/v1/liquidations';

  constructor(private http: HttpClient) {}

  getLiquidations(): Observable<any> {
    return this.http.get(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error en la llamada HTTP:', error);
        throw error;
      })
    );
  }

  mapLiquidation(item: any, type: string): Liquidation {
    return {
      id: item.id || Math.random(),
      concept: item.concept || item.concepto || 'Sin concepto',
      date: item.date || item.fecha || this.formatDate(new Date()),
      period: item.period || item.periodo || 'Período no especificado',
      amount: item.amount || item.importe || 0,
      number: item.number || item.numero || `${type === 'rendition' ? 'R' : 'A'}-${new Date().getFullYear()}-001`,
      status: item.status || item.estado || 'pendiente',
      statusClass: this.getStatusClass(item.status || item.estado || 'pendiente')
    };
  }

  getStatusClass(status: string): string {
    switch (status?.toLowerCase()) {
      case 'aprobado':
      case 'approved':
        return 'badge-success';
      case 'pendiente':
      case 'pending':
        return 'badge-warning';
      case 'rechazado':
      case 'rejected':
        return 'badge-danger';
      default:
        return 'badge-warning';
    }
  }

  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
}

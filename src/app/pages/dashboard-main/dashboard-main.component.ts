import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-main',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.css']
})
export class DashboardMainComponent implements OnInit, AfterViewInit {
  recentExpenses: any[] = [];
  categorySummary: any[] = [];

  ngOnInit(): void {
    this.loadRecentExpenses();
    this.loadCategorySummary();
  }

  ngAfterViewInit(): void {
    this.drawDonutChart();
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

  drawDonutChart(): void {
    const canvas = document.getElementById('expenseChart') as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const outerRadius = 70;
    const innerRadius = 40;

    const data = [
      { label: 'Transporte', value: 35, color: '#3A6BB5' },
      { label: 'Alojamiento', value: 25, color: '#28a745' },
      { label: 'Comidas', value: 20, color: '#ffc107' },
      { label: 'Otros', value: 20, color: '#dc3545' }
    ];

    let currentAngle = -Math.PI / 2;

    data.forEach(segment => {
      const sliceAngle = (segment.value / 100) * 2 * Math.PI;
      
      // Draw outer arc
      ctx.beginPath();
      ctx.arc(centerX, centerY, outerRadius, currentAngle, currentAngle + sliceAngle);
      // Draw inner arc (creates the donut hole)
      ctx.arc(centerX, centerY, innerRadius, currentAngle + sliceAngle, currentAngle, true);
      ctx.closePath();
      ctx.fillStyle = segment.color;
      ctx.fill();
      
      // Draw border
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      currentAngle += sliceAngle;
    });

    // Add center text
    ctx.fillStyle = '#2c3e50';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('100%', centerX, centerY - 5);
    
    ctx.font = '12px Arial';
    ctx.fillStyle = '#6c757d';
    ctx.fillText('Total', centerX, centerY + 10);
  }
}

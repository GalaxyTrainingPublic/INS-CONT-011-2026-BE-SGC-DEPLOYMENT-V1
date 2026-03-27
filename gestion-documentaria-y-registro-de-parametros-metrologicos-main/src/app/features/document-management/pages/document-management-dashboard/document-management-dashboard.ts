import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-document-management-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './document-management-dashboard.html',
  styleUrls: ['./document-management-dashboard.scss']
})
export class DocumentManagementDashboard {

   stats = [
    {
      title: 'Total de documentos',
      value: 250,
      color: 'bg-[#324795]'
    },
    {
      title: 'Documentos vigentes',
      value: 40,
      color: 'bg-[#4e3295]'
    },
    {
      title: 'Documentos por vencer',
      value: 10,
      color: 'bg-[#327995]'
    },
    {
      title: 'Documentos vencidos',
      value: 3,
      color: 'bg-[#958032]'
    }
  ];


  // Propiedad necesaria para el pipe | date del HTML
  today: Date = new Date();

  // Datos simulados para los indicadores (KPIs)
  stats2 = {
    total: 24,
    critical: 3,
    efficiency: 72,
    pendingActions: 12
  };
}

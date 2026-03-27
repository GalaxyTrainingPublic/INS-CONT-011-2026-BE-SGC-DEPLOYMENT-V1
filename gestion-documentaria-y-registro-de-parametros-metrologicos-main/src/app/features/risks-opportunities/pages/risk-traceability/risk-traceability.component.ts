import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatPaginator, MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

interface RiskLog {
  id: string;      // ID de la evidencia (Sello)
  riskId: number;  // ID del riesgo vinculado
  userCode: string;
  userName: string;
  labCode: string;
  date: Date;
  action: string;
  details: string;
  level: 'info' | 'advertencia' | 'éxito' | 'crítico';
}

/**
 * Función para traducir el paginador de Angular Material al español
 */
export function getEspanolPaginatorIntl() {
  const paginatorIntl = new MatPaginatorIntl();
  paginatorIntl.itemsPerPageLabel = 'Elementos por página:';
  paginatorIntl.nextPageLabel = 'Siguiente página';
  paginatorIntl.previousPageLabel = 'Página anterior';
  paginatorIntl.firstPageLabel = 'Primera página';
  paginatorIntl.lastPageLabel = 'Última página';
  paginatorIntl.getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
      return `0 de ${length}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ? 
      Math.min(startIndex + pageSize, length) : 
      startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} de ${length}`;
  };
  return paginatorIntl;
}

@Component({
  selector: 'app-risk-traceability',
  standalone: true,
  imports: [CommonModule, FormsModule, MatPaginatorModule, MatTableModule],
  providers: [
    { provide: MatPaginatorIntl, useFactory: getEspanolPaginatorIntl }
  ],
  templateUrl: './risk-traceability.page.html',
  styleUrls: ['./risk-traceability.page.scss']
})
export class RiskTraceabilityComponent implements OnInit, AfterViewInit {
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // Datos vinculados por riskId para evitar listas divorciadas
  allLogs: RiskLog[] = [
    { 
      id: 'TR-001', 
      riskId: 1, 
      userCode: 'AZ-28', 
      userName: 'Ana Rosa Zeppilli Diaz', 
      labCode: 'GC-CNSP', 
      date: new Date('2025-01-28T08:30:00'), 
      action: 'Elaboración', 
      details: 'Creación inicial del registro de riesgo.', 
      level: 'info' 
    },
    { 
      id: 'TR-002', 
      riskId: 1, 
      userCode: 'RE-05', 
      userName: 'Ricardo Manuel Espinoza', 
      labCode: 'MET-01', 
      date: new Date('2025-02-05T10:15:00'), 
      action: 'Revisión técnica', 
      details: 'Control de cambios en sección de impacto.', 
      level: 'advertencia' 
    },
    { 
      id: 'TR-003', 
      riskId: 2, 
      userCode: 'AT-07', 
      userName: 'Aida Taboada Saire', 
      labCode: 'REV-T', 
      date: new Date('2025-02-07T16:45:00'), 
      action: 'Validación Sgc', 
      details: 'Verificación de cumplimiento de requisitos Iso.', 
      level: 'éxito' 
    },
    { 
      id: 'TR-004', 
      riskId: 1, 
      userCode: 'ME-14', 
      userName: 'Máximo Manuel Espinoza Silva', 
      labCode: 'DIR-01', 
      date: new Date('2025-02-14T09:00:00'), 
      action: 'Oficialización', 
      details: 'Aprobación mediante Memorando n° 410-2025.', 
      level: 'crítico' 
    }
  ];

  dataSource = new MatTableDataSource<RiskLog>(this.allLogs);
  
  filter = {
    term: '',
    startDate: '',
    endDate: '',
    startTime: '00:00',
    endTime: '23:59'
  };

  ngOnInit(): void {
    this.dataSource.filterPredicate = (data: RiskLog, filterStr: string) => {
      const searchFilter = JSON.parse(filterStr);
      
      // Búsqueda por término (Responsable, Acción, Detalles o ID de Riesgo)
      const term = searchFilter.term.toLowerCase();
      const matchTerm = data.userName.toLowerCase().includes(term) || 
                        data.action.toLowerCase().includes(term) ||
                        data.details.toLowerCase().includes(term) ||
                        data.riskId.toString().includes(term);
      
      const logDate = new Date(data.date);
      const logTime = logDate.getHours().toString().padStart(2, '0') + ':' + 
                      logDate.getMinutes().toString().padStart(2, '0');

      const matchDate = (!searchFilter.startDate || logDate >= new Date(searchFilter.startDate)) &&
                        (!searchFilter.endDate || logDate <= new Date(searchFilter.endDate));
      
      const matchTime = logTime >= searchFilter.startTime && logTime <= searchFilter.endTime;

      return matchTerm && matchDate && matchTime;
    };
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilters() {
    this.dataSource.filter = JSON.stringify(this.filter);
    
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
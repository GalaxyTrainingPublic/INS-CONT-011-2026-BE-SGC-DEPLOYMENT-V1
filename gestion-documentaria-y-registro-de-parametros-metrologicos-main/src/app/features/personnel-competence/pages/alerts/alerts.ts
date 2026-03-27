import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatFormFieldModule, MatLabel } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from "@angular/material/paginator";
import { MatOption, MatSelect, MatSelectModule } from "@angular/material/select";
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

function getPaginatorEsIntl(): MatPaginatorIntl {
  const paginatorIntl = new MatPaginatorIntl();
  paginatorIntl.itemsPerPageLabel = 'Elementos por página:';
  paginatorIntl.nextPageLabel = 'Página siguiente';
  paginatorIntl.previousPageLabel = 'Página anterior';
  paginatorIntl.firstPageLabel = 'Primera página';
  paginatorIntl.lastPageLabel = 'Última página';
  paginatorIntl.getRangeLabel = (page: number, pageSize: number, length: number): string => {
    if (length === 0 || pageSize === 0) {
      return `0 de ${length}`;
    }

    const startIndex = page * pageSize;
    const endIndex = Math.min(startIndex + pageSize, length);
    return `${startIndex + 1} - ${endIndex} de ${length}`;
  };

  return paginatorIntl;
}


interface Alert {
  value: string;
  viewValue: string;
}
interface State {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-alerts',
  standalone: true,
  templateUrl: './alerts.html',
  providers: [
    { provide: MatPaginatorIntl, useValue: getPaginatorEsIntl() }
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatFormField,
    FormsModule,
    MatLabel,
    MatSelect,
    MatOption,
    MatPaginator,
    MatPaginatorModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatTooltipModule
]
})
export class Alerts implements AfterViewInit{
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  selectedAlert: string = 'all';
  selectedState: string = 'all';
  searchQuery: string = '';
  private searchDebounceTimer: ReturnType<typeof setTimeout> | null = null;
  showConfigModal = false;
  showDetailModal = false;
  selectedAlertDetail: any = null;
  showActionModal = false;
  actionModalTitle = '';
  actionModalMessage = '';
  actionModalIsConfirm = false;
  pendingAlertRow: any = null;

  newAlert = {
    type: 'Advertencia',
    message: '',
    status: 'Pendiente'
  };

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const searchTerms = JSON.parse(filter);

      const matchesSearch = (data.message || '').toLowerCase().includes(searchTerms.text.toLowerCase());

      const matchesAlert = searchTerms.alert === 'all' || data.type === searchTerms.alert;

      const matchesState = searchTerms.state === 'all' || data.status === searchTerms.state;

      return matchesSearch && matchesAlert && matchesState;
    };
  }

  status: State[] = [
    { value: 'pending', viewValue: 'Pendiente' },
    { value: 'resolved', viewValue: 'Atendido' }
  ];

  alerts: Alert[] = [
    { value: 'alert-0', viewValue: 'Crítica' },
    { value: 'alert-1', viewValue: 'Advertencia' },
    { value: 'alert-2', viewValue: 'Informativa' },
    { value: 'alert-3', viewValue: 'Urgente' },
    { value: 'alert-4', viewValue: 'Éxito' },
    { value: 'alert-5', viewValue: 'Error' },
    { value: 'alert-6', viewValue: 'Pendiente' },
    { value: 'alert-7', viewValue: 'Sugerencia' },
    { value: 'alert-8', viewValue: 'Seguridad' },
    { value: 'alert-9', viewValue: 'Mantenimiento' }
  ];

  displayedColumns: string[] = [
    'type',
    'message',
    'date',
    'status',
    'actions'
  ];

  dataSource = new MatTableDataSource ([
    { id: 1, type: 'Crítica', message: 'Evaluación vencida - Juan Pérez', date: '20/03/2026', status: 'Pendiente' },
    { id: 2, type: 'Advertencia', message: 'Personal sin capacitación - María López', date: '22/03/2026', status: 'Pendiente' },
    { id: 3, type: 'Informativa', message: 'Evaluación completada - Carlos Ruiz', date: '23/03/2026', status: 'Atendido' },
    { id: 4, type: 'Urgente', message: 'Falta firma en contrato - Ana Torres', date: '24/03/2026', status: 'Pendiente' },
    { id: 5, type: 'Error', message: 'Error en carga de archivo - Roberto Gómez', date: '25/03/2026', status: 'Atendido' },
    { id: 6, type: 'Crítica', message: 'Acceso denegado a servidor - Lucía Méndez', date: '25/03/2026', status: 'Pendiente' },
    { id: 7, type: 'Advertencia', message: 'Documento por expirar - Ricardo Salas', date: '26/03/2026', status: 'Pendiente' },
    { id: 8, type: 'Éxito', message: 'Copia de seguridad realizada - Elena Espinoza', date: '26/03/2026', status: 'Atendido' },
    { id: 9, type: 'Informativa', message: 'Nuevo ingreso registrado - Fernando Castro', date: '27/03/2026', status: 'Atendido' },
    { id: 10, type: 'Urgente', message: 'Revisión técnica requerida - Gabriela Rivas', date: '27/03/2026', status: 'Pendiente' },
    { id: 11, type: 'Mantenimiento', message: 'Actualización de sistema programada', date: '28/03/2026', status: 'Pendiente' },
    { id: 12, type: 'Crítica', message: 'Baja de personal no procesada - Hugo Paredes', date: '28/03/2026', status: 'Pendiente' },
    { id: 13, type: 'Seguridad', message: 'Intento de login fallido - Isabel Ortega', date: '29/03/2026', status: 'Atendido' },
    { id: 14, type: 'Sugerencia', message: 'Optimizar perfiles de puesto - Javier Luna', date: '29/03/2026', status: 'Pendiente' },
    { id: 15, type: 'Advertencia', message: 'Presupuesto anual al 90% - Karla Benítez', date: '30/03/2026', status: 'Atendido' },
    { id: 16, type: 'Error', message: 'Sincronización fallida con nube - Luis Navarro', date: '30/03/2026', status: 'Pendiente' },
    { id: 17, type: 'Éxito', message: 'Auditoría aprobada sin hallazgos', date: '31/03/2026', status: 'Atendido' },
    { id: 18, type: 'Informativa', message: 'Cambio de horario de verano - Mónica Herrera', date: '31/03/2026', status: 'Atendido' },
    { id: 19, type: 'Pendiente', message: 'Aprobación de vacaciones - Oscar Vargas', date: '01/04/2026', status: 'Pendiente' },
    { id: 20, type: 'Crítica', message: 'Fuga de datos detectada - Patricia Solís', date: '01/04/2026', status: 'Pendiente' }
  ]);




  viewAlert(row: any) {
    this.selectedAlertDetail = row;
    this.showDetailModal = true;
  }

  resolveAlert(row: any) {
    if (row.status === 'Atendido') {
      this.openInfoModal('Información', 'Esta alerta ya fue atendida.');
      return;
    }
    this.pendingAlertRow = row;
    this.actionModalTitle = 'Confirmar atención';
    this.actionModalMessage = `¿Estás seguro de que deseas marcar esta alerta como atendida?\nEsta acción no se puede deshacer.\n\n"${row.message}"`;
    this.actionModalIsConfirm = true;
    this.showActionModal = true;
  }

  applyFilter(event: Event) {
    this.searchQuery = (event.target as HTMLInputElement).value;
    if (this.searchDebounceTimer) clearTimeout(this.searchDebounceTimer);
    this.searchDebounceTimer = setTimeout(() => {
      this.syncFilters();
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }, 250);
  }

  applySelectAlert(){
    this.syncFilters();
  }
  applySelectEstatus(){
    this.syncFilters();
  }

  syncFilters() {
    const filterValues = {
      text: this.searchQuery,
      alert: this.selectedAlert,
      state: this.selectedState
    };
    this.dataSource.filter = JSON.stringify(filterValues);

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  resetFilters() {
    this.selectedAlert = 'all';
    this.selectedState = 'all';
    this.searchQuery = '';
    if (this.searchDebounceTimer) {
      clearTimeout(this.searchDebounceTimer);
      this.searchDebounceTimer = null;
    }
    this.syncFilters();
  }

  createNewAlert() {
    this.newAlert = {
      type: 'Advertencia',
      message: '',
      status: 'Pendiente'
    };
    this.showConfigModal = true;
  }

  confirmCreateAlert() {
    if (!this.newAlert.message.trim()) {
      this.openInfoModal('Validación', 'El mensaje es obligatorio.');
      return;
    }

    const date = new Intl.DateTimeFormat('es-PE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(new Date());

    const current = this.dataSource.data as any[];
    const newRow = {
      id: Date.now(),
      type: this.newAlert.type,
      message: this.newAlert.message.trim(),
      date,
      status: this.newAlert.status
    };

    this.dataSource.data = [newRow, ...current];
    if (this.dataSource.paginator) this.dataSource.paginator.firstPage();
    this.showConfigModal = false;
  }

  cancelCreateAlert() {
    this.showConfigModal = false;
  }

  closeDetailModal() {
    this.showDetailModal = false;
    this.selectedAlertDetail = null;
  }

  confirmActionModal() {
    if (this.actionModalIsConfirm && this.pendingAlertRow) {
      const updated = (this.dataSource.data as any[]).map((item) =>
        item.id === this.pendingAlertRow.id ? { ...item, status: 'Atendido' } : item
      );
      this.dataSource.data = updated;
      this.pendingAlertRow = null;
      this.closeActionModal();
      this.openInfoModal('Éxito', 'La alerta fue marcada como atendida.');
      return;
    }

    this.closeActionModal();
  }

  closeActionModal() {
    this.showActionModal = false;
    this.actionModalIsConfirm = false;
    this.actionModalTitle = '';
    this.actionModalMessage = '';
  }

  private openInfoModal(title: string, message: string) {
    this.actionModalTitle = title;
    this.actionModalMessage = message;
    this.actionModalIsConfirm = false;
    this.showActionModal = true;
  }


}

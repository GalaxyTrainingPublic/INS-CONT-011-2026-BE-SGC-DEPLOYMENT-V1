import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
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
    if (length === 0 || pageSize === 0) return `0 de ${length}`;
    const startIndex = page * pageSize;
    const endIndex = Math.min(startIndex + pageSize, length);
    return `${startIndex + 1} - ${endIndex} de ${length}`;
  };
  return paginatorIntl;
}

@Component({
  selector: 'app-authorization',
  standalone: true,
  templateUrl: './authorization.html',
  providers: [{ provide: MatPaginatorIntl, useValue: getPaginatorEsIntl() }],
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSelectModule,
    MatTooltipModule
  ]
})
export class Authorization implements AfterViewInit {

  displayedColumns: string[] = [
    'request',
    'person',
    'score',
    'recordCode',
    'date',
    'status',
    'actions'
  ];

  searchQuery: string = '';
  selectedStatus = 'all';
  statusOptions: string[] = ['Pendiente', 'Aprobado', 'Rechazado'];
  private searchDebounceTimer: ReturnType<typeof setTimeout> | null = null;
  showCreateModal = false;
  showInfoModal = false;
  showActionModal = false;
  infoTitle = '';
  infoMessage = '';
  actionModalTitle = '';
  actionModalMessage = '';
  actionModalConfirmText = 'Confirmar';
  pendingRequestRow: any = null;
  pendingActionType: 'approve' | 'reject' | null = null;
  newRequest = {
    request: '',
    person: '',
    laboratory: 'Laboratorio de Salud Pública (CNSP)',
    score: 60,
    recordCode: 'FOR-CNSP-221',
    date: '',
    status: 'Pendiente'
  };

  dataSource = new MatTableDataSource([
    {
      id: 1,
      request: 'Evaluación de competencias',
      person: 'Juan Pérez',
      laboratory: 'Laboratorio de Salud Pública (CNSP)',
      score: 82,
      recordCode: 'FOR-CNSP-221',
      date: '20/03/2026',
      status: 'Pendiente'
    },
    {
      id: 2,
      request: 'Capacitación ISO 9001',
      person: 'María López',
      laboratory: 'Laboratorio de Alimentación y Nutrición (CENAN)',
      score: 74,
      recordCode: 'FOR-CNSP-016',
      date: '18/03/2026',
      status: 'Aprobado'
    },
    {
      id: 3,
      request: 'Reevaluación',
      person: 'Carlos Ruiz',
      laboratory: 'Laboratorio de Control de Calidad (CNCC)',
      score: 52,
      recordCode: 'FOR-CNSP-221',
      date: '22/03/2026',
      status: 'Rechazado'
    }
  ]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const parsed = JSON.parse(filter || '{}');
      const value = (parsed.search ?? '').toLowerCase();
      const status = parsed.status ?? 'all';
      const matchesSearch = data.request.toLowerCase().includes(value)
        || data.person.toLowerCase().includes(value)
        || data.status.toLowerCase().includes(value);
      const matchesStatus = status === 'all' || data.status === status;
      return matchesSearch && matchesStatus;
    };
    this.applyCombinedFilter();
  }

  applyFilter(event: Event) {
    this.searchQuery = (event.target as HTMLInputElement).value;
    if (this.searchDebounceTimer) clearTimeout(this.searchDebounceTimer);
    this.searchDebounceTimer = setTimeout(() => {
      this.applyCombinedFilter();
    }, 250);
  }

  syncFilters() {
    this.applyCombinedFilter();
  }

  resetFilters() {
    this.searchQuery = '';
    this.selectedStatus = 'all';
    if (this.searchDebounceTimer) {
      clearTimeout(this.searchDebounceTimer);
      this.searchDebounceTimer = null;
    }
    this.applyCombinedFilter();
  }

  approve(row: any) {
    if (Number(row.score) < 60) {
      this.openInfoModal('No autorizado', `No se puede autorizar a ${row.person}: puntaje menor al 60%.`);
      return;
    }
    this.pendingRequestRow = row;
    this.pendingActionType = 'approve';
    this.actionModalTitle = 'Confirmar aprobación';
    this.actionModalMessage = `¿Estás seguro de que deseas aprobar esta solicitud?\nEsta acción no se puede deshacer.\n\n"${row.request}" - ${row.person}`;
    this.actionModalConfirmText = 'Sí, aprobar';
    this.showActionModal = true;
  }

  reject(row: any) {
    this.pendingRequestRow = row;
    this.pendingActionType = 'reject';
    this.actionModalTitle = 'Confirmar rechazo';
    this.actionModalMessage = `¿Estás seguro de que deseas rechazar esta solicitud?\nEsta acción no se puede deshacer.\n\n"${row.request}" - ${row.person}`;
    this.actionModalConfirmText = 'Sí, rechazar';
    this.showActionModal = true;
  }

  confirmActionModal() {
    if (!this.pendingRequestRow || !this.pendingActionType) {
      this.closeActionModal();
      return;
    }

    const nextStatus = this.pendingActionType === 'approve' ? 'Aprobado' : 'Rechazado';
    const updated = (this.dataSource.data as any[]).map((item) =>
      item.id === this.pendingRequestRow.id ? { ...item, status: nextStatus } : item
    );
    this.dataSource.data = updated;

    const actionText = this.pendingActionType === 'approve' ? 'aprobada' : 'rechazada';
    const requestName = this.pendingRequestRow.request;
    this.closeActionModal();
    this.openInfoModal('Solicitud actualizada', `Solicitud ${actionText}: ${requestName}`);
  }

  closeActionModal() {
    this.showActionModal = false;
    this.pendingRequestRow = null;
    this.pendingActionType = null;
    this.actionModalTitle = '';
    this.actionModalMessage = '';
    this.actionModalConfirmText = 'Confirmar';
  }

  createRequest() {
    this.newRequest = {
      request: '',
      person: '',
      laboratory: 'Laboratorio de Salud Pública (CNSP)',
      score: 60,
      recordCode: 'FOR-CNSP-221',
      date: '',
      status: 'Pendiente'
    };
    this.showCreateModal = true;
  }

  confirmCreateRequest() {
    if (!this.newRequest.request.trim() || !this.newRequest.person.trim() || !this.newRequest.date) {
      this.openInfoModal('Validación', 'Completa los campos obligatorios.');
      return;
    }

    const formattedDate = new Intl.DateTimeFormat('es-PE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(new Date(this.newRequest.date));

    const current = this.dataSource.data as any[];
    this.dataSource.data = [
      {
        id: Date.now(),
        request: this.newRequest.request.trim(),
        person: this.newRequest.person.trim(),
        laboratory: this.newRequest.laboratory,
        score: Number(this.newRequest.score),
        recordCode: this.newRequest.recordCode,
        date: formattedDate,
        status: this.newRequest.status
      },
      ...current
    ];
    this.applyCombinedFilter();
    this.showCreateModal = false;
    this.openInfoModal('Éxito', 'La solicitud se registró correctamente.');
  }

  cancelCreateRequest() {
    this.showCreateModal = false;
  }

  closeInfoModal() {
    this.showInfoModal = false;
  }

  private openInfoModal(title: string, message: string) {
    this.infoTitle = title;
    this.infoMessage = message;
    this.showInfoModal = true;
  }

  private applyCombinedFilter() {
    this.dataSource.filter = JSON.stringify({
      search: this.searchQuery.trim().toLowerCase(),
      status: this.selectedStatus
    });
    if (this.dataSource.paginator) this.dataSource.paginator.firstPage();
  }

}
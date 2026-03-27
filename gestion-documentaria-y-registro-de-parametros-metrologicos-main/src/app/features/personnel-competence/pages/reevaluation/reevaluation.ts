import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';

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
  selector: 'app-reevaluation',
  standalone: true,
  templateUrl: './reevaluation.html',
  providers: [{ provide: MatPaginatorIntl, useValue: getPaginatorEsIntl() }],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatPaginatorModule
  ]
})
export class Reevaluation implements AfterViewInit {

  displayedColumns: string[] = [
    'name',
    'competence',
    'previousResult',
    'reportCode',
    'date',
    'status',
    'actions'
  ];

  searchQuery = '';
  selectedStatus = 'all';
  selectedCompetence = 'all';
  private searchDebounceTimer: ReturnType<typeof setTimeout> | null = null;
  statusOptions: string[] = ['Pendiente', 'Completado'];
  competenceOptions: string[] = [];

  dataSource = new MatTableDataSource([
    {
      id: 1,
      name: 'Juan Pérez',
      laboratory: 'Laboratorio de Salud Pública (CNSP)',
      competence: 'Gestión de calidad',
      previousResult: 'Observado',
      reportCode: 'FOR-CNSP-286',
      date: '05/04/2026',
      status: 'Pendiente'
    },
    {
      id: 2,
      name: 'María López',
      laboratory: 'Laboratorio de Alimentación y Nutrición (CENAN)',
      competence: 'Liderazgo',
      previousResult: 'Observado',
      reportCode: 'FOR-CNSP-286',
      date: '28/03/2026',
      status: 'Completado'
    }
  ]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  showCreateModal = false;
  showInfoModal = false;
  infoTitle = '';
  infoMessage = '';
  newReevaluation = {
    name: '',
    laboratory: 'Laboratorio de Salud Pública (CNSP)',
    competence: '',
    reportCode: 'FOR-CNSP-286',
    date: ''
  };

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const parsed = JSON.parse(filter || '{}');
      const search = (parsed.search ?? '').toLowerCase();
      const status = parsed.status ?? 'all';
      const competence = parsed.competence ?? 'all';

      const matchesSearch = !search
        || data.name.toLowerCase().includes(search)
        || data.competence.toLowerCase().includes(search)
        || data.status.toLowerCase().includes(search);
      const matchesStatus = status === 'all' || data.status === status;
      const matchesCompetence = competence === 'all' || data.competence === competence;

      return matchesSearch && matchesStatus && matchesCompetence;
    };
    this.refreshCompetenceOptions();
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
    this.selectedCompetence = 'all';
    if (this.searchDebounceTimer) {
      clearTimeout(this.searchDebounceTimer);
      this.searchDebounceTimer = null;
    }
    this.applyCombinedFilter();
  }

  reevaluate(row: any) {
    this.openInfoModal('Reevaluación', `Iniciando reevaluación de ${row.name}.`);
  }

  scheduleReevaluation() {
    this.newReevaluation = {
      name: '',
      laboratory: 'Laboratorio de Salud Pública (CNSP)',
      competence: '',
      reportCode: 'FOR-CNSP-286',
      date: ''
    };
    this.showCreateModal = true;
  }

  confirmScheduleReevaluation() {
    if (!this.newReevaluation.name.trim() || !this.newReevaluation.competence.trim() || !this.newReevaluation.date) {
      this.openInfoModal('Validación', 'Completa los campos obligatorios.');
      return;
    }

    const formattedDate = new Intl.DateTimeFormat('es-PE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(new Date(this.newReevaluation.date));

    this.dataSource.data = [
      {
        id: Date.now(),
        name: this.newReevaluation.name.trim(),
        laboratory: this.newReevaluation.laboratory,
        competence: this.newReevaluation.competence.trim(),
        previousResult: 'Observado',
        reportCode: this.newReevaluation.reportCode.trim() || 'FOR-CNSP-286',
        date: formattedDate,
        status: 'Pendiente'
      },
      ...(this.dataSource.data as any[])
    ];
    this.refreshCompetenceOptions();
    this.applyCombinedFilter();

    this.showCreateModal = false;
    this.openInfoModal('Éxito', 'Reevaluación programada correctamente.');
  }

  cancelScheduleReevaluation() {
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
      status: this.selectedStatus,
      competence: this.selectedCompetence
    });
    if (this.dataSource.paginator) this.dataSource.paginator.firstPage();
  }

  private refreshCompetenceOptions() {
    const data = this.dataSource.data as any[];
    this.competenceOptions = Array.from(new Set(data.map((item) => item.competence))).sort((a, b) => a.localeCompare(b));
  }

}
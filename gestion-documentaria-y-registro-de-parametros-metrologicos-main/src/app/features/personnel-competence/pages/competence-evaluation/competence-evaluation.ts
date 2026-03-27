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
  selector: 'app-competence-evaluation',
  standalone: true,
  templateUrl: './competence-evaluation.html',
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
export class CompetenceEvaluation implements AfterViewInit {

  displayedColumns: string[] = [
    'name',
    'position',
    'area',
    'competence',
    'method',
    'score',
    'result',
    'level',
    'status',
    'actions'
  ];

  searchQuery: string = '';
  selectedStatus = 'all';
  selectedLevel = 'all';
  selectedResult = 'all';
  private searchDebounceTimer: ReturnType<typeof setTimeout> | null = null;
  statusOptions: string[] = ['Pendiente', 'Completado'];
  levelOptions: string[] = ['Bajo', 'Medio', 'Alto'];
  resultOptions: string[] = ['Aprobado', 'No aprobado'];
  showCreateModal = false;
  showInfoModal = false;
  infoTitle = '';
  infoMessage = '';
  newEvaluation = {
    name: '',
    position: '',
    area: '',
    competence: '',
    laboratory: 'Laboratorio de Salud Pública (CNSP)',
    method: 'Observación directa',
    formCode: 'FOR-CNSP-220',
    score: 60,
    result: 'Aprobado',
    level: 'Medio',
    status: 'Pendiente'
  };

  dataSource = new MatTableDataSource([
    {
      id: 1,
      name: 'Juan Pérez',
      laboratory: 'Laboratorio de Salud Pública (CNSP)',
      position: 'Ingeniero de Calidad',
      area: 'Producción',
      competence: 'Gestión de Calidad',
      method: 'Observación directa',
      formCode: 'FOR-CNSP-220',
      score: 82,
      result: 'Aprobado',
      level: 'Alto',
      status: 'Pendiente'
    },
    {
      id: 2,
      name: 'María López',
      laboratory: 'Laboratorio de Alimentación y Nutrición (CENAN)',
      position: 'Supervisor',
      area: 'RRHH',
      competence: 'Liderazgo',
      method: 'Revisión de resultados',
      formCode: 'FOR-CNSP-220',
      score: 58,
      result: 'No aprobado',
      level: 'Medio',
      status: 'Completado'
    }
  ]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const parsed = JSON.parse(filter || '{}');
      const value = (parsed.search ?? '').toLowerCase();
      const status = parsed.status ?? 'all';
      const level = parsed.level ?? 'all';
      const result = parsed.result ?? 'all';
      const matchesSearch = data.name.toLowerCase().includes(value)
        || data.position.toLowerCase().includes(value)
        || data.area.toLowerCase().includes(value)
        || data.competence.toLowerCase().includes(value)
        || data.method.toLowerCase().includes(value)
        || data.result.toLowerCase().includes(value)
        || `${data.score}`.includes(value)
        || data.level.toLowerCase().includes(value)
        || data.status.toLowerCase().includes(value);
      const matchesStatus = status === 'all' || data.status === status;
      const matchesLevel = level === 'all' || data.level === level;
      const matchesResult = result === 'all' || data.result === result;
      return matchesSearch && matchesStatus && matchesLevel && matchesResult;
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
    this.selectedLevel = 'all';
    this.selectedResult = 'all';
    if (this.searchDebounceTimer) {
      clearTimeout(this.searchDebounceTimer);
      this.searchDebounceTimer = null;
    }
    this.applyCombinedFilter();
  }

  evaluate(row: any) {
    this.openInfoModal('Evaluación', `Iniciando evaluación de: ${row.name}`);
  }

  createEvaluation() {
    this.newEvaluation = {
      name: '',
      position: '',
      area: '',
      competence: '',
      laboratory: 'Laboratorio de Salud Pública (CNSP)',
      method: 'Observación directa',
      formCode: 'FOR-CNSP-220',
      score: 60,
      result: 'Aprobado',
      level: 'Medio',
      status: 'Pendiente'
    };
    this.showCreateModal = true;
  }

  confirmCreateEvaluation() {
    if (!this.newEvaluation.name.trim() || !this.newEvaluation.competence.trim()) {
      this.openInfoModal('Validación', 'Completa los campos obligatorios.');
      return;
    }

    const current = this.dataSource.data as any[];
    const newRow = {
      id: Date.now(),
      name: this.newEvaluation.name.trim(),
      position: this.newEvaluation.position.trim() || 'Sin cargo',
      area: this.newEvaluation.area.trim() || 'Sin área',
      competence: this.newEvaluation.competence.trim(),
      laboratory: this.newEvaluation.laboratory,
      method: this.newEvaluation.method,
      formCode: this.newEvaluation.formCode.trim() || 'FOR-CNSP-220',
      score: Number(this.newEvaluation.score),
      result: Number(this.newEvaluation.score) >= 60 ? 'Aprobado' : 'No aprobado',
      level: this.newEvaluation.level,
      status: this.newEvaluation.status
    };
    this.dataSource.data = [newRow, ...current];
    this.applyCombinedFilter();
    this.showCreateModal = false;
    this.openInfoModal('Éxito', 'La evaluación se registró correctamente.');
  }

  cancelCreateEvaluation() {
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
      level: this.selectedLevel,
      result: this.selectedResult
    });
    if (this.dataSource.paginator) this.dataSource.paginator.firstPage();
  }

}
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { INS_LABORATORIES } from '../../constants/ins-laboratories';
import { PERSONNEL_OPTIONS } from '../../constants/personnel-options';

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
  selector: 'app-documents',
  standalone: true,
  templateUrl: './documents.html',
  providers: [{ provide: MatPaginatorIntl, useValue: getPaginatorEsIntl() }],
  imports: [CommonModule, FormsModule, MatTableModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatPaginatorModule, MatTooltipModule, MatSelectModule, MatAutocompleteModule]
})
export class Documents implements AfterViewInit {
  displayedColumns: string[] = ['name', 'person', 'description', 'type', 'date', 'status', 'actions'];
  searchQuery: string = '';
  laboratories: string[] = INS_LABORATORIES;
  personnelOptions: string[] = [...PERSONNEL_OPTIONS];
  filteredPersonnelOptions: string[] = [...this.personnelOptions];
  filteredEditPersonnelOptions: string[] = [...this.personnelOptions];
  private searchDebounceTimer: ReturnType<typeof setTimeout> | null = null;
  isDragOverUploadButton = false;
  showUploadModal = false;
  pendingFiles: File[] = [];
  currentFile: File | null = null;
  modalFileName: string = '';
  modalPerson: string = '';
  modalDescription: string = '';
  modalLaboratory = 'Laboratorio de Salud Pública (CNSP)';
  showInfoModal = false;
  infoTitle = '';
  infoMessage = '';
  showEditModal = false;
  showDeleteModal = false;
  editDocument = {
    id: 0,
    name: '',
    person: '',
    laboratory: 'Laboratorio de Salud Pública (CNSP)',
    description: '',
    status: 'Vigente'
  };
  selectedEditFile: File | null = null;
  selectedEditFileName = '';
  pendingDeleteRow: any = null;

  dataSource = new MatTableDataSource([
    { id: 1, name: 'Certificado de capacitación', person: 'Juan Pérez', laboratory: 'Laboratorio de Salud Pública (CNSP)', description: 'Evidencia de capacitación ISO 9001.', type: 'PDF', date: '10/03/2026', status: 'Vigente' },
    { id: 2, name: 'Evaluación de desempeño', person: 'María López', laboratory: 'Laboratorio de Alimentación y Nutrición (CENAN)', description: 'Evidencia de evaluación anual del personal.', type: 'DOCX', date: '15/02/2026', status: 'Vencido' },
    { id: 3, name: 'Ficha de personal', person: 'Carlos Ruiz', laboratory: 'Laboratorio de Control de Calidad (CNCC)', description: 'Evidencia de actualización de ficha.', type: 'PDF', date: '18/03/2026', status: 'Vigente' }
  ]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('editFileInput') editFileInput!: ElementRef<HTMLInputElement>;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const parsed = JSON.parse(filter || '{}');
      const value = (parsed.search ?? '').toLowerCase();
      const matchesSearch = data.name.toLowerCase().includes(value)
        || data.person.toLowerCase().includes(value)
        || data.description.toLowerCase().includes(value)
        || data.type.toLowerCase().includes(value)
        || data.status.toLowerCase().includes(value);
      return matchesSearch;
    };
    this.refreshPersonnelOptions();
    this.applyCombinedFilter();
  }

  applyFilter(event: Event) {
    this.searchQuery = (event.target as HTMLInputElement).value;
    if (this.searchDebounceTimer) clearTimeout(this.searchDebounceTimer);
    this.searchDebounceTimer = setTimeout(() => {
      this.applyCombinedFilter();
    }, 250);
  }

  resetFilters() {
    this.searchQuery = '';
    if (this.searchDebounceTimer) {
      clearTimeout(this.searchDebounceTimer);
      this.searchDebounceTimer = null;
    }
    this.applyCombinedFilter();
  }

  uploadDocument() {
    this.fileInput?.nativeElement.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;
    this.startUploadFlow(Array.from(input.files));
    input.value = '';
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragOverUploadButton = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragOverUploadButton = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragOverUploadButton = false;
    const files = event.dataTransfer?.files ? Array.from(event.dataTransfer.files) : [];
    if (!files.length) return;
    this.startUploadFlow(files);
  }

  private startUploadFlow(files: File[]) {
    this.pendingFiles = [...files];
    this.openNextFileModal();
  }

  private openNextFileModal() {
    const next = this.pendingFiles.shift() || null;
    this.currentFile = next;
    if (!next) {
      this.showUploadModal = false;
      return;
    }

    this.modalFileName = next.name;
    this.modalPerson = '';
    this.filterUploadPersonnel('');
    this.modalDescription = '';
    this.modalLaboratory = 'Laboratorio de Salud Pública (CNSP)';
    this.showUploadModal = true;
  }

  confirmUploadModal() {
    if (!this.currentFile) return;
    if (!this.modalPerson.trim()) {
      this.openInfoModal('Validación', 'Selecciona el personal relacionado al documento.');
      return;
    }
    if (!this.isKnownPerson(this.modalPerson)) {
      this.openInfoModal('Validación', 'Selecciona un personal válido de la lista.');
      return;
    }
    if (!this.modalDescription.trim()) {
      this.openInfoModal('Validación', 'La descripción de la evidencia es obligatoria.');
      return;
    }

    const current = this.dataSource.data as any[];
    const today = new Date();
    const date = new Intl.DateTimeFormat('es-PE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(today);

    const extension = this.currentFile.name.includes('.')
      ? this.currentFile.name.split('.').pop()!.toUpperCase()
      : 'ARCHIVO';

    const newRow = {
      id: Date.now(),
      name: this.modalFileName.trim() || this.currentFile.name,
      person: this.modalPerson.trim(),
      laboratory: this.modalLaboratory,
      description: this.modalDescription.trim(),
      type: extension,
      date,
      status: 'Vigente'
    };

    this.dataSource.data = [newRow, ...current];
    this.refreshPersonnelOptions();
    if (this.dataSource.paginator) this.dataSource.paginator.firstPage();

    this.openNextFileModal();
  }

  cancelUploadModal() {
    this.currentFile = null;
    this.pendingFiles = [];
    this.showUploadModal = false;
  }

  viewDocument(row: any) { this.openInfoModal('Detalle de evidencia', `Documento: ${row.name}\nPersonal: ${row.person}\nDescripción: ${row.description}\nTipo: ${row.type}\nFecha: ${row.date}\nEstado: ${row.status}`); }
  downloadDocument(row: any) { this.openInfoModal('Descarga', `Descargando documento: ${row.name}`); }
  openEditModal(row: any) {
    this.editDocument = {
      id: row.id,
      name: row.name,
      person: row.person,
      laboratory: row.laboratory,
      description: row.description,
      status: row.status
    };
    this.filterEditPersonnel(this.editDocument.person);
    this.selectedEditFile = null;
    this.selectedEditFileName = '';
    this.showEditModal = true;
  }
  pickEditFile() {
    this.editFileInput?.nativeElement.click();
  }
  onEditFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;
    if (!file) return;
    this.selectedEditFile = file;
    this.selectedEditFileName = file.name;
    input.value = '';
  }
  confirmEditModal() {
    if (!this.editDocument.name.trim() || !this.editDocument.person.trim()) {
      this.openInfoModal('Validación', 'Completa documento y personal.');
      return;
    }
    if (!this.isKnownPerson(this.editDocument.person)) {
      this.openInfoModal('Validación', 'Selecciona un personal válido de la lista.');
      return;
    }
    if (!this.editDocument.description.trim()) {
      this.openInfoModal('Validación', 'La descripción de la evidencia es obligatoria.');
      return;
    }

    const updated = (this.dataSource.data as any[]).map((item) => (
      item.id === this.editDocument.id
        ? {
            ...item,
            name: this.editDocument.name.trim(),
            person: this.editDocument.person.trim(),
            laboratory: this.editDocument.laboratory,
            description: this.editDocument.description.trim(),
            status: this.editDocument.status,
            ...(this.selectedEditFile
              ? {
                  type: this.selectedEditFile.name.includes('.')
                    ? this.selectedEditFile.name.split('.').pop()!.toUpperCase()
                    : 'ARCHIVO',
                  date: new Intl.DateTimeFormat('es-PE', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                  }).format(new Date())
                }
              : {})
          }
        : item
    ));
    this.dataSource.data = updated;
    this.showEditModal = false;
    this.selectedEditFile = null;
    this.selectedEditFileName = '';
    this.openInfoModal('Éxito', 'Documento actualizado correctamente.');
    this.applyCombinedFilter();
  }
  cancelEditModal() {
    this.showEditModal = false;
    this.selectedEditFile = null;
    this.selectedEditFileName = '';
  }
  openDeleteModal(row: any) {
    this.pendingDeleteRow = row;
    this.showDeleteModal = true;
  }
  confirmDeleteModal() {
    if (!this.pendingDeleteRow) return;
    this.dataSource.data = (this.dataSource.data as any[]).filter((item) => item.id !== this.pendingDeleteRow.id);
    this.showDeleteModal = false;
    this.pendingDeleteRow = null;
    if (this.dataSource.paginator) this.dataSource.paginator.firstPage();
    this.openInfoModal('Éxito', 'Documento eliminado correctamente.');
  }
  cancelDeleteModal() {
    this.showDeleteModal = false;
    this.pendingDeleteRow = null;
  }

  closeInfoModal() { this.showInfoModal = false; }

  private openInfoModal(title: string, message: string) {
    this.infoTitle = title;
    this.infoMessage = message;
    this.showInfoModal = true;
  }

  private applyCombinedFilter() {
    this.dataSource.filter = JSON.stringify({
      search: this.searchQuery.trim().toLowerCase()
    });
    if (this.dataSource.paginator) this.dataSource.paginator.firstPage();
  }

  private refreshPersonnelOptions() {
    const currentPeople = (this.dataSource.data as any[])
      .map((item) => `${item.person ?? ''}`.trim())
      .filter((name) => !!name && name.toLowerCase() !== 'pendiente de asignar');
    this.personnelOptions = Array.from(new Set([...this.personnelOptions, ...currentPeople]))
      .sort((a, b) => a.localeCompare(b));
    this.filteredPersonnelOptions = [...this.personnelOptions];
    this.filteredEditPersonnelOptions = [...this.personnelOptions];
  }

  filterUploadPersonnel(value: string) {
    const needle = (value || '').trim().toLowerCase();
    this.filteredPersonnelOptions = this.personnelOptions.filter((person) =>
      person.toLowerCase().includes(needle)
    );
  }

  filterEditPersonnel(value: string) {
    const needle = (value || '').trim().toLowerCase();
    this.filteredEditPersonnelOptions = this.personnelOptions.filter((person) =>
      person.toLowerCase().includes(needle)
    );
  }

  private isKnownPerson(value: string): boolean {
    const normalized = (value || '').trim().toLowerCase();
    return this.personnelOptions.some((person) => person.toLowerCase() === normalized);
  }
}
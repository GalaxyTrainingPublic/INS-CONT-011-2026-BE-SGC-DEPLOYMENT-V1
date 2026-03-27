import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatPaginator, MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RiskService } from '../../services/risk.service';
import { Risk } from '../../models/risk.model';
import { RiskFormPage } from '../../pages/risk-form/risk-form.page';
import { FormsModule } from '@angular/forms';

/** * Configuración del paginador en español 
 */
export function getEspanolPaginatorIntl() {
  const paginatorIntl = new MatPaginatorIntl();
  paginatorIntl.itemsPerPageLabel = 'Elementos por página:';
  paginatorIntl.nextPageLabel = 'Siguiente';
  paginatorIntl.previousPageLabel = 'Anterior';
  paginatorIntl.firstPageLabel = 'Primera página';
  paginatorIntl.lastPageLabel = 'Última página';
  paginatorIntl.getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) { return `0 de ${length}`; }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} de ${length}`;
  };
  return paginatorIntl;
}

@Component({
  selector: 'app-risk-register',
  standalone: true,
  imports: [CommonModule, MatPaginatorModule, MatTableModule, FormsModule],
  providers: [{ provide: MatPaginatorIntl, useValue: getEspanolPaginatorIntl() }],
  templateUrl: './risk-register.page.html',
  styleUrls: ['./risk-register.page.scss']
})
// ... (mismos imports y paginatorIntl)

export class RiskRegisterPage implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<Risk>([]);
  allRisks: Risk[] = []; 
  
  showModal = false;
  isEditing = false;
  currentRisk: any = null;
  
  currentFilterType = 'Todos';
  currentFilterLab = 'Todos';
  searchTerm = '';
  
  labs = ['Todos', 'Metrología', 'Biomédica', 'Ensayos', 'Química'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private riskService: RiskService, private router: Router) {}

  ngOnInit(): void {
    this.loadRisks();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadRisks(): void {
    this.riskService.getRisks().subscribe({
      next: (data) => {
        this.allRisks = data;
        this.applyCombinedFilters();
      },
      error: (err) => console.error('Error al cargar datos:', err)
    });
  }

  /**
   * Lógica de filtrado integral corregida
   */
  applyCombinedFilters() {
    this.dataSource.data = this.allRisks.filter(risk => {
      // 1. Normalización de valores para comparar sin errores de caja (Case Insensitive)
      const riskType = (risk.type || '').toUpperCase().trim();
      const filterType = this.currentFilterType.toUpperCase().trim();
      
      const riskLab = (risk.laboratory || '').toUpperCase().trim();
      const filterLab = this.currentFilterLab.toUpperCase().trim();
      
      const search = this.searchTerm.toLowerCase().trim();

      // 2. Evaluación de condiciones
      const matchType = filterType === 'TODOS' || riskType === filterType;
      
      // Corregido: Comparación robusta de laboratorio
      const matchLab = filterLab === 'TODOS' || riskLab === filterLab;
      
      const matchText = !search || 
        `${risk.process} ${risk.description} ${risk.laboratory}`.toLowerCase().includes(search);
      
      return matchType && matchLab && matchText;
    });

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onSearch(event: Event) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.applyCombinedFilters();
  }

  setFilterType(type: string) {
    this.currentFilterType = type;
    this.applyCombinedFilters();
  }

  // Se dispara desde el (change) del select de laboratorios en el HTML
  onLabChange() {
    this.applyCombinedFilters();
  }

  goToNewRisk(): void {
    this.router.navigate(['/risks-opportunities/form']);
  }

  

  closeModal() {
    this.showModal = false;
    this.isEditing = false;
    this.currentRisk = null;
  }

  editRisk(risk: Risk): void {
  if (risk?.id) {
    this.router.navigate(['/risks-opportunities/editar', risk.id]);
  }
}

onDelete(risk: Risk): void {
  const confirmacion = confirm(`¿Está seguro de eliminar el registro de "${risk.process}"?`);
  
  if (confirmacion && risk.id) {
    this.riskService.deleteRisk(risk.id).subscribe({
      next: () => {
        // Refrescamos la lista localmente
        this.loadRisks(); 
        console.log('Registro eliminado');
      },
      error: (err) => console.error('Error al eliminar:', err)
    });
  }
}

  openDetail(risk: Risk): void {
    if (risk?.id) {
      this.router.navigate(['/risks-opportunities/detail', risk.id]);
    }
  }

  onSave(riskData: any): void {
    // Solución al error de tipos: forzamos el tipado como 'Risk'
    const formattedRisk = { 
      ...riskData,
      status: riskData.status || 'Identificado'
    } as Risk;

    if (this.isEditing) {
      const index = this.allRisks.findIndex(r => r.id === formattedRisk.id);
      if (index !== -1) {
        this.allRisks[index] = formattedRisk;
      }
    } else {
      const newRisk: Risk = { 
        ...formattedRisk, 
        id: Date.now(), 
        status: 'Identificado' 
      };
      this.allRisks = [newRisk, ...this.allRisks];
    }
    this.applyCombinedFilters();
    this.closeModal();
  }

  // UTILITARIOS
  getLevelClass(value: number): string {
    if (value < 32) return 'low';
    if (value < 48) return 'medium';
    if (value < 80) return 'high';
    return 'critical';
  }

  capitalizeFirstLetter(text: string): string {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }
}
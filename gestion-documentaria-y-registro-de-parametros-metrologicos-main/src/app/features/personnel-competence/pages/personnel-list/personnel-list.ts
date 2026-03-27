import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { FormsModule } from '@angular/forms';
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
    if (length === 0 || pageSize === 0) {
      return `0 de ${length}`;
    }

    const startIndex = page * pageSize;
    const endIndex = Math.min(startIndex + pageSize, length);
    return `${startIndex + 1} - ${endIndex} de ${length}`;
  };

  return paginatorIntl;
}

export interface Area {
  name: string;
  viewValue: string;
}

interface Charge {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-personnel-list',
  standalone: true,
  templateUrl: './personnel-list.html',
  providers: [
    { provide: MatPaginatorIntl, useValue: getPaginatorEsIntl() }
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatFormFieldModule,
    MatTooltipModule
  ]
})
export class PersonnelList implements AfterViewInit {

  constructor(private router: Router) {}
  selectedArea: string = 'all';
  selectedCharge: string = 'all';
  searchQuery: string = '';
  private searchDebounceTimer: ReturnType<typeof setTimeout> | null = null;


  charges: Charge[] = [
    {value: 'post-0', viewValue: 'Ingeniero'},
    {value: 'post-1', viewValue: 'Supervisor'},
    {value: 'post-2', viewValue: 'Analista'},
    {value: 'post-3', viewValue: 'Asistente'},
    {value: 'post-4', viewValue: 'Gerente'},
  ];

  areas: Area[] = [
    {name: 'area-0', viewValue: 'Producción'},
    {name: 'area-1', viewValue: 'RRHH'},
    {name: 'area-2', viewValue: 'Calidad'},
    {name: 'area-3', viewValue: 'Logística'},
    {name: 'area-4', viewValue: 'Sistemas'},
    {name: 'area-5', viewValue: 'Finanzas'},
  ];

  displayedColumns: string[] = [
    'name',
    'position',
    'area',
    'status',
    'actions'
  ];

  dataSource = new MatTableDataSource([
    { id: 1, name: 'Juan Pérez', position: 'Ingeniero', area: 'Producción', status: 'Activo' },
    { id: 2, name: 'María López', position: 'Supervisor', area: 'RRHH', status: 'Inactivo' },
    { id: 3, name: 'Carlos Ruiz', position: 'Analista', area: 'Calidad', status: 'Activo' },
    { id: 4, name: 'Ana Torres', position: 'Asistente', area: 'Logística', status: 'Activo' },
    { id: 5, name: 'Roberto Gómez', position: 'Gerente', area: 'Sistemas', status: 'Activo' },
    { id: 6, name: 'Lucía Méndez', position: 'Ingeniero', area: 'Producción', status: 'Activo' },
    { id: 7, name: 'Ricardo Salas', position: 'Analista', area: 'Finanzas', status: 'Inactivo' },
    { id: 8, name: 'Elena Espinoza', position: 'Supervisor', area: 'Calidad', status: 'Activo' },
    { id: 9, name: 'Fernando Castro', position: 'Asistente', area: 'RRHH', status: 'Activo' },
    { id: 10, name: 'Gabriela Rivas', position: 'Analista', area: 'Logística', status: 'Inactivo' },
    { id: 11, name: 'Hugo Paredes', position: 'Ingeniero', area: 'Sistemas', status: 'Activo' },
    { id: 12, name: 'Isabel Ortega', position: 'Gerente', area: 'Producción', status: 'Activo' },
    { id: 13, name: 'Javier Luna', position: 'Asistente', area: 'Calidad', status: 'Activo' },
    { id: 14, name: 'Karla Benítez', position: 'Analista', area: 'RRHH', status: 'Inactivo' },
    { id: 15, name: 'Luis Navarro', position: 'Supervisor', area: 'Producción', status: 'Activo' },
    { id: 16, name: 'Mónica Herrera', position: 'Ingeniero', area: 'Calidad', status: 'Activo' },
    { id: 17, name: 'Oscar Vargas', position: 'Analista', area: 'Finanzas', status: 'Activo' },
    { id: 18, name: 'Patricia Solís', position: 'Asistente', area: 'Logística', status: 'Inactivo' },
    { id: 19, name: 'Raúl Medina', position: 'Supervisor', area: 'Sistemas', status: 'Activo' },
    { id: 20, name: 'Sofía Lara', position: 'Gerente', area: 'RRHH', status: 'Activo' }
  ]);


  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const searchTerms = JSON.parse(filter);

      const matchesText = data.name.toLowerCase().includes(searchTerms.text.toLowerCase()) ||
                          data.position.toLowerCase().includes(searchTerms.text.toLowerCase());

      const matchesArea = searchTerms.area === 'all' || data.area === searchTerms.area;

      const matchesCharge = searchTerms.charge === 'all' || data.position === searchTerms.charge;

      return matchesText && matchesArea && matchesCharge;
    };
  }

  applyFilter(event: Event) {
    this.searchQuery = (event.target as HTMLInputElement).value;
    if (this.searchDebounceTimer) clearTimeout(this.searchDebounceTimer);
    this.searchDebounceTimer = setTimeout(() => {
      this.syncFilters();
    }, 250);
  }

  viewDetail(row: any) {
    this.router.navigate(['/personnel-competence/personnel-file', row.id], {
      queryParams: { mode: 'view' }
    });
  }

  editRow(row: any) {
    this.router.navigate(['/personnel-competence/personnel-file', row.id], {
      queryParams: { mode: 'edit' }
    });
  }

  deleteRow(row: any) {
    this.router.navigate(['/personnel-competence/personnel-file', row.id], {
      queryParams: { mode: 'delete' }
    });
  }

  applySelectFilter() {
    this.syncFilters();
  }


  syncFilters() {
    const filterValues = {
      text: this.searchQuery || '',
      area: this.selectedArea || 'all',
      charge: this.selectedCharge || 'all'
    };

    this.dataSource.filter = JSON.stringify(filterValues);

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
      this.dataSource.paginator = this.paginator;
    }
  }

  resetFilters() {
    this.searchQuery = '';
    this.selectedArea = 'all';
    this.selectedCharge = 'all';
    if (this.searchDebounceTimer) {
      clearTimeout(this.searchDebounceTimer);
      this.searchDebounceTimer = null;
    }

    this.syncFilters();
    const searchInput = document.querySelector('input[matInput]') as HTMLInputElement;
    if (searchInput) searchInput.value = '';
  }

  createNew() {
    this.router.navigate(['/personnel-competence/personnel-file/new'], {
      queryParams: { mode: 'create' }
    });
  }

}

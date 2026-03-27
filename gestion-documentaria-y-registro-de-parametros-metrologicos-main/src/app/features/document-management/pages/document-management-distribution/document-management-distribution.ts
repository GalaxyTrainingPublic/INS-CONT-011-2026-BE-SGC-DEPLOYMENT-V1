import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOption, MatSelect, MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { SectionTitle } from '../../../../shared/components/layout/section-title/section-title';
import { ConfirmDialogService } from '../../../../shared/services/confirm-dialog-service';


interface TargetArea {
  value: string;
  viewValue: string;
}

export interface DocumentDelivery {
  documentId: string;   // ID del documento (ej: POE-CNSP-001)
  targetArea: string;   // Área de destino
  targetUser: string;   // Usuario que recibe
  sentDate: string;     // Fecha de envío (formato ISO)
  type: string;         // Tipo de envío (ej: lectura obligatoria)
}


const ELEMENT_DATA: DocumentDelivery[] = [
  {
    documentId: "POE-CNSP-001",
    targetArea: "Laboratorio de Virología",
    targetUser: "Dr. Carlos Méndez",
    sentDate: "2026-03-20T09:00:00Z",
    type: "lectura obligatoria"
  },
  {
    documentId: "FOR-CNSP-002",
    targetArea: "Unidad de Gestión de la Calidad",
    targetUser: "Lic. Ana Espinoza",
    sentDate: "2026-03-21T14:30:00Z",
    type: "lectura obligatoria"
  },
  {
    documentId: "MAN-CNSP-004",
    targetArea: "Laboratorio de Tuberculosis",
    targetUser: "Blgo. Roberto Gómez",
    sentDate: "2026-03-22T10:15:00Z",
    type: "lectura obligatoria"
  },
  {
    documentId: "ITT-CNSP-021",
    targetArea: "Biomedicina",
    targetUser: "Dra. Elena Ruiz",
    sentDate: "2026-03-23T11:00:00Z",
    type: "lectura obligatoria"
  },
  {
    documentId: "PRT-CNSP-016",
    targetArea: "Microbiología",
    targetUser: "T.M. Jorge Valdivia",
    sentDate: "2026-03-24T08:45:00Z",
    type: "lectura obligatoria"
  },
  {
    documentId: "MET-CNSP-007",
    targetArea: "Zoonosis",
    targetUser: "Blga. Patricia García",
    sentDate: "2026-03-25T07:30:00Z",
    type: "lectura obligatoria"
  },
  {
    documentId: "ITA-CNSP-021",
    targetArea: "Equipo de Apoyo Secretarial",
    targetUser: "Lic. Jenifer Mendoza",
    sentDate: "2026-03-25T15:20:00Z",
    type: "lectura obligatoria"
  },
  {
    documentId: "POE-CNSP-006",
    targetArea: "VTS",
    targetUser: "T.M. Daniel Santos",
    sentDate: "2026-03-26T10:00:00Z",
    type: "lectura obligatoria"
  },
  {
    documentId: "FOR-CNSP-004",
    targetArea: "Laboratorio de Micología",
    targetUser: "Blgo. Joseph Huayra",
    sentDate: "2026-03-26T12:45:00Z",
    type: "lectura obligatoria"
  },
  {
    documentId: "MAN-CNSP-023",
    targetArea: "UNAGESP",
    targetUser: "Med. Nora Reyes",
    sentDate: "2026-03-27T09:15:00Z",
    type: "lectura obligatoria"
  },
  {
    documentId: "ITT-CNSP-002",
    targetArea: "Tuberculosis",
    targetUser: "Blga. Belisa Asto",
    sentDate: "2026-03-27T16:00:00Z",
    type: "lectura obligatoria"
  },
  {
    documentId: "PRT-CNSP-010",
    targetArea: "Inmunología",
    targetUser: "Ing. Ricardo Espinoza",
    sentDate: "2026-03-28T08:30:00Z",
    type: "lectura obligatoria"
  },
  {
    documentId: "MET-CNSP-009",
    targetArea: "Entomología",
    targetUser: "Blgo. Walter Leon",
    sentDate: "2026-03-28T11:50:00Z",
    type: "lectura obligatoria"
  },
  {
    documentId: "FOR-CNSP-015",
    targetArea: "Biomedicina",
    targetUser: "Dra. Sonia Gutiérrez",
    sentDate: "2026-03-29T14:10:00Z",
    type: "lectura obligatoria"
  },
  {
    documentId: "POE-CNSP-012",
    targetArea: "Virología",
    targetUser: "Blga. Soledad Romero",
    sentDate: "2026-03-29T17:35:00Z",
    type: "lectura obligatoria"
  },
  {
    documentId: "ITA-CNSP-007",
    targetArea: "UGC",
    targetUser: "Ing. Ana Rosa Zeppilli",
    sentDate: "2026-03-30T09:00:00Z",
    type: "lectura obligatoria"
  },
  {
    documentId: "MAN-CNSP-001",
    targetArea: "Iras e Iih",
    targetUser: "Blga. Rosa Sacsaquispe",
    sentDate: "2026-03-30T13:20:00Z",
    type: "lectura obligatoria"
  },
  {
    documentId: "PRT-CNSP-022",
    targetArea: "Laboratorios URL",
    targetUser: "T.M. Ada Valverde",
    sentDate: "2026-03-31T10:45:00Z",
    type: "lectura obligatoria"
  },
  {
    documentId: "ITT-CNSP-001",
    targetArea: "Microbiología",
    targetUser: "Blga. Ana Elva Jorge",
    sentDate: "2026-03-31T15:55:00Z",
    type: "lectura obligatoria"
  },
  {
    documentId: "MET-CNSP-014",
    targetArea: "Parasitología",
    targetUser: "Blgo. Jorge Lucero",
    sentDate: "2026-04-01T08:00:00Z",
    type: "lectura obligatoria"
  }
];


@Component({
  selector: 'app-document-management-distribution',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    CommonModule,
    RouterModule,
    MatFormField,
    MatLabel,
    MatFormFieldModule,
    FormsModule,
    MatSelect,
    MatOption,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    SectionTitle
  ],
  standalone: true,
  templateUrl: './document-management-distribution.html',
  styles: ``,
})
export class DocumentManagementDistribution implements AfterViewInit,  OnInit{

  private readonly confirm = inject(ConfirmDialogService);

  selectedArea: string = 'all';
  searchQuery: string = '';

  isOpen = false;
  selectedOption: string = 'Tipo de Documento';

    areas: TargetArea[] = [
    { value: 'Laboratorio de Virología', viewValue: 'Laboratorio de Virología' },
    { value: 'Unidad de Gestión de la Calidad', viewValue: 'Unidad de Gestión de la Calidad' },
    { value: 'Laboratorio de Tuberculosis', viewValue: 'Laboratorio de Tuberculosis' },
    { value: 'Biomedicina', viewValue: 'Biomedicina' },
    { value: 'Microbiología', viewValue: 'Microbiología'},
  ];

  displayedColumns: string[] = [
    'documentId',
    'targetArea',
    'targetUser',
    'sentDate',
    'type',
    'actions'
  ];

  dataSource = new MatTableDataSource<DocumentDelivery>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    // const uniqueVersions = [...new Set(this.dataSource.data.map(item => item.targetArea))];

    // this.areas = uniqueVersions.sort().map(l => ({
    //   value: l,
    //   viewValue: l
    // }));
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

    this.dataSource.filterPredicate = (data: any, filter: string) => {
    const searchTerms = JSON.parse(filter);

    const matchesSearch = (data.documentId || '').toLowerCase()
                          .includes(searchTerms.text.toLowerCase());

     const matchesArea = searchTerms.area === 'all' || data.targetArea === searchTerms.area;

    return matchesSearch && matchesArea;
  };
  }


  syncFilters() {
    const filterValues = {
      text: this.searchQuery,
      area: this.selectedArea
    };
    this.dataSource.filter = JSON.stringify(filterValues);

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyFilter(event: Event) {
    this.searchQuery = (event.target as HTMLInputElement).value;
    this.syncFilters();
  }
  applySelectAreas(){
    this.syncFilters();
  }

  createNewDocExternal(){}
  resetFilters() {
    this.selectedArea = 'all';
    this.searchQuery = '';
    this.syncFilters();
  }
  // viewDocument(row: any) {
  //   alert(`Detalle de documento: ${row.nombre}`);
  // }

  deleteDocument(element:any){
      this.confirm.delete(element.name).subscribe(confirmed => {

    if (confirmed) {
      const updatedData = this.dataSource.data.filter(item => item !== element);
      this.dataSource.data = updatedData;
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
      console.log('Elemento eliminado visualmente de la tabla');
    }
  });
  }

  getStatusClass(status: string): string {
  switch (status) {
    case 'Vigente':
      return 'bg-green-500';
    case 'Derogado':
      return 'bg-red-500';
    case 'Vencido':
      return 'bg-yellow-500 text-black';
    default:
      return 'bg-gray-400';
  }
}
}

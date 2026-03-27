import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, inject, OnInit, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatOption, MatSelect, MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterModule } from '@angular/router';
import { SectionTitle } from '../../../../shared/components/layout/section-title/section-title';
import { ConfirmDialogService } from '../../../../shared/services/confirm-dialog-service';
import document from '../../json/document.json';
import { DocumentManagemenModel } from '../../models/document-management.model';

interface Version {
  value: string;
  viewValue: string;
}

interface TypeDocument {
  value: string;
  viewValue: string;
}

const ELEMENT_DATA: any  = document.ALL;

export const MATERIAL_MODULES = [
  MatMenuModule,
  MatIconModule,
  MatButtonModule,
  MatTableModule,
  MatPaginatorModule,
  MatTooltipModule,
  MatFormField,
  MatLabel,
  MatFormFieldModule,
  MatSelect,
  MatOption,
  MatInputModule,
  MatSelectModule,
];

@Component({
  selector: 'app-document-management-list',
  imports: [
    ...MATERIAL_MODULES,
    RouterModule,
    CommonModule,
    FormsModule,
    SectionTitle
  ],
  standalone: true,
  templateUrl: './document-management-list.html',
  styles: ``,
})
export class DocumentManagementList implements AfterViewInit, OnInit{

  private readonly confirm = inject(ConfirmDialogService);

  selectedVersion: string = 'all';
  selectedDocumentType: string = 'all';
  searchQuery: string = '';

  isOpen = false;
  selectedOption: string = 'Tipo de Documento';

  @Output() onAction = new EventEmitter<string>();

    versions: Version[] = [
    { value: 'V.01', viewValue: 'Versión 01' },
    { value: 'V.02', viewValue: 'Versión 02' },
    { value: 'V.03', viewValue: 'Versión 03' },
    { value: 'V.04', viewValue: 'Versión 04' },
    { value: 'V.05', viewValue: 'Versión 05' }
  ];

  docutypes: TypeDocument[] = [
    { value: 'POE', viewValue: 'Ver todos los POE' },
    { value: 'ITT', viewValue: 'Ver todos los ITT' },
    { value: 'FOR', viewValue: 'Ver todos los FOR' },
    // { value: 'ITA', viewValue: 'Ver todos los ITA' },
    // { value: 'MAN', viewValue: 'Ver todos los MAN' },
    // { value: 'MET', viewValue: 'Ver todos los MET' },
    // { value: 'NAPRO', viewValue: 'Ver todos los NAPRO' },
    // { value: 'MPOE', viewValue: 'Ver todos los MPOE' },
    // { value: 'PRA', viewValue: 'Ver todos los PRA' },
    // { value: 'PRT', viewValue: 'Ver todos los PRT' }
  ];

// options = [
//     { label: 'POE', value: 'POE', color: 'text-green-600' },
//     { label: 'ITT', value: 'ITT', color: 'text-red-600' },
//     { label: 'FOR', value: 'FOR', color: 'text-blue-600' },
//   ];

//   documentTypes = [
//   { label: 'POE', route: 'poe' },
//   { label: 'ITT', route: 'itt' },
//   { label: 'FOR', route: 'for' }
// ];
// type!: string;
constructor(private router: Router) {}


// ngOnInit() {
//   this.type = this.route.snapshot.paramMap.get('type') || '';
// }

  displayedColumns: string[] = [
    'indexNumber',
    'institutionalProcess',
    'iso15189Requirement',
    'documentCode',
    'documentTitle',
    'editionVersion',
    'elaborators',
    'technicalReviewers',
    'formalReviewers',
    'officializedBy',
    'approvalDocument',
    'approvalDate',
    'revisionHistory',
    'nextRevision',
    'revisionDaysCount',
    'revisionStatus',
    'applicationScope',
    'documentType',
    'actions'
  ];

  dataSource = new MatTableDataSource<DocumentManagemenModel>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    // const uniqueVersions = [...new Set(this.dataSource.data.map(item => item.editionVersion))];

    // this.versions = uniqueVersions.sort().map(v => ({
    //   value: v,
    //   viewValue: v.startsWith('V') ? `Versión ${v}` : `Año ${v}`
    // }));
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

     this.dataSource.filterPredicate = (data: DocumentManagemenModel, filter: string) => {
    const searchTerms = JSON.parse(filter);

    const matchesSearch = (data.documentTitle || '').toLowerCase()
                          .includes(searchTerms.text.toLowerCase());

     const matchesVersion = searchTerms.version === 'all' || data.editionVersion === searchTerms.version;

     const matchesDocumentType = searchTerms.docutype === 'all' ||
       data.documentType === searchTerms.docutype;

    return matchesSearch && matchesVersion && matchesDocumentType;
  };

  }


  // toggleMenu() {
  //   this.isOpen = !this.isOpen;
  // }

// selectOption(option: any) {
//     this.selectedOption = option.label;
//     this.isOpen = false;
//     this.onAction.emit(option.value);

//     const newData = ELEMENT_DATA[option.value];

//     if (newData) {
//       this.dataSource.data = newData;
//       if (this.paginator) {
//         this.paginator.firstPage();
//       }
//     }
//   }

  // closeMenu() {
  //   this.isOpen = false;
  // }

  getStatusClass(status: string): string {
  switch (status) {
    case 'Vigente':
      return 'bg-[#dcfce7] text-[#15803d]'; //verde
    case 'Vencido':
      return 'bg-[#fee2e2] text-[#b91c1c]'; //rojo
    case 'Por vencer':
      return 'bg-[#ffedd5] text-[#c2410c]'; // amarillo
    case 'Derogado':
      return 'bg-[#dddddd] text-[#313131]'; //negro
    default:
      return '';
  }
}


//filtros avanzados
syncFilters() {
    const filterValues = {
      text: this.searchQuery,
      version: this.selectedVersion,
      docutype: this.selectedDocumentType
    };
    this.dataSource.filter = JSON.stringify(filterValues);

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyFilter(event: Event) {
    this.searchQuery = (event.target as HTMLInputElement).value;
    this.syncFilters();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  applySelectEstatus(){
    this.syncFilters();
  }
  applySelectDocType(){
    this.syncFilters();
  }

  goToForm(){
    this.router.navigate(['/document-management/form']);
  }
  resetFilters() {
    this.selectedVersion = 'all';
    this.selectedDocumentType = 'all';
    this.searchQuery = '';
    this.syncFilters();
  }

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

  viewDocument(row: any) {
    alert(`Detalle de documento: ${row.nombre}`);
  }
}

import { CommonModule } from "@angular/common";
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormField, MatFormFieldModule, MatLabel } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatOption, MatSelect, MatSelectModule } from "@angular/material/select";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatTooltipModule } from "@angular/material/tooltip";
import { RouterModule } from "@angular/router";
import { SectionTitle } from "../../../../shared/components/layout/section-title/section-title";
import { DocumentManagemenModel } from '../../models/document-management.model';

interface Version {
  value: string;
  viewValue: string;
}

const ELEMENT_DATA: any[] = [
  { documentTitle: "Norma Técnica de Salud ISO 15189", institutionalProcess: "INACAL", editionVersion: "2022", approvalDate: "2022-11-15", applicationScope: "https://www.inacal.gob.pe/normas", indexNumber: 1, iso15189Requirement: "", documentCode: "", elaborators: "", technicalReviewers: "", formalReviewers: "", officializedBy: "", approvalDocument: "", revisionHistory: "", nextRevision: "", revisionDaysCount: 0, revisionStatus: "" },
  { documentTitle: "Reglamento Interno de Seguridad y Salud", institutionalProcess: "Dirección General", editionVersion: "V.04", approvalDate: "2025-01-10", applicationScope: "https://gob.pe/ins/reglamento-interno", indexNumber: 2, iso15189Requirement: "", documentCode: "", elaborators: "", technicalReviewers: "", formalReviewers: "", officializedBy: "", approvalDocument: "", revisionHistory: "", nextRevision: "", revisionDaysCount: 0, revisionStatus: "" },
  { documentTitle: "Manual de Bioseguridad en Laboratorios", institutionalProcess: "OMS", editionVersion: "V.04", approvalDate: "2024-06-30", applicationScope: "https://who.int/publications/biosafety", indexNumber: 3, iso15189Requirement: "", documentCode: "", elaborators: "", technicalReviewers: "", formalReviewers: "", officializedBy: "", approvalDocument: "", revisionHistory: "", nextRevision: "", revisionDaysCount: 0, revisionStatus: "" },
  { documentTitle: "Guía de Validación de Métodos de Ensayo", institutionalProcess: "UGC - Calidad", editionVersion: "V.02", approvalDate: "2026-02-12", applicationScope: "https://intranet.ins.gob.pe/calidad/guias", indexNumber: 4, iso15189Requirement: "", documentCode: "", elaborators: "", technicalReviewers: "", formalReviewers: "", officializedBy: "", approvalDocument: "", revisionHistory: "", nextRevision: "", revisionDaysCount: 0, revisionStatus: "" },
  { documentTitle: "Directiva de Gestión Documental MINSA", institutionalProcess: "MINSA", editionVersion: "2025", approvalDate: "2025-08-20", applicationScope: "https://minsa.gob.pe/normas-legales", indexNumber: 5, iso15189Requirement: "", documentCode: "", elaborators: "", technicalReviewers: "", formalReviewers: "", officializedBy: "", approvalDocument: "", revisionHistory: "", nextRevision: "", revisionDaysCount: 0, revisionStatus: "" },
  { documentTitle: "Protocolo de Toma de Muestras Covid-19", institutionalProcess: "INS - Perú", editionVersion: "V.06", approvalDate: "2024-12-05", applicationScope: "https://web.ins.gob.pe", indexNumber: 6, iso15189Requirement: "", documentCode: "", elaborators: "", technicalReviewers: "", formalReviewers: "", officializedBy: "", approvalDocument: "", revisionHistory: "", nextRevision: "", revisionDaysCount: 0, revisionStatus: "" },
  { documentTitle: "Guía de Manejo de Residuos Sólidos", institutionalProcess: "MINAM", editionVersion: "2024", approvalDate: "2024-03-18", applicationScope: "https://minam.gob.pe", indexNumber: 7, iso15189Requirement: "", documentCode: "", elaborators: "", technicalReviewers: "", formalReviewers: "", officializedBy: "", approvalDocument: "", revisionHistory: "", nextRevision: "", revisionDaysCount: 0, revisionStatus: "" },
  { documentTitle: "Manual de Procedimientos de Laboratorio", institutionalProcess: "UGC - Calidad", editionVersion: "V.03", approvalDate: "2025-11-12", applicationScope: "https://intranet.ins.gob.pe", indexNumber: 8, iso15189Requirement: "", documentCode: "", elaborators: "", technicalReviewers: "", formalReviewers: "", officializedBy: "", approvalDocument: "", revisionHistory: "", nextRevision: "", revisionDaysCount: 0, revisionStatus: "" },
  { documentTitle: "Norma ISO 9001:2015 Gestión de Calidad", institutionalProcess: "ISO Central", editionVersion: "2015", approvalDate: "2015-09-15", applicationScope: "https://iso.org", indexNumber: 9, iso15189Requirement: "", documentCode: "", elaborators: "", technicalReviewers: "", formalReviewers: "", officializedBy: "", approvalDocument: "", revisionHistory: "", nextRevision: "", revisionDaysCount: 0, revisionStatus: "" },
  { documentTitle: "Reglamento de Control Metrológico", institutionalProcess: "INACAL", editionVersion: "V.02", approvalDate: "2026-01-22", applicationScope: "https://inacal.gob.pe", indexNumber: 10, iso15189Requirement: "", documentCode: "", elaborators: "", technicalReviewers: "", formalReviewers: "", officializedBy: "", approvalDocument: "", revisionHistory: "", nextRevision: "", revisionDaysCount: 0, revisionStatus: "" },
  { documentTitle: "Directiva de Ética en Investigación", institutionalProcess: "CONCYTEC", editionVersion: "V.01", approvalDate: "2024-07-09", applicationScope: "https://concytec.gob.pe", indexNumber: 11, iso15189Requirement: "", documentCode: "", elaborators: "", technicalReviewers: "", formalReviewers: "", officializedBy: "", approvalDocument: "", revisionHistory: "", nextRevision: "", revisionDaysCount: 0, revisionStatus: "" },
  { documentTitle: "Manual de Organización y Funciones", institutionalProcess: "Recursos Humanos", editionVersion: "2026", approvalDate: "2026-01-05", applicationScope: "https://gob.pe", indexNumber: 12, iso15189Requirement: "", documentCode: "", elaborators: "", technicalReviewers: "", formalReviewers: "", officializedBy: "", approvalDocument: "", revisionHistory: "", nextRevision: "", revisionDaysCount: 0, revisionStatus: "" },
  { documentTitle: "Guía de Usuario Sistema de Vigilancia", institutionalProcess: "OTI - Sistemas", editionVersion: "V.05", approvalDate: "2025-05-14", applicationScope: "https://vigilancia.ins.gob.pe", indexNumber: 13, iso15189Requirement: "", documentCode: "", elaborators: "", technicalReviewers: "", formalReviewers: "", officializedBy: "", approvalDocument: "", revisionHistory: "", nextRevision: "", revisionDaysCount: 0, revisionStatus: "" },
  { documentTitle: "Protocolo de Bioseguridad Nivel 3", institutionalProcess: "OMS", editionVersion: "V.02", approvalDate: "2024-10-30", applicationScope: "https://who.int", indexNumber: 14, iso15189Requirement: "", documentCode: "", elaborators: "", technicalReviewers: "", formalReviewers: "", officializedBy: "", approvalDocument: "", revisionHistory: "", nextRevision: "", revisionDaysCount: 0, revisionStatus: "" },
  { documentTitle: "Normativa de Telemedicina 2025", institutionalProcess: "MINSA", editionVersion: "2025", approvalDate: "2025-02-28", applicationScope: "https://minsa.gob.pe", indexNumber: 15, iso15189Requirement: "", documentCode: "", elaborators: "", technicalReviewers: "", formalReviewers: "", officializedBy: "", approvalDocument: "", revisionHistory: "", nextRevision: "", revisionDaysCount: 0, revisionStatus: "" },
  { documentTitle: "Plan Estratégico Institucional", institutionalProcess: "Planeamiento", editionVersion: "V.03", approvalDate: "2023-12-20", applicationScope: "https://gob.pe", indexNumber: 16, iso15189Requirement: "", documentCode: "", elaborators: "", technicalReviewers: "", formalReviewers: "", officializedBy: "", approvalDocument: "", revisionHistory: "", nextRevision: "", revisionDaysCount: 0, revisionStatus: "" },
  { documentTitle: "Guía de Mantenimiento de Equipos", institutionalProcess: "Logística", editionVersion: "V.01", approvalDate: "2025-09-15", applicationScope: "https://intranet.ins.gob.pe", indexNumber: 17, iso15189Requirement: "", documentCode: "", elaborators: "", technicalReviewers: "", formalReviewers: "", officializedBy: "", approvalDocument: "", revisionHistory: "", nextRevision: "", revisionDaysCount: 0, revisionStatus: "" },
  { documentTitle: "Manual de Farmacovigilancia", institutionalProcess: "DIGEMID", editionVersion: "2024", approvalDate: "2024-08-11", applicationScope: "https://digemid.minsa.gob.pe", indexNumber: 18, iso15189Requirement: "", documentCode: "", elaborators: "", technicalReviewers: "", formalReviewers: "", officializedBy: "", approvalDocument: "", revisionHistory: "", nextRevision: "", revisionDaysCount: 0, revisionStatus: "" },
  { documentTitle: "Directiva de Archivo Central", institutionalProcess: "Archivo de la Nación", editionVersion: "V.02", approvalDate: "2025-06-25", applicationScope: "https://agn.gob.pe", indexNumber: 19, iso15189Requirement: "", documentCode: "", elaborators: "", technicalReviewers: "", formalReviewers: "", officializedBy: "", approvalDocument: "", revisionHistory: "", nextRevision: "", revisionDaysCount: 0, revisionStatus: "" },
  { documentTitle: "Protocolo de Emergencias Químicas", institutionalProcess: "Seguridad Industrial", editionVersion: "V.04", approvalDate: "2026-03-01", applicationScope: "https://intranet.ins.gob.pe", indexNumber: 20, iso15189Requirement: "", documentCode: "", elaborators: "", technicalReviewers: "", formalReviewers: "", officializedBy: "", approvalDocument: "", revisionHistory: "", nextRevision: "", revisionDaysCount: 0, revisionStatus: "" }
];



@Component({
  selector: 'app-document-management-external-documents',
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
  templateUrl: './document-management-external-documents.html',
  styles: ``,
})
export class DocumentManagementExternalDocuments implements AfterViewInit, OnInit {

  selectedVersion: string = 'all';
  searchQuery: string = '';

  isOpen = false;
  selectedOption: string = 'Tipo de Documento';

  versions: Version[] = [
    { value: 'V.01', viewValue: 'Versión 01' },
    { value: 'V.02', viewValue: 'Versión 02' },
    { value: 'V.03', viewValue: 'Versión 03' },
    { value: 'V.04', viewValue: 'Versión 04' },
    { value: 'V.05', viewValue: 'Versión 05' },
    { value: '2015', viewValue: 'Año 2015' },
    { value: '2022', viewValue: 'Año 2022' },
    { value: '2024', viewValue: 'Año 2024' },
    { value: '2025', viewValue: 'Año 2025' },
    { value: '2026', viewValue: 'Año 2026' }
  ];

  displayedColumns: string[] = [
    'documentTitle',      // antes 'nombre'
    'institutionalProcess', // antes 'fuente'
    'editionVersion',     // antes 'version'
    'approvalDate',       // antes 'fecha'
    'applicationScope',   // antes 'enlace'
    'actions'
  ];

  dataSource = new MatTableDataSource<DocumentManagemenModel>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    const uniqueVersions = [...new Set(this.dataSource.data.map(item => item.editionVersion))];

    this.versions = uniqueVersions.sort().map(v => ({
      value: v,
      viewValue: v.startsWith('V') ? `Versión ${v}` : `Año ${v}`
    }));
  }

ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;

  this.dataSource.filterPredicate = (data: DocumentManagemenModel, filter: string) => {
    const searchTerms = JSON.parse(filter);

    const matchesSearch = (data.documentTitle || '').toLowerCase()
                          .includes(searchTerms.text.toLowerCase());

     const matchesVersion = searchTerms.version === 'all' || data.editionVersion === searchTerms.version;

    return matchesSearch && matchesVersion;
  };
}


  syncFilters() {
    const filterValues = {
      text: this.searchQuery,
      version: this.selectedVersion
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
  applySelectEstatus(){
    this.syncFilters();
  }

  createNewDocExternal(){}
  resetFilters() {
    this.selectedVersion = 'all';
    this.searchQuery = '';
    this.syncFilters();
  }
  viewDocument(row: any) {
    alert(`Detalle de documento: ${row.nombre}`);
  }
}

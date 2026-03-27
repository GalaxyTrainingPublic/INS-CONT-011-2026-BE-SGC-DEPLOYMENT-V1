import { CommonModule } from "@angular/common";
import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
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
import { NOTIFY_MSG } from '../../../../core/constants/notify.constant';
import { NotifyService } from "../../../../core/services/notify-service";
import { SectionTitle } from "../../../../shared/components/layout/section-title/section-title";
import { ConfirmDialogService } from "../../../../shared/services/confirm-dialog-service";
interface TypeDocument {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-document-management-records-management',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    CommonModule,
    RouterModule,
    SectionTitle,
    MatFormField,
    MatLabel,
    MatOption,
    MatSelect,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatTooltipModule
  ],
  standalone: true,
  templateUrl: './document-management-records-management.html',
  styles: ``,
})
export class DocumentManagementRecordsManagement implements AfterViewInit{

  private readonly confirm = inject(ConfirmDialogService);
  private readonly notify  = inject(NotifyService);

  selectedTypeDocument: string = 'all';
  searchQuery: string = '';

  typesDocuments: TypeDocument[] = [
    { value: 'POE', viewValue: 'Ver todos los POE' },
    { value: 'ITT', viewValue: 'Ver todos los ITT' },
    { value: 'FOR', viewValue: 'Ver todos los FOR' },
    // { value: 'ITA', viewValue: 'Ver todos los ITA' },
    // { value: 'MAN', viewValue: 'Ver todos los MAN' },
    // { value: 'MET', viewValue: 'Ver todos los MET' },
    // { value: 'NAPRO', viewValue: 'Ver todos los NAPRO' },
    // { value: 'MPOE', viewValue: 'Ver todos los MPOE' },
    // { value: 'PRA', viewValue: 'Ver todos los PRA'},
    // { value: 'PRT', viewValue: 'Ver todos los PRT'}
  ];


  displayedColumns: string[] = [
    'typeDocument',
    'name',
    // 'type',
    'responsible',
    'retentionTime',
    'location',
    'actions'
  ];

  // dataSource = new MatTableDataSource<DocumentManagemenModel>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const searchTerms = JSON.parse(filter);

      const matchesSearch = (data.name || '').toLowerCase().includes(searchTerms.text.toLowerCase());

      const matchesType  = searchTerms.typesDocument === 'all' || data.typeDocument === searchTerms.typesDocument;

      return matchesSearch && matchesType ;
    };
  }

  dataSource = new MatTableDataSource([
    // { name: 'Registro de Asesoría Anual', type: 'Formulario', responsible: 'Blga. Evonny Durand Salvatierra', retentionTime: '15/03/2024', location: 'Archivo Físico UGC' },
    // { name: 'Manual de Calidad del CNSP', type: 'Manual', responsible: 'Ing. Ana Rosa Zeppilli Díaz', retentionTime: '01/01/2023', location: 'Servidor Central SGC' },
    // { name: 'POE Control de Documentos', type: 'Procedimiento', responsible: 'Blgo. Joseph Huayra Niquén', retentionTime: '12/11/2023', location: 'Carpeta de Calidad Sala 1' },
    // { name: 'Método Elisa Leptospira', type: 'Método de Ensayo', responsible: 'Blga. Patricia García Vara', retentionTime: '20/02/2024', location: 'Laboratorio de Zoonosis' },
    // { name: 'Instructivo Microscopio Binocular', type: 'Instructivo', responsible: 'T.M. Maritza Puray Chávez', retentionTime: '10/05/2023', location: 'Área de Microbiología' },
    // { name: 'Informe de Auditoría Interna 2025', type: 'Informe', responsible: 'Lic. Ricardo Vilchez', retentionTime: '25/01/2025', location: 'Nube Digital' },
    // { name: 'Bitácora de Calibración de Equipos', type: 'Bitácora', responsible: 'Ing. Marcos Segura', retentionTime: '14/06/2023', location: 'Laboratorio de Metrología' },
    // { name: 'Plan de Gestión de Seguridad', type: 'Plan', responsible: 'Dra. Carmen Rosa', retentionTime: '30/09/2023', location: 'Oficina de Seguridad' },
    // { name: 'Matriz de Capacitación del Personal', type: 'Formulario', responsible: 'Psic. Elena Torres', retentionTime: '11/03/2024', location: 'Servidor RRHH' },
    // { name: 'Protocolo de Identificación Bacteriana', type: 'Procedimiento', responsible: 'Blgo. Luis Alberto', retentionTime: '05/02/2024', location: 'Laboratorio de Bacteriología' },
    // { name: 'Desglose de Presupuesto Mensual', type: 'Informe', responsible: 'CPCC Juana Rivas', retentionTime: '02/01/2024', location: 'Archivo de Administración' },
    // { name: 'Lista de Inventario de Reactivos', type: 'Formulario', responsible: 'Quim. Roberto Díaz', retentionTime: '18/02/2024', location: 'Almacén 02' },
    // { name: 'Política de Calidad 2026', type: 'Manual', responsible: 'Ing. Ana Rosa Zeppilli Díaz', retentionTime: '15/12/2023', location: 'Web Institucional' },
    // { name: 'Guía de Mantenimiento de Centrífuga', type: 'Instructivo', responsible: 'Ing. Fabio Luna', retentionTime: '22/07/2023', location: 'Área Biomédica' },
    // { name: 'Registro de Transporte de Muestras', type: 'Bitácora', responsible: 'Téc. Mario Casas', retentionTime: '09/08/2023', location: 'Mesa de Recepción' },
    // { name: 'Plan de Acción de Emergencias', type: 'Plan', responsible: 'Lic. Sara Paredes', retentionTime: '14/04/2023', location: 'Puesto de Seguridad' },
    // { name: 'Evaluación de Calidad Externa', type: 'Informe', responsible: 'Blga. Evonny Durand', retentionTime: '21/10/2023', location: 'Oficina Principal UGC' },
    // { name: 'Lista de Verificación de Cabina', type: 'Formulario', responsible: 'Blgo. Carlos Mendez', retentionTime: '05/05/2023', location: 'Laboratorio de Virología' },
    // { name: 'Protocolo de Eliminación de Residuos', type: 'Procedimiento', responsible: 'Ing. Silvia Soto', retentionTime: '19/09/2023', location: 'Depto. Ambiental' },
    // { name: 'Manual de Biología Molecular', type: 'Manual', responsible: 'Dr. Enrique Paz', retentionTime: '03/03/2024', location: 'Área Molecular' },
    // { name: 'Formulario de Evaluación de Proveedores', type: 'Formulario', responsible: 'Lic. Pedro Gomez', retentionTime: '17/01/2024', location: 'Carpeta de Logística' },
    // { name: 'Encuesta de Satisfacción del Cliente', type: 'Informe', responsible: 'Mag. Monica Ruiz', retentionTime: '12/12/2023', location: 'Atención al Cliente' },
    // { name: 'POE de Espectrofotómetro', type: 'Procedimiento', responsible: 'Quim. Ana Lucia', retentionTime: '08/06/2023', location: 'Laboratorio Químico' },
    // { name: 'Guía de Lavado de Material de Vidrio', type: 'Instructivo', responsible: 'Téc. Rosa Luna', retentionTime: '25/04/2023', location: 'Área de Lavado' },
    // { name: 'Registro de Acciones Correctivas', type: 'Formulario', responsible: 'Ing. Ana Rosa Zeppilli Díaz', retentionTime: '28/02/2024', location: 'Carpeta Digital SGC' }
    { typeDocument: "FOR", name: 'Registro de Asesoría Anual', type: 'Formulario', responsible: 'Blga. Evonny Durand Salvatierra', retentionTime: '15/03/2024', location: 'Archivo Físico UGC' },
  { typeDocument: "MAN", name: 'Manual de Calidad del CNSP', type: 'Manual', responsible: 'Ing. Ana Rosa Zeppilli Díaz', retentionTime: '01/01/2023', location: 'Servidor Central SGC' },
  { typeDocument: "POE", name: 'POE Control de Documentos', type: 'Procedimiento', responsible: 'Blgo. Joseph Huayra Niquén', retentionTime: '12/11/2023', location: 'Carpeta de Calidad Sala 1' },
  { typeDocument: "MET", name: 'Método Elisa Leptospira', type: 'Método de Ensayo', responsible: 'Blga. Patricia García Vara', retentionTime: '20/02/2024', location: 'Laboratorio de Zoonosis' },
  { typeDocument: "ITT", name: 'Instructivo Microscopio Binocular', type: 'Instructivo', responsible: 'T.M. Maritza Puray Chávez', retentionTime: '10/05/2023', location: 'Área de Microbiología' },
  { typeDocument: "ITA", name: 'Informe de Auditoría Interna 2025', type: 'Informe', responsible: 'Lic. Ricardo Vilchez', retentionTime: '25/01/2025', location: 'Nube Digital' },
  { typeDocument: "FOR", name: 'Bitácora de Calibración de Equipos', type: 'Bitácora', responsible: 'Ing. Marcos Segura', retentionTime: '14/06/2023', location: 'Laboratorio de Metrología' },
  { typeDocument: "PRA", name: 'Plan de Gestión de Seguridad', type: 'Plan', responsible: 'Dra. Carmen Rosa', retentionTime: '30/09/2023', location: 'Oficina de Seguridad' },
  { typeDocument: "FOR", name: 'Matriz de Capacitación del Personal', type: 'Formulario', responsible: 'Psic. Elena Torres', retentionTime: '11/03/2024', location: 'Servidor RRHH' },
  { typeDocument: "POE", name: 'Protocolo de Identificación Bacteriana', type: 'Procedimiento', responsible: 'Blgo. Luis Alberto', retentionTime: '05/02/2024', location: 'Laboratorio de Bacteriología' },
  { typeDocument: "ITA", name: 'Desglose de Presupuesto Mensual', type: 'Informe', responsible: 'CPCC Juana Rivas', retentionTime: '02/01/2024', location: 'Archivo de Administración' },
  { typeDocument: "FOR", name: 'Lista de Inventario de Reactivos', type: 'Formulario', responsible: 'Quim. Roberto Díaz', retentionTime: '18/02/2024', location: 'Almacén 02' },
  { typeDocument: "MAN", name: 'Política de Calidad 2026', type: 'Manual', responsible: 'Ing. Ana Rosa Zeppilli Díaz', retentionTime: '15/12/2023', location: 'Web Institucional' },
  { typeDocument: "ITT", name: 'Guía de Mantenimiento de Centrífuga', type: 'Instructivo', responsible: 'Ing. Fabio Luna', retentionTime: '22/07/2023', location: 'Área Biomédica' },
  { typeDocument: "FOR", name: 'Registro de Transporte de Muestras', type: 'Bitácora', responsible: 'Téc. Mario Casas', retentionTime: '09/08/2023', location: 'Mesa de Recepción' },
  { typeDocument: "PRA", name: 'Plan de Acción de Emergencias', type: 'Plan', responsible: 'Lic. Sara Paredes', retentionTime: '14/04/2023', location: 'Puesto de Seguridad' },
  { typeDocument: "ITA", name: 'Evaluación de Calidad Externa', type: 'Informe', responsible: 'Blga. Evonny Durand', retentionTime: '21/10/2023', location: 'Oficina Principal UGC' },
  { typeDocument: "FOR", name: 'Lista de Verificación de Cabina', type: 'Formulario', responsible: 'Blgo. Carlos Mendez', retentionTime: '05/05/2023', location: 'Laboratorio de Virología' },
  { typeDocument: "POE", name: 'Protocolo de Eliminación de Residuos', type: 'Procedimiento', responsible: 'Ing. Silvia Soto', retentionTime: '19/09/2023', location: 'Depto. Ambiental' },
  { typeDocument: "MAN", name: 'Manual de Biología Molecular', type: 'Manual', responsible: 'Dr. Enrique Paz', retentionTime: '03/03/2024', location: 'Área Molecular' },
  { typeDocument: "FOR", name: 'Formulario de Evaluación de Proveedores', type: 'Formulario', responsible: 'Lic. Pedro Gomez', retentionTime: '17/01/2024', location: 'Carpeta de Logística' },
  { typeDocument: "ITA", name: 'Encuesta de Satisfacción del Cliente', type: 'Informe', responsible: 'Mag. Monica Ruiz', retentionTime: '12/12/2023', location: 'Atención al Cliente' },
  { typeDocument: "POE", name: 'POE de Espectrofotómetro', type: 'Procedimiento', responsible: 'Quim. Ana Lucia', retentionTime: '08/06/2023', location: 'Laboratorio Químico' },
  { typeDocument: "ITT", name: 'Guía de Lavado de Material de Vidrio', type: 'Instructivo', responsible: 'Téc. Rosa Luna', retentionTime: '25/04/2023', location: 'Área de Lavado' },
  { typeDocument: "FOR", name: 'Registro de Acciones Correctivas', type: 'Formulario', responsible: 'Ing. Ana Rosa Zeppilli Díaz', retentionTime: '28/02/2024', location: 'Carpeta Digital SGC' }
  ]);


  syncFilters() {
    const filterValues = {
      text: this.searchQuery,
      typesDocument: this.selectedTypeDocument
    };
    this.dataSource.filter = JSON.stringify(filterValues);

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  resetFilters() {
    this.selectedTypeDocument = 'all';
    this.searchQuery = '';
    this.syncFilters();
  }

  applyFilter(event: Event) {
    this.searchQuery = (event.target as HTMLInputElement).value;
    this.syncFilters();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  applySelectTypesDocument(){
    this.syncFilters();
  }
  createNewDocument(){
    console.log('Crear nuevo documento');
  }

  deleteDocument(element:any){
  this.confirm.delete(element.name).subscribe(confirmed => {

    if (confirmed) {
      const updatedData = this.dataSource.data.filter(item => item !== element);
      this.dataSource.data = updatedData;
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
      const mensaje = NOTIFY_MSG.DELETE_SUCCESS(element.name);
      this.notify.show(mensaje, 'success');
      console.log(`El documento  ${element.name} ha sido eliminado de la tabla`);
    }
  });
  }
}

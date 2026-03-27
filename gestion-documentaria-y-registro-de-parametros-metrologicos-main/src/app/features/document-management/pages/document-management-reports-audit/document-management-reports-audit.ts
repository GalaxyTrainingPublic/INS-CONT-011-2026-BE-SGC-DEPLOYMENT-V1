import { CommonModule } from "@angular/common";
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { RouterModule } from "@angular/router";
import { DocumentManagemenModel } from '../../models/document-management.model';



const ELEMENT_DATA: any  = [
]


@Component({
  selector: 'app-document-management-reports-audit',
  imports: [MatButtonModule, MatIconModule,MatTableModule, MatPaginatorModule, CommonModule, RouterModule ],
  standalone: true,
  templateUrl: './document-management-reports-audit.html',
  styles: ``,
})
export class DocumentManagementReportsAudit implements AfterViewInit{



  displayedColumns: string[] = [
    'nombre',
    'tipo',
    'responsable',
    'tiempoRetencion',
    'ubicacion',
  ];

  dataSource = new MatTableDataSource<DocumentManagemenModel>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


}

import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DocumentManagemenModel } from '../../models/document-management.model';


const ELEMENT_DATA: any = [
   { version: 'V1', date: '2024-01-01', status: 'Vencido' },
  { version: 'V2', date: '2025-01-01', status: 'Vigente' }
]
@Component({
  selector: 'app-document-management-version',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './document-management-versions.html'
})
export class DocumentManagementVersions implements AfterViewInit{

  versions = [
    { version: 'V1', date: '2024-01-01', status: 'Vencido' },
    { version: 'V2', date: '2025-01-01', status: 'Vigente' }
  ];

   displayedColumns: string[] = [
    'version',
    'date',
    'status',
  ];

  dataSource = new MatTableDataSource<DocumentManagemenModel>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}

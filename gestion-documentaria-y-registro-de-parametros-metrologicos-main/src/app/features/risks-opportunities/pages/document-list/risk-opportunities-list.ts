import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';


const DATA = [
  {
    process: 'Análisis',
    subProcess: 'Gestión de documentos',
    task: 'Regsitro de documentos',
    riskOrOpportunity: 'Riesgo',
    description:'Mal llenado de registros compartidos (Plataforma)',
    causes:'Cambio en el flujo de trabajo en el Laboratorio de Microbilogía y Biomedicina',
    consequences:'Inadecuada Trazabilidad documentaria',
    inherentValue:{
        probability:8,
        impact:4,
        value:32,
        risk:'M',
        oportunity:''
    }
  }
];

@Component({
  selector: 'app-risk-opportunities-list',
  imports: [MatButtonModule, MatIconModule,MatTableModule, MatPaginatorModule],
  templateUrl: './risk-opportunities-list.html',
  styles: ``,
})
export class RisksOpportunitiesList implements AfterViewInit{
  displayedColumns: string[] = [
    'process',
    'subProcess',
    'task',
    'riskOrOpportunity',
    'description',
    'causes',
    'consequences'
  ];
  dataSource = new MatTableDataSource(DATA);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}

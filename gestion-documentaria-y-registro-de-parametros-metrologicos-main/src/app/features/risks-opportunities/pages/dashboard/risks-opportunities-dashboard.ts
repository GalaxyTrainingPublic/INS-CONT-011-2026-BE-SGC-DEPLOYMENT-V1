import { CommonModule, registerLocaleData } from '@angular/common';
import { Component, OnInit, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import localeEs from '@angular/common/locales/es';
import { RiskService } from '../../services/risk.service';
import { Risk } from '../../models/risk.model';

registerLocaleData(localeEs);

@Component({
  selector: 'app-risks-opportunities-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [{ provide: LOCALE_ID, useValue: 'es-PE' }],
  templateUrl: './risks-opportunities-dashboard.html',
  styleUrls: ['./risks-opportunities-dashboard.scss']
})
export class RisksOpportunitiesDashboard implements OnInit {
  today: Date = new Date();
  allRisks: Risk[] = [];
  filteredRisks: Risk[] = [];
  
  // Filtros
  selectedLab: string = 'Todos';
  labs: string[] = ['Todos', 'Metrología', 'Calibración masa', 'Calibración volumen', 'Química'];

  // Configuración de Matriz Dinámica
  matrixSize: number = 5; // Puedes cambiar esto a 3 o 4
  likelihoodLevels: string[] = [];
  impactLevels: string[] = [];
  matrix: number[][] = [];

  stats = { total: 0, critical: 0, efficiency: 0, pendingActions: 0 };

  constructor(private riskService: RiskService) {}

  ngOnInit(): void {
    this.setupMatrixLabels();
    this.loadData();
  }

  // Configura los labels según el tamaño N de la matriz
  setupMatrixLabels(): void {
    const labelsP = ['Muy Posible', 'Posible', 'Ocasional', 'Probable', 'Improbable'];
    const labelsI = ['Muy Bajo', 'Bajo', 'Medio', 'Alto', 'Crítico'];
    
    // Ajustamos los niveles según el tamaño deseado (slice)
    this.likelihoodLevels = labelsP.slice(0, this.matrixSize);
    this.impactLevels = labelsI.slice(0, this.matrixSize);
    this.matrix = Array(this.matrixSize).fill(0).map(() => Array(this.matrixSize).fill(0));
  }

  loadData(): void {
    this.riskService.getRisks().subscribe({
      next: (data) => {
        this.allRisks = data;
        this.applyFilters();
      }
    });
  }

  applyFilters(): void {
    this.filteredRisks = this.selectedLab === 'Todos' 
      ? this.allRisks 
      : this.allRisks.filter(r => r.process === this.selectedLab || r.subprocess === this.selectedLab);
    
    this.calculateStats();
    this.calculateHeatmap();
  }

  calculateStats(): void {
    this.stats.total = this.filteredRisks.length;
    this.stats.critical = this.filteredRisks.filter(r => r.level === 'Alto' || r.level === 'Muy alto').length;
    this.stats.efficiency = 78; // Simulado
    this.stats.pendingActions = this.filteredRisks.reduce((acc, r) => acc + (r.actions?.filter(a => a.status !== 'cerrado').length || 0), 0);
  }

  calculateHeatmap(): void {
    this.matrix = Array(this.matrixSize).fill(0).map(() => Array(this.matrixSize).fill(0));
    
    this.filteredRisks.forEach(risk => {
      // Mapeo simple: asumiendo que el valor de impacto/probabilidad escala con el tamaño
      const y = Math.min(Math.floor(risk.probability / (10 / this.matrixSize)), this.matrixSize - 1);
      const x = Math.min(Math.floor(risk.impact / (10 / this.matrixSize)), this.matrixSize - 1);
      
      // Invertimos Y para que el valor más alto esté arriba
      const invertedY = (this.matrixSize - 1) - y;
      if (this.matrix[invertedY] && this.matrix[invertedY][x] !== undefined) {
        this.matrix[invertedY][x]++;
      }
    });
  }

  getCellColor(y: number, x: number): string {
    const val = (this.matrixSize - 1 - y) + x; 
    const threshold = this.matrixSize;
    if (val >= threshold + 1) return 'red';
    if (val >= threshold - 1) return 'orange';
    if (val >= threshold - 3) return 'yellow';
    return 'green';
  }

  changeSize(size: number) {
    this.matrixSize = size;
    this.setupMatrixLabels();
    this.calculateHeatmap();
  }

  processStats = [
    { name: 'Metrología', count: 8, percentage: 85 },
    { name: 'Calibración masa', count: 5, percentage: 60 },
    { name: 'Química', count: 3, percentage: 30 }
  ];

  activityLogs = [
    { date: new Date(), user: 'Sist. Gestión', action: 'Cierre de acción correctiva #102', status: 'green' },
    { date: new Date(), user: 'Admin', action: 'Nuevo riesgo: Fallo de software', status: 'blue' }
  ];
}
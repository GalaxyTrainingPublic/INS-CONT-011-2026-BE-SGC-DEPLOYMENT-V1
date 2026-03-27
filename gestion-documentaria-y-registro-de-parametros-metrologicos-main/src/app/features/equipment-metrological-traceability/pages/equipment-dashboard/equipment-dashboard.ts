import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Definimos una interfaz para mayor orden (tipado fuerte)
interface Equipment {
  id: number;
  code: string;
  name: string;
  brand: string;
  model: string;
  lastCalibration: Date;
  nextCalibration: Date;
  status?: 'calibrado' | 'vencido' | 'pendiente';
}

@Component({
  selector: 'app-equipment-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './equipment-dashboard.html',
  styleUrls: ['./equipment-dashboard.scss']
})
export class EquipmentDashboardComponent implements OnInit {
  
  allEquipments: Equipment[] = [
    { id: 1, code: 'BAL-001', name: 'Balanza Analítica', brand: 'Ohaus', model: 'PX224', lastCalibration: new Date(2025, 5, 10), nextCalibration: new Date(2026, 5, 10) },
    { id: 2, code: 'PHM-022', name: 'Potenciómetro Digital', brand: 'Hanna', model: 'HI5221', lastCalibration: new Date(2025, 1, 15), nextCalibration: new Date(2026, 1, 15) },
    { id: 3, code: 'STF-005', name: 'Estufa de Secado', brand: 'Memmert', model: 'UN55', lastCalibration: new Date(2025, 3, 20), nextCalibration: new Date(2026, 3, 20) },
    { id: 4, code: 'MIC-010', name: 'Microscopio Binocular', brand: 'Zeiss', model: 'Primo Star', lastCalibration: new Date(2025, 8, 5), nextCalibration: new Date(2026, 8, 5) }
  ];

  filteredEquipments: Equipment[] = [];
  searchTerm: string = '';

  // Getters para métricas del encabezado
  get totalEquipments(): number { 
    return this.allEquipments.length; 
  }

  get expiredCount(): number { 
    return this.allEquipments.filter(e => this.getEquipmentStatus(e.nextCalibration) === 'vencido').length; 
  }

  ngOnInit() {
    this.refreshDashboard();
  }

  /**
   * Inicializa y procesa los estados de los equipos
   */
  refreshDashboard() {
    // Mapeamos los equipos para asignarles su estado dinámico antes de mostrarlos
    this.allEquipments = this.allEquipments.map(e => ({
      ...e,
      status: this.getEquipmentStatus(e.nextCalibration)
    }));
    this.filteredEquipments = [...this.allEquipments];
  }

  /**
   * Lógica de negocio para determinar el estado metrológico
   */
  getEquipmentStatus(nextCal: Date): 'calibrado' | 'vencido' | 'pendiente' {
    const today = new Date();
    // Normalizamos las fechas a medianoche para comparar solo días
    today.setHours(0, 0, 0, 0);
    const next = new Date(nextCal);
    next.setHours(0, 0, 0, 0);

    const diffTime = next.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return 'vencido';
    if (diffDays <= 30) return 'pendiente'; // Alerta si faltan 30 días o menos
    return 'calibrado';
  }

  /**
   * Filtro de búsqueda optimizado
   */
  onSearch() {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) {
      this.filteredEquipments = [...this.allEquipments];
      return;
    }

    this.filteredEquipments = this.allEquipments.filter(e => 
      e.name.toLowerCase().includes(term) || 
      e.code.toLowerCase().includes(term) ||
      e.brand.toLowerCase().includes(term)
    );
  }

  viewDetail(item: Equipment) {
    console.log(`Abriendo historial del equipo: ${item.code} - ${item.name}`);
    // Aquí podrías usar el Router para navegar: this.router.navigate(['/detail', item.id]);
  }
}
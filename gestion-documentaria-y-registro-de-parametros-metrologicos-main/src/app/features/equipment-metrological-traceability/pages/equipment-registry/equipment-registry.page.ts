import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Equipment } from '../../models/equipment.model';

@Component({
  selector: 'app-equipment-registry',
  standalone: true,
  imports: [CommonModule, FormsModule, MatPaginatorModule],
  templateUrl: './equipment-registry.page.html',
  styleUrls: ['./equipment-registry.page.scss']
})
export class EquipmentRegistryPage implements OnInit {

  // Datos de la tabla
  allEquipments: Equipment[] = [
    {
      id: '1',
      internalCode: 'EQ-MET-001',
      campus: 'Sede Central',
      laboratory: 'Metrología',
      specificLocation: 'Área A1',
      name: 'Balanza Analítica',
      description: 'Balanza de alta precisión',
      patrimonialCode: '74081020',
      brand: 'Mettler',
      model: 'XPR204',
      series: 'SN123456',
      entryDateTime: new Date('2024-01-15'),
      category: 'Medición',
      status: 'Operativo',
      imageUrl: '' // Campo para la imagen
    },
    {
      id: '2',
      internalCode: 'EQ-BIO-242',
      campus: 'Sede Norte',
      laboratory: 'Biomédica',
      specificLocation: 'Piso 2',
      name: 'Centrífuga Refrigerada',
      description: 'Equipo para separación de muestras',
      patrimonialCode: '74085566',
      brand: 'Eppendorf',
      model: '5424R',
      series: 'SN789012',
      entryDateTime: new Date('2023-11-20'),
      category: 'Soporte',
      status: 'En mantenimiento',
      imageUrl: ''
    }
  ];

  filteredEquipments: Equipment[] = [];
  paginatedEquipments: Equipment[] = [];
  
  // Imagen
  previewImage: string | null = null;

  // Estado del Modal
  showModal = false;
  isEditing = false;
  currentEquipment: any = {};

  // Filtros y Listas
  filter = { term: '', lab: 'Todos', category: 'Todos', status: 'Todos' };
  labs = ['Todos', 'Metrología', 'Biomédica', 'Ensayo', 'Calidad'];
  categories = ['Todos', 'Analítico', 'Medición', 'Soporte', 'Refrigeración'];

  ngOnInit(): void {
    this.applyFilters();
  }

  applyFilters() {
    this.filteredEquipments = this.allEquipments.filter(eq => {
      const term = this.filter.term.toLowerCase();
      const matchTerm = eq.name.toLowerCase().includes(term) || 
                        eq.internalCode.toLowerCase().includes(term) ||
                        (eq.series && eq.series.toLowerCase().includes(term));
      
      const matchLab = this.filter.lab === 'Todos' || eq.laboratory === this.filter.lab;
      const matchCategory = this.filter.category === 'Todos' || eq.category === this.filter.category;
      const matchStatus = this.filter.status === 'Todos' || eq.status.toUpperCase() === this.filter.status.toUpperCase();
      
      return matchTerm && matchLab && matchStatus && matchCategory;
    });
    this.updatePagination(0, 10);
  }

  updatePagination(startIndex: number, pageSize: number) {
    this.paginatedEquipments = this.filteredEquipments.slice(startIndex, startIndex + pageSize);
  }

  onPageChange(event: PageEvent) {
    this.updatePagination(event.pageIndex * event.pageSize, event.pageSize);
  }

  getStatusClass(status: string): string {
    const s = status ? status.toUpperCase() : '';
    if (s === 'OPERATIVO') return 'operativo';
    if (s === 'EN MANTENIMIENTO') return 'En mantenimiento';
    return 'fuera';
  }

  // GESTIÓN DE IMAGEN
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('La imagen es muy pesada. Máximo 2MB.');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        this.previewImage = reader.result as string;
        this.currentEquipment.imageUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  // ACCIONES MODAL
  openRegisterModal() {
    this.isEditing = false;
    this.previewImage = null; // Limpiar imagen previa
    this.currentEquipment = { 
      laboratory: 'Metrología', 
      status: 'Operativo',
      campus: 'Sede Central',
      entryDateTime: new Date(),
      category: 'Medición',
      imageUrl: ''
    };
    this.showModal = true;
  }

  editEquipment(eq: Equipment) {
    this.isEditing = true;
    this.currentEquipment = { ...eq };
    this.previewImage = eq.imageUrl || null; // Cargar imagen del equipo si existe
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.previewImage = null;
  }

  saveEquipment() {
    // Validación simple
    if (!this.currentEquipment.internalCode || !this.currentEquipment.name) {
      alert('Por favor, complete los campos obligatorios (Código y Nombre).');
      return;
    }

    if (this.isEditing) {
      const idx = this.allEquipments.findIndex(e => e.id === this.currentEquipment.id);
      if (idx !== -1) this.allEquipments[idx] = { ...this.currentEquipment };
    } else {
      this.currentEquipment.id = Date.now().toString();
      this.allEquipments.unshift({ ...this.currentEquipment });
    }

    this.applyFilters();
    this.closeModal();
  }

  deleteEquipment(eq: Equipment) {
    if (confirm(`¿Está seguro de eliminar el equipo ${eq.internalCode}?`)) {
      this.allEquipments = this.allEquipments.filter(e => e.id !== eq.id);
      this.applyFilters();
    }
  }

  importExcel() { console.log('Abriendo selector de archivos Excel...'); }
  viewDetail(eq: any) { console.log('Navegando al detalle de:', eq.internalCode); }
}
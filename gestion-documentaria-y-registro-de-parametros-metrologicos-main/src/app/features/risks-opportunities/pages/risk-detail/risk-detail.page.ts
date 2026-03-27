import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; 
import { Risk } from '../../models/risk.model';
import { ActionPlan } from '../../models/action.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-risk-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './risk-detail.page.html',
  styleUrls: ['./risk-detail.page.scss']
})
export class RiskDetailPage implements OnInit {
  risk?: Risk; 
  showActionModal = false;
  isEditing = false;
  newAction: ActionPlan = this.initNewAction();

  ngOnInit(): void {
    // Datos iniciales para Galaxy Business bajo normativa POE-CNSP-004
    this.risk = {
      id: 1024,
      process: 'Laboratorio Metrológico',
      subprocess: 'Calibración Masa',
      task: 'Pesaje de patrones',
      type: 'Riesgo',
      laboratory: 'Metrología',
      description: 'Derrame de sustancias sobre balanza analítica',
      causes: 'Error humano / Envases mal sellados',
      consequences: 'Daño técnico y pérdida de precisión',
      probability: 8,
      impact: 8,
      value: 64, // P x I
      level: 'Alto',
      status: 'En progreso',
      significant: true,
      opportunityPromoted: false,
      effectiveness: 0,
      residualValue: 64,
      actions: [
        { id: 1, action: 'Capacitación en manejo de sustancias', responsible: 'Jefe de Laboratorio', dueDate: '2026-04-10', status: 'cerrado', evidenceName: 'acta_capacitacion.pdf' },
        { id: 2, action: 'Adquisición de bandejas de contención', responsible: 'Compras', dueDate: '2026-05-15', status: 'En proceso', evidenceName: 'orden_compra_04.pdf' },
        { id: 3, action: 'Revisión trimestral de sellos de envases', responsible: 'Control de Calidad', dueDate: '2026-06-01', status: 'Pendiente', evidenceName: 'formato_revision.pdf' }
      ]
    };
    this.updateCalculations();
  }

  private initNewAction(): ActionPlan {
    return {
      id: 0, action: '', responsible: '', dueDate: new Date().toISOString().split('T')[0],
      status: 'Pendiente', evidenceName: ''
    };
  }

  getCompletedActions(): number {
    return this.risk?.actions?.filter(a => a.status === 'cerrado').length || 0;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.newAction.evidenceFile = file; 
      this.newAction.evidenceName = file.name;
    }
  }

  openActionModal(action?: ActionPlan) {
    if (action) {
      this.isEditing = true;
      this.newAction = { ...action };
    } else {
      this.isEditing = false;
      this.newAction = this.initNewAction();
    }
    this.showActionModal = true;
  }

  saveAction() {
    if (!this.risk) return;
    if (!this.newAction.action || !this.newAction.responsible || !this.newAction.evidenceName) {
      alert('La descripción, el responsable y el documento de evidencia son obligatorios.');
      return;
    }

    const actions = this.risk.actions || [];
    if (this.isEditing) {
      const index = actions.findIndex(a => a.id === this.newAction.id);
      if (index !== -1) actions[index] = { ...this.newAction };
    } else {
      this.newAction.id = Date.now();
      actions.push({ ...this.newAction });
    }

    this.risk.actions = [...actions];
    this.updateCalculations();
    this.closeActionModal();
  }

  deleteAction(id: number) {
    if (confirm('¿Desea eliminar esta acción?')) {
      this.risk!.actions = this.risk!.actions?.filter(a => a.id !== id);
      this.updateCalculations();
    }
  }

  toggleActionStatus(a: ActionPlan) {
    const states: ('Pendiente' | 'En proceso' | 'cerrado')[] = ['Pendiente', 'En proceso', 'cerrado'];
    let currentIndex = states.indexOf(a.status);
    let nextIndex = (currentIndex + 1) % states.length;
    a.status = states[nextIndex];
    this.updateCalculations();
  }
 constructor(private router: Router) {}
  goToBack(): void {
    this.router.navigate(['/risks-opportunities/list']);
  }

  updateCalculations() {
    if (!this.risk || !this.risk.actions) return;

    // 1. Cálculo de Eficacia (Acciones Cerradas / Total)
    const total = this.risk.actions.length;
    const completed = this.getCompletedActions();
    this.risk.effectiveness = total > 0 ? Math.round((completed / total) * 100) : 0;

    // 2. Cálculo de Riesgo Residual basado en Eficacia
    this.risk.residualValue = Math.round(this.risk.value * (1 - (this.risk.effectiveness / 100)));

    // 3. Determinar Nivel y Significancia (Basado en tablas del POE)
    // Usamos el residualValue para actualizar el nivel actual tras el tratamiento
    const r = this.risk.residualValue;
    
    if (r < 32) {
      this.risk.level = 'Bajo';
      this.risk.significant = false;
    } else if (r >= 32 && r < 48) {
      this.risk.level = 'Medio';
      this.risk.significant = true;
    } else if (r >= 48 && r < 80) {
      this.risk.level = 'Alto';
      this.risk.significant = true;
    } else {
      this.risk.level = 'Muy alto';
      this.risk.significant = true;
    }

    // 4. Lógica para Oportunidades (Promovida si es Alto o Muy Alto)
    if (this.risk.type === 'Oportunidad') {
      this.risk.opportunityPromoted = (r >= 48);
    }
  }

  closeActionModal() { this.showActionModal = false; }
}
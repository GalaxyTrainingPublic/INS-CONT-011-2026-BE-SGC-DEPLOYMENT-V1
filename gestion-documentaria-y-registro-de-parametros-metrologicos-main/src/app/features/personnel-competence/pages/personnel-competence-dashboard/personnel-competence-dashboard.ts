import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-personnel-competence-dashboard',
  standalone: true,
  templateUrl: './personnel-competence-dashboard.html',
  styleUrl: './personnel-competence-dashboard.scss',
  imports: [CommonModule]
})
export class PersonnelCompetenceDashboard {
  today: Date = new Date();
  formattedTodayFull: string = new Intl.DateTimeFormat('es-PE', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(this.today);

  formattedTodayShort: string = new Intl.DateTimeFormat('es-PE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(this.today);

  stats = [
    {
      title: 'Total personal',
      value: 25,
      toneClass: 'tone-blue',
      icon: '📋'
    },
    {
      title: 'Evaluaciones completadas',
      value: 18,
      toneClass: 'tone-green',
      icon: '✅'
    },
    {
      title: 'Pendientes de evaluación',
      value: 5,
      toneClass: 'tone-orange',
      icon: '⏳'
    },
    {
      title: 'Observados en evaluación',
      value: 2,
      toneClass: 'tone-red',
      icon: '⚡'
    }
  ];

  competenceLevelChart = [
    { label: 'Básico', value: 6, height: 35, color: 'bg-blue-500' },
    { label: 'Intermedio', value: 9, height: 55, color: 'bg-yellow-500' },
    { label: 'Avanzado', value: 7, height: 45, color: 'bg-green-500' },
    { label: 'Experto', value: 3, height: 25, color: 'bg-purple-500' }
  ];

  personnelByArea = [
    { area: 'Producción', count: 8, progress: 80 },
    { area: 'Calidad', count: 6, progress: 60 },
    { area: 'RRHH', count: 4, progress: 40 },
    { area: 'Logística', count: 5, progress: 50 },
    { area: 'Sistemas', count: 2, progress: 20 }
  ];

  recentActivity = [
    { user: 'Sist. Gestión', action: 'Evaluación de Juan Pérez completada', status: 'ok' },
    { user: 'Supervisor', action: 'Asignación de capacitación en metrología', status: 'info' },
    { user: 'RRHH', action: 'Ficha de personal actualizada: María López', status: 'warning' }
  ];

  operationalProcess = [
    { stage: '5.2.1 Requerimiento del personal', detail: 'FOR-INS-091, FOR-INS-092 y perfil FOR-INS-058 (TDR).' },
    { stage: '5.2.2 Inducción', detail: 'Registro FOR-CNSP-008 y compromiso FOR-CNSP-130.' },
    { stage: '5.2.3 Entrenamiento', detail: 'Programa FOR-CNSP-124 y resultado FOR-CNSP-219, mínimo 60%.' },
    { stage: '5.2.4 Reentrenamiento', detail: 'Se aplica por bajo desempeño o reincorporación > 1 año.' },
    { stage: '5.2.5 Evaluación de competencia', detail: 'Registro FOR-CNSP-220 para análisis y seguimiento.' },
    { stage: '5.2.6 Autorización', detail: 'Registro FOR-CNSP-221 y constancia FOR-CNSP-016, mínimo 60%.' },
    { stage: '5.2.7 Seguimiento (Reevaluación)', detail: 'Periodicidad anual, informe FOR-CNSP-286.' },
    { stage: '5.2.8 Educación continua', detail: 'Programa anual FOR-CNSP-337 y reporte a Dirección.' },
    { stage: '5.2.9 Registros del personal', detail: 'Incluye formación, inducción, evaluaciones, autorizaciones, accidentes e inmunización.' }
  ];

  responsibilities = [
    'Director del CNSP: aprobar el procedimiento.',
    'Responsables de áreas: cumplir y hacer cumplir.',
    'Responsable de capacitación: gestionar inducción y programa educativo.',
    'Personal: mantener su file actualizado.',
    'Responsables de laboratorio: asegurar entrenamiento.',
    'Responsable del EGC: difusión y monitoreo.'
  ];

}
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-risk-logs',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="logs-container">
      <h3>📜 Historial de Trazabilidad (Auditoría)</h3>
      <div class="timeline">
        <div class="log-item" *ngFor="let log of logs">
          <span class="log-date">{{ log.date }}</span>
          <span class="log-user"><strong>{{ log.user }}</strong></span>
          <span class="log-action">{{ log.action }}</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .logs-container { background: #f1f5f9; padding: 15px; border-radius: 8px; margin-top: 20px; border-left: 4px solid #64748b; }
    .timeline { margin-top: 10px; display: flex; flex-direction: column; gap: 8px; }
    .log-item { font-size: 13px; display: flex; gap: 10px; border-bottom: 1px dashed #cbd5e1; padding-bottom: 4px; }
    .log-date { color: #64748b; min-width: 140px; }
    .log-user { color: #1e293b; }
  `]
})
export class RiskLogsComponent {
  @Input() logs: any[] = [
    { date: '2024-05-10 09:00', user: 'Admin_SGC', action: 'Riesgo Identificado y Registrado' },
    { date: '2024-05-11 14:30', user: 'Lab_Manager', action: 'Plan de acción aprobado' },
    { date: '2024-05-12 10:15', user: 'Sistema', action: 'Actualización automática de nivel a: MUY ALTO' }
  ];
}
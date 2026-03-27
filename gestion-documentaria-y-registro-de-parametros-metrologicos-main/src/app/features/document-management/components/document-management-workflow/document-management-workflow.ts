import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';


type DocumentStatus = 'Borrador' | 'Revisión' | 'Aprobación' | 'Vigente';

@Component({
  selector: 'app-document-management-workflow',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './document-management-workflow.html'
})
export class DocumentManagementWorkflow {

  // currentState = 'Borrador';

   document = {
    id: 1,
    title: 'CONTROL DE DOCUMENTOS',
    status: 'Revisión' as DocumentStatus,
    history: [
      { status: 'Borrador', date: '2026-01-01', user: 'Juan' },
      { status: 'Revisión', date: '2026-01-05', user: 'Ana' }
    ]
  };


  steps: DocumentStatus[] = ['Borrador', 'Revisión', 'Aprobación', 'Vigente'];

  //índice del estado actual
  get currentIndex(): number {
    return this.steps.indexOf(this.document.status);
  }

  // cambiar estado (simulación)
  changeStatus(step: DocumentStatus) {
    this.document.status = step;
  }

  // estilos dinámicos
  getStepClass(index: number) {
    if (index < this.currentIndex) return 'completed';
    if (index === this.currentIndex) return 'active';
    return 'pending';
  }

  getStepName(index: number) {
    if (index < this.currentIndex) return 'Juan Pérez';
    if (index === this.currentIndex) return 'Pedro Vílchez';
    return 'Ana Ruiz';
  }
}

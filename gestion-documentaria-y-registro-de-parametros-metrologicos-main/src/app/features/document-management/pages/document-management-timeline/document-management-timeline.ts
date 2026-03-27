import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

@Component({
  selector: 'app-document-management-timeline',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './document-management-timeline.html'
})
export class DocumentManagementTimeline {

  currentStatus = 'Revisión';

  steps = ['Borrador', 'Revisión', 'Aprobación', 'Vigente'];

  getState(step: string) {
    const currentIndex = this.steps.indexOf(this.currentStatus);
    const stepIndex = this.steps.indexOf(step);

    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'active';
    return 'pending';
  }

  onFileDrop(event: DragEvent) {
    event.preventDefault();
    const file = event.dataTransfer?.files[0];
    console.log('Archivo soltado:', file);
  }

  allowDrop(event: DragEvent) {
    event.preventDefault();
  }
}

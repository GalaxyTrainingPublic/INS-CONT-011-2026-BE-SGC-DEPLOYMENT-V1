import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-icon',
  standalone: true,
  template: `<i [class]="finalClass()" [style.fontSize.px]="size()"></i>`,
  styles: [`
    :host { display: inline-flex; align-items: center; justify-content: center; }
  `]
})
export class Icon {
// Ej: 'ph-user', 'ph-folder'
  name = input.required<string>();
  weight = input<'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone'>('thin');
  size = input<number>(18);
  finalClass = computed(() => {
    const iconName = this.name();
    // Si el nombre ya trae "ph-", lo usamos tal cual.
    // Si no, le construimos la clase con el peso (weight)
    return iconName.includes('ph-')
      ? iconName
      : `ph-${this.weight()} ph-${iconName}`;
  });
}

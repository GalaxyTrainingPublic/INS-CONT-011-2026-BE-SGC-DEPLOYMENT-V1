import { inject, Injectable, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { menu } from '../components/layout/sidebar/menu';
export interface BreadcrumbStep {
  label: string;
  path?: string;
  icon?: string;
}
@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
private router = inject(Router);

  // Signal para máxima reactividad
  breadcrumbs = signal<BreadcrumbStep[]>([]);

  constructor() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateBreadcrumbs();
    });
  }

private updateBreadcrumbs() {
    const currentUrl = this.router.url.split('?')[0];
    const steps: BreadcrumbStep[] = [];

    for (const parent of menu) {
      // --- CASO NUEVO: El path está directamente en el Padre (Ej: Inicio) ---
      // Usamos includes o === dependiendo de qué tan estricta sea tu ruta
      if (parent.path && currentUrl === (parent.path.startsWith('/') ? parent.path : '/' + parent.path)) {
        steps.push({ label: parent.label, icon: parent.icon, path: parent.path });
        break;
      }

      // Si no hay items, ahora sí pasamos al siguiente después de haber revisado el path del padre
      if (!parent.items) continue;

      for (const item of parent.items) {
        // Caso 1: El item tiene path directo (Nivel 2)
        if (item.path && currentUrl.includes(item.path)) {
          steps.push({ label: parent.label, icon: parent.icon });
          steps.push({ label: item.label, path: item.path });
          break;
        }

        // Caso 2: El item tiene children (Nivel 3)
        if (item.children) {
          const child = item.children.find(c => c.path && currentUrl.includes(c.path));
          if (child) {
            steps.push({ label: parent.label, icon: parent.icon });
            steps.push({ label: item.label });
            steps.push({ label: child.label, path: child.path });
            break;
          }
        }
      }
      if (steps.length > 0) break;
    }
    this.breadcrumbs.set(steps);
  }
}

import { Routes } from '@angular/router';
import { ErrorPage } from './shared/components/pages/error-page/error-page';

export const routes: Routes = [
  {
    path: 'auth',
    loadComponent: () => import('./layouts/auth-layout/auth-layout').then(m => m.AuthLayout),
    children: [
      {
        path: '',
        loadChildren: () => import('./features/users-security-audit/routers/security.routes').then(m => m.default)
      }
    ]
  },
  { path:'',
    loadComponent: () => import('./layouts/main-layout/main-layout').then(m => m.MainLayout),
    children: [
    {
        path: '',
        redirectTo: 'inicio',
        pathMatch: 'full'
      },
      {
        path: 'inicio',
        loadChildren: () => import('./features/dashboard/dashboard.routes').then(m => m.default),
      },
      {
        path: 'document-management',
        loadChildren: () => import('./features/document-management/routers/document.routes').then(m => m.default),
      },
       {
        path: 'risks-opportunities',
        loadChildren: () => import('../app/features/risks-opportunities/routers/risk-opportunities.routes').then(m => m.default),
      },
       {
        path: 'equipment-metrological-traceability',
        loadChildren: () => import('../app/features/equipment-metrological-traceability/routers/equipment-metrological-traceability.routes').then(m => m.default),
      },
       {
        path: 'personnel-competence',
        loadChildren: () => import('../app/features/personnel-competence/routers/personnel-competence.routes').then(m => m.default),
      },
      {
        path: '404',
        component: ErrorPage
      },
    ]
  },
  {
    path: '**',
    redirectTo: '404'
  }
];

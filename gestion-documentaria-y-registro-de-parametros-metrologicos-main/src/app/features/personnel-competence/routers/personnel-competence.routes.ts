export default [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full' as const
  },
  {
    path: 'dashboard',
    loadComponent: () => import('../pages/personnel-competence-dashboard/personnel-competence-dashboard').then(m => m.PersonnelCompetenceDashboard)
  },
  {
    path: 'personnel-list',
    loadComponent: () => import('../pages/personnel-list/personnel-list').then(m => m.PersonnelList)
  },
  {
    path: 'personnel-file',
    loadComponent: () => import('../pages/personnel-file/personnel-file').then(m => m.PersonnelFile)
  },
  {
    path: 'personnel-file/new',
    loadComponent: () => import('../pages/personnel-file/personnel-file').then(m => m.PersonnelFile)
  },
  {
    path: 'personnel-file/:id',
    loadComponent: () => import('../pages/personnel-file/personnel-file').then(m => m.PersonnelFile)
  },
  {
    path: 'alerts',
    loadComponent: () => import('../pages/alerts/alerts').then(m => m.Alerts)
  },
  {
    path: 'documents',
    loadComponent: () => import('../pages/documents/documents').then(m => m.Documents)
  },
  {
    path: 'training',
    loadComponent: () => import('../pages/training/training').then(m => m.Training)
  },
  {
    path: 'competence-evaluation',
    loadComponent: () => import('../pages/competence-evaluation/competence-evaluation').then(m => m.CompetenceEvaluation)
  },
  {
    path: 'authorization',
    loadComponent: () => import('../pages/authorization/authorization').then(m => m.Authorization)
  },
  {
    path: 'reevaluation',
    loadComponent: () => import('../pages/reevaluation/reevaluation').then(m => m.Reevaluation)
  },
];


export default [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full' as const
  },
  {
    path: 'dashboard',
    loadComponent: () => import('../pages/dashboard/risks-opportunities-dashboard').then(m => m.RisksOpportunitiesDashboard)
  },
  {
    path: 'list',
    loadComponent: () =>
      import('../pages/risk-register/risk-register.page')
        .then(m => m.RiskRegisterPage)
  },
  {
    path: 'form',
    loadComponent: () =>
      import('../pages/risk-form/risk-form.page')
        .then(m => m.RiskFormPage)
  },
  {
    path: 'editar/:id', 
    loadComponent: () => 
      import('../pages/risk-form/risk-form.page')
        .then(m => m.RiskFormPage)
  },
  {
    path: 'detail/:id',
    loadComponent: () =>
      import('../pages/risk-detail/risk-detail.page')
        .then(m => m.RiskDetailPage)
  },
  {
    path: 'traceability',
    loadComponent: () =>
      import('../pages/risk-traceability/risk-traceability.component')
        .then(m => m.RiskTraceabilityComponent)
  },
  {
    path: 'monitoring',
    loadComponent: () =>
      import('../pages/monitoring/monitoring')
        .then(m => m.Monitoring)
  },
  {
    path: 'reports',
    loadComponent: () =>
      import('../pages/reports/reports')
        .then(m => m.Reports)
  }
];

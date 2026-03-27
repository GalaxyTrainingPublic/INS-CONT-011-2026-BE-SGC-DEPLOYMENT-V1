export default [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full' as const
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('../pages/equipment-dashboard/equipment-dashboard')
        .then(m => m.EquipmentDashboardComponent)
  },

  // EQUIPMENT
  {
    path: 'equipment/registry',
    loadComponent: () =>
      import('../pages/equipment-registry/equipment-registry.page')
        .then(m => m.EquipmentRegistryPage)
  },
  /*{
    path: 'equipment/detail/:id', 
    loadComponent: () =>
      import('../pages/equipment-detail/equipment-detail.component')
        .then(m => m.EquipmentDetailComponent)
  },*/

  // CALIBRATION
  {
    path: 'calibration/schedule',
    loadComponent: () =>
      import('../pages/calibration/schedule/schedule')
        .then(m => m.Schedule)
  },
  {
    path: 'calibration/execution',
    loadComponent: () =>
      import('../pages/calibration/execution/execution')
        .then(m => m.Execution)
  },
  {
    path: 'calibration/certificates',
    loadComponent: () =>
      import('../pages/calibration/certificates/certificates')
        .then(m => m.Certificates)
  },

  // MAINTENANCE
  {
    path: 'maintenance/preventive',
    loadComponent: () =>
      import('../pages/maintenance/preventive/preventive')
        .then(m => m.Preventive)
  },
  {
    path: 'maintenance/corrective',
    loadComponent: () =>
      import('../pages/maintenance/corrective/corrective')
        .then(m => m.Corrective)
  },

  // TRACEABILITY
  {
    path: 'traceability',
    loadComponent: () =>
      import('../pages/traceability/traceability')
        .then(m => m.Traceability)
  },

  // MATERIALS / STANDARDS
  {
    path: 'materials-standards',
    loadComponent: () =>
      import('../pages/materials-standards/materials-standards')
        .then(m => m.MaterialsStandards)
  },

  // REPORTS
  {
    path: 'reports',
    loadComponent: () =>
      import('../pages/reports/reports')
        .then(m => m.Reports)
  }
];

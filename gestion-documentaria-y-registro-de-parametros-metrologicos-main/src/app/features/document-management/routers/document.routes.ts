
export default [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full' as const
  },
  {
    path: 'dashboard',
    loadComponent: () => import('../pages/document-management-dashboard/document-management-dashboard').then(m => m.DocumentManagementDashboard)
  },
  {
    path: 'list',
    loadComponent: () => import('../pages/document-management-list/document-management-list').then(m => m.DocumentManagementList)
  },
  {
    path: 'form',
    loadComponent: () => import('../pages/document-management-form/document-management-form').then(m => m.DocumentManagementForm)
  },
    {
    path: 'form/:id',
    loadComponent: () => import('../pages/document-management-form/document-management-form').then(m => m.DocumentManagementForm)
  },
  {
    path: 'distribution',
    loadComponent: () => import('../pages/document-management-distribution/document-management-distribution').then(m => m.DocumentManagementDistribution)
  },
  {
    path: 'records-management',
    loadComponent: () => import('../pages/document-management-records-management/document-management-records-management').then(m => m.DocumentManagementRecordsManagement)
  },
  {
    path: 'external-documents',
    loadComponent: () => import('../pages/document-management-external-documents/document-management-external-documents').then(m => m.DocumentManagementExternalDocuments)
  },
      {
    path: 'reports-audit',
    loadComponent: () => import('../pages/document-management-reports-audit/document-management-reports-audit').then(m => m.DocumentManagementReportsAudit)
  },
  // {
  //   path: 'versions/:id',
  //   loadComponent: () => import('../pages/document-management-versions/document-management-versions')
  //     .then(m => m.DocumentManagementVersions)
  // },
  // {
  //   path: 'version-control/:id',
  //   loadComponent: () => import('../pages/document-management-version-control/document-management-version-control')
  //     .then(m => m.DocumentManagementVersionControl)
  // },
  // {
  //   path: 'workflow/:id',
  //   loadComponent: () => import('../components/document-management-workflow/document-management-workflow')
  //     .then(m => m.DocumentManagementWorkflow)
  // },
   {
    path: 'timeline/:id',
    loadComponent: () => import('../pages/document-management-timeline/document-management-timeline')
      .then(m => m.DocumentManagementTimeline)
  }


];

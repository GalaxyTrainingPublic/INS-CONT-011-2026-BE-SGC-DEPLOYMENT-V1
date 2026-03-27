export default [
  {
    path: 'general',
    loadComponent: () =>
      import('./pages/dashboard/dashboard')
        .then(m => m.Dashboard)
  },
  {
    path: '',
    redirectTo: 'general',
    pathMatch: 'full' as const
  },
];

export default [

  {
    path: 'login',
    loadComponent: () =>
      import('../pages/login/login').then(m => m.Login)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full' as const
  },
];

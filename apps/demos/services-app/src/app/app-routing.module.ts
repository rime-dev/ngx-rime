import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '@rng/data-access/auth';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/services-web/services-web.module').then((m) => m.ServicesWebModule),
  },
  {
    path: 'no-group',
    loadChildren: () => import('./pages/no-group/no-group.module').then((m) => m.NoGroupModule),
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

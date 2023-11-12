import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {RimeAuthGuard} from '@ngx-rime/data-access/auth';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    canActivate: [RimeAuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'tasks',
        pathMatch: 'full',
      },
      {
        path: 'tasks',
        canActivate: [RimeAuthGuard],
        loadChildren: () => import('./modules/tasks/tasks.module').then((m) => m.TasksModule),
      },
      {
        path: 'events',
        canActivate: [RimeAuthGuard],
        loadChildren: () => import('./modules/events/events.module').then((m) => m.EventsModule),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

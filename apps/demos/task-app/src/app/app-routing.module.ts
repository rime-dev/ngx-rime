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
    loadChildren: () => import('./modules/tasks/tasks.module').then((m) => m.TasksModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

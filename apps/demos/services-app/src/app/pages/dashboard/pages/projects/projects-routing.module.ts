import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProjectsComponent} from './projects.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectsComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'project-list',
      },
      {
        path: 'project-list',
        loadChildren: () =>
          import('./pages/project-list/project-list.module').then((m) => m.ProjectListModule),
      },
      {
        path: 'project-view',
        pathMatch: 'full',
        redirectTo: 'project-list',
      },
      {
        path: 'project-view/:id',
        loadChildren: () =>
          import('./pages/project-view/project-view.module').then((m) => m.ProjectViewModule),
      },
      {
        path: 'not-found',
        loadChildren: () =>
          import('../../../../components/not-found/not-found.module').then((m) => m.NotFoundModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectsRoutingModule {}

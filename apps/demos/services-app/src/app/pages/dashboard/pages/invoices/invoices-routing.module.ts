import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {InvoicesComponent} from './invoices.component';

const routes: Routes = [
  {
    path: '',
    component: InvoicesComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'invoice-list',
      },
      {
        path: 'invoice-list',
        loadChildren: () =>
          import('./pages/invoice-list/invoice-list.module').then((m) => m.InvoiceListModule),
      },
      {
        path: 'invoice-view',
        pathMatch: 'full',
        redirectTo: 'invoice-list',
      },
      {
        path: 'invoice-view/:id',
        loadChildren: () =>
          import('./pages/invoice-view/invoice-view.module').then((m) => m.InvoiceViewModule),
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
export class InvoicesRoutingModule {}

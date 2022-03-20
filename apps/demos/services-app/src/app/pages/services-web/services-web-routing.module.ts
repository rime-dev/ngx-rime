import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ServicesWebComponent} from './services-web.component';

const routes: Routes = [
  {
    path: '',
    component: ServicesWebComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicesWebRoutingModule {}

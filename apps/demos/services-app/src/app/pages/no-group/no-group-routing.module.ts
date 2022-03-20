import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NoGroupComponent} from './no-group.component';

const routes: Routes = [
  {
    path: '',
    component: NoGroupComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NoGroupRoutingModule {}

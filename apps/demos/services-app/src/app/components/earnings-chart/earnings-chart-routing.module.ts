import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EarningsChartComponent} from './earnings-chart.component';

const routes: Routes = [
  {
    path: '',
    component: EarningsChartComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EarningsChartRoutingModule {}

import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {TranslocoModule} from '@ngneat/transloco';
import {EarningsChartRoutingModule} from './earnings-chart-routing.module';
import {EarningsChartComponent} from './earnings-chart.component';

@NgModule({
  declarations: [EarningsChartComponent],
  exports: [EarningsChartComponent],
  imports: [CommonModule, EarningsChartRoutingModule, TranslocoModule, RouterModule],
})
export class EarningsChartModule {}

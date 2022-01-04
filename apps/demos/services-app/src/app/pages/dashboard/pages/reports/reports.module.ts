import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {ReportsRoutingModule} from './reports-routing.module';
import {ReportsComponent} from './reports.component';

@NgModule({
  declarations: [ReportsComponent],
  imports: [CommonModule, ReportsRoutingModule, MatButtonModule, MatCardModule, MatIconModule],
})
export class ReportsModule {}

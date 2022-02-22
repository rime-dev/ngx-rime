import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTooltipModule} from '@angular/material/tooltip';
import {TranslocoModule} from '@ngneat/transloco';
import {ManagementRoutingModule} from './management-routing.module';
import {ManagementComponent} from './management.component';

@NgModule({
  declarations: [ManagementComponent],
  imports: [
    CommonModule,
    ManagementRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTabsModule,
    MatTooltipModule,
    TranslocoModule,
  ],
})
export class ManagementModule {}

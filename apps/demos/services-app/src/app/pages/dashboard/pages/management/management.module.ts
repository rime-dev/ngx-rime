import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTooltipModule} from '@angular/material/tooltip';
import {TranslocoModule} from '@ngneat/transloco';
import {MapModule} from '../../../../components/map/map.module';
import {ManagementRoutingModule} from './management-routing.module';
import {ManagementComponent} from './management.component';
import { TeamComponent } from './components/team/team.component';
import { CardComponent } from './components/card/card.component';

@NgModule({
  declarations: [ManagementComponent, TeamComponent, CardComponent],
  imports: [
    CommonModule,
    ManagementRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTabsModule,
    MatTooltipModule,
    TranslocoModule,
    MatChipsModule,
    MatListModule,
    MatMenuModule,
    MapModule,
  ],
})
export class ManagementModule {}

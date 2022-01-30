import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {ProjectListComponent} from './project-list.component';
import {ProjectListRoutingModule} from './project-list-routing.module';
import {MatChipsModule} from '@angular/material/chips';
import {MatTabsModule} from '@angular/material/tabs';
import {ProjectCardComponent} from './components/project-card/project-card.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {ProjectTypeModule} from 'apps/demos/services-app/src/app/pipes/project-type/project-type.module';
import {TranslocoModule} from '@ngneat/transloco';

@NgModule({
  declarations: [ProjectListComponent, ProjectCardComponent],
  imports: [
    CommonModule,
    ProjectListRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatTabsModule,
    MatTooltipModule,
    ProjectTypeModule,
    TranslocoModule,
  ],
})
export class ProjectListModule {}

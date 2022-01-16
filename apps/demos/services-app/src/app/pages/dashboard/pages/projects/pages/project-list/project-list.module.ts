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
  ],
})
export class ProjectListModule {}

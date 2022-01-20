import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {ProjectViewComponent} from './project-view.component';
import {ProjectViewRoutingModule} from './project-view-routing.module';
import {MatChipsModule} from '@angular/material/chips';
import {MatTabsModule} from '@angular/material/tabs';
import {ProjectInfoComponent} from './components/project-info/project-info.component';
import {ProjectActivityComponent} from './components/project-activity/project-activity.component';
import {ProjectDocumentsComponent} from './components/project-documents/project-documents.component';
import {MatListModule} from '@angular/material/list';

@NgModule({
  declarations: [
    ProjectViewComponent,
    ProjectInfoComponent,
    ProjectActivityComponent,
    ProjectDocumentsComponent,
  ],
  imports: [
    CommonModule,
    ProjectViewRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatTabsModule,
    MatListModule,
  ],
})
export class ProjectViewModule {}

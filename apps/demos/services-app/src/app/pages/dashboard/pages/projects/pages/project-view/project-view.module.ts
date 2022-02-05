/* eslint-disable max-len */
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
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {TranslocoModule} from '@ngneat/transloco';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {TranslocoLocaleModule} from '@ngneat/transloco-locale';
import {ProjectTypeModule} from 'apps/demos/services-app/src/app/pipes/project-type/project-type.module';
import {ProjectChangeStateDialogComponent} from './components/project-change-state-dialog/project-change-state-dialog.component';
import {ProjectAddCollaboratorDialogComponent} from './components/project-add-collaborator-dialog/project-add-collaborator-dialog.component';
import {ProjectRemoveCollaboratorDialogComponent} from './components/project-remove-collaborator-dialog/project-remove-collaborator-dialog.component';
import {CollaboratorPipeModule} from 'apps/demos/services-app/src/app/pipes/collaborator/collaborator.module';

@NgModule({
  declarations: [
    ProjectViewComponent,
    ProjectInfoComponent,
    ProjectActivityComponent,
    ProjectDocumentsComponent,
    ProjectChangeStateDialogComponent,
    ProjectAddCollaboratorDialogComponent,
    ProjectRemoveCollaboratorDialogComponent,
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
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatTooltipModule,
    TranslocoModule,
    TranslocoLocaleModule,
    MatSnackBarModule,
    ProjectTypeModule,
    MatDialogModule,
    CollaboratorPipeModule,
  ],
})
export class ProjectViewModule {}

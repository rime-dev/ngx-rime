/* eslint-disable max-len */
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatRippleModule} from '@angular/material/core';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTooltipModule} from '@angular/material/tooltip';
import {TranslocoModule} from '@ngneat/transloco';
import {TranslocoLocaleModule} from '@ngneat/transloco-locale';
import {StorageMockModule, StorageModule} from '@rng/data-access/storage';
import {SatinizeModule} from '@rng/util/satinize';
import {CollaboratorPipeModule} from 'apps/demos/services-app/src/app/pipes/collaborator/collaborator.module';
import {ProjectTypeModule} from 'apps/demos/services-app/src/app/pipes/project-type/project-type.module';
import {ProjectActivityComponent} from './components/project-activity/project-activity.component';
import {ProjectAddCollaboratorDialogComponent} from './components/project-add-collaborator-dialog/project-add-collaborator-dialog.component';
import {ProjectChangeStateDialogComponent} from './components/project-change-state-dialog/project-change-state-dialog.component';
import {ProjectDocumentDialogComponent} from './components/project-document-dialog/project-document-dialog.component';
import {ProjectDocumentsComponent} from './components/project-documents/project-documents.component';
import {ProjectExistingDocumentDialogComponent} from './components/project-existing-document-dialog/project-existing-document-dialog.component';
import {ProjectInfoComponent} from './components/project-info/project-info.component';
import {ProjectRemoveCollaboratorDialogComponent} from './components/project-remove-collaborator-dialog/project-remove-collaborator-dialog.component';
import {ProjectViewRoutingModule} from './project-view-routing.module';
import {ProjectViewComponent} from './project-view.component';
@NgModule({
  declarations: [
    ProjectViewComponent,
    ProjectInfoComponent,
    ProjectActivityComponent,
    ProjectDocumentsComponent,
    ProjectChangeStateDialogComponent,
    ProjectAddCollaboratorDialogComponent,
    ProjectRemoveCollaboratorDialogComponent,
    ProjectDocumentDialogComponent,
    ProjectExistingDocumentDialogComponent,
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
    MatRippleModule,
    StorageMockModule,
    // StorageModule,
    MatDialogModule,
    SatinizeModule,
  ],
})
export class ProjectViewModule {}

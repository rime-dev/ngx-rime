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
import {TeamComponent} from './components/team/team.component';
import {CardComponent} from './components/card/card.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDialogModule} from '@angular/material/dialog';
import {GroupAddNameDialogComponent} from './components/group-add-name-dialog/group-add-name-dialog.component';
import {GroupAddEmailDialogComponent} from './components/group-add-email-dialog/group-add-email-dialog.component';
import {GroupAddPhoneDialogComponent} from './components/group-add-phone-dialog/group-add-phone-dialog.component';
import {GroupAddWebDialogComponent} from './components/group-add-web-dialog/group-add-web-dialog.component';
import {GroupAddNifDialogComponent} from './components/group-add-nif-dialog/group-add-nif-dialog.component';
import {MatRippleModule} from '@angular/material/core';
import {GroupAddLogoDialogComponent} from './components/group-add-logo-dialog/group-add-logo-dialog.component';
import {StorageMockModule} from '@rng/data-access/storage';
import {GroupAddActivityDialogComponent} from './components/group-add-activity-dialog/group-add-activity-dialog.component';
// eslint-disable-next-line max-len
import {GroupAddAdditionalInfoDialogComponent} from './components/group-add-additional-info-dialog/group-add-additional-info-dialog.component';
import {GroupAddLocationDialogComponent} from './components/group-add-location-dialog/group-add-location-dialog.component';

@NgModule({
  declarations: [
    ManagementComponent,
    TeamComponent,
    CardComponent,
    GroupAddNameDialogComponent,
    GroupAddWebDialogComponent,
    GroupAddPhoneDialogComponent,
    GroupAddNifDialogComponent,
    GroupAddEmailDialogComponent,
    GroupAddLogoDialogComponent,
    GroupAddActivityDialogComponent,
    GroupAddAdditionalInfoDialogComponent,
    GroupAddLocationDialogComponent,
  ],
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
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    FormsModule,
    MatDialogModule,
    MatRippleModule,
    StorageMockModule,
    // StorageModule,
  ],
})
export class ManagementModule {}

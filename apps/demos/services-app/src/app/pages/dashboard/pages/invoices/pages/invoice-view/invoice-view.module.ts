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
import {MatMenuModule} from '@angular/material/menu';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTooltipModule} from '@angular/material/tooltip';
import {TranslocoModule} from '@ngneat/transloco';
import {TranslocoLocaleModule} from '@ngneat/transloco-locale';
import {StorageMockModule} from '@rng/data-access/storage';
import {SatinizeModule} from '@rng/util/satinize';
import {InvoiceViewRoutingModule} from './invoice-view-routing.module';
import {InvoiceViewComponent} from './invoice-view.component';
@NgModule({
  declarations: [InvoiceViewComponent],
  imports: [
    CommonModule,
    InvoiceViewRoutingModule,
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
    MatDialogModule,
    MatRippleModule,
    StorageMockModule,
    // StorageModule,
    MatDialogModule,
    SatinizeModule,
    MatMenuModule,
  ],
})
export class InvoiceViewModule {}

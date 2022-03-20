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
import {StorageMockModule, StorageModule} from '@rng/data-access/storage';
import {SatinizeModule} from '@rng/util/satinize';
import {RequestIfTrueModule} from 'apps/demos/services-app/src/app/components/request-if-true-dialog/request-if-true.module';
import {InvoiceAddCostDialogComponent} from './components/invoice-add-cost-dialog/invoice-add-cost-dialog.component';
import {InvoiceAddDescriptionDialogComponent} from './components/invoice-add-description-dialog/invoice-add-description-dialog.component';
import {InvoiceAddTaxesDialogComponent} from './components/invoice-add-taxes-dialog/invoice-add-taxes-dialog.component';
import {InvoiceAddTitleDialogComponent} from './components/invoice-add-title-dialog/invoice-add-title-dialog.component';
import {IvoiceExistingDocumentDialogComponent} from './components/invoice-existing-document-dialog/invoice-existing-document-dialog.component';
import {InvoiceViewRoutingModule} from './invoice-view-routing.module';
import {InvoiceViewComponent} from './invoice-view.component';
@NgModule({
  declarations: [
    InvoiceViewComponent,
    IvoiceExistingDocumentDialogComponent,
    InvoiceAddTitleDialogComponent,
    InvoiceAddDescriptionDialogComponent,
    InvoiceAddCostDialogComponent,
    InvoiceAddTaxesDialogComponent,
  ],
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
    //StorageMockModule,
    StorageModule,
    MatDialogModule,
    SatinizeModule,
    MatMenuModule,
    RequestIfTrueModule,
  ],
})
export class InvoiceViewModule {}

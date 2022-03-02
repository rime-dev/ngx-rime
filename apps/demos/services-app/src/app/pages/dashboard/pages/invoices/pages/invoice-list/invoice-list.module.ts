import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTooltipModule} from '@angular/material/tooltip';
import {TranslocoModule} from '@ngneat/transloco';
import {TranslocoLocaleModule} from '@ngneat/transloco-locale';
import {StorageMockModule} from '@rng/data-access/storage';
import {SatinizeModule} from '@rng/util/satinize';
import {InvoiceCardComponent} from './components/invoice-card/invoice-card.component';
import {InvoiceCreateDialogComponent} from './components/invoice-create-dialog/invoice-create-dialog.component';
import {InvoiceListRoutingModule} from './invoice-list-routing.module';
import {InvoiceListComponent} from './invoice-list.component';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [InvoiceListComponent, InvoiceCardComponent, InvoiceCreateDialogComponent],
  imports: [
    CommonModule,
    InvoiceListRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatTabsModule,
    MatTooltipModule,
    TranslocoModule,
    TranslocoLocaleModule,
    StorageMockModule,
    // StorageModule,
    MatDialogModule,
    SatinizeModule,
    MatMenuModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
  ],
})
export class InvoiceListModule {}

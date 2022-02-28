import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTooltipModule} from '@angular/material/tooltip';
import {TranslocoModule} from '@ngneat/transloco';
import {TranslocoLocaleModule} from '@ngneat/transloco-locale';
import {InvoiceCardComponent} from './components/invoice-card/invoice-card.component';
import {InvoiceListRoutingModule} from './invoice-list-routing.module';
import {InvoiceListComponent} from './invoice-list.component';

@NgModule({
  declarations: [InvoiceListComponent, InvoiceCardComponent],
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
  ],
})
export class InvoiceListModule {}

import {Component, Input} from '@angular/core';
import {EntityState} from '@rng/data-access/base/models/base.model';
import {Invoice} from 'apps/demos/services-app/src/app/models/invoice.model';

@Component({
  selector: 'rng-invoice-card',
  templateUrl: './invoice-card.component.html',
  styleUrls: ['./invoice-card.component.scss'],
})
export class InvoiceCardComponent {
  @Input()
  get invoice() {
    return this.internalInvoice;
  }
  set invoice(value: EntityState<Invoice>) {
    this.internalInvoice = value;
  }
  private internalInvoice!: EntityState<Invoice>;
}

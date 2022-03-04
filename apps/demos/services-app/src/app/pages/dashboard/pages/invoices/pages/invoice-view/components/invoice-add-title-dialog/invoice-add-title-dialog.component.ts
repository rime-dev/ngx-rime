import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'rng-invoice-add-title-dialog',
  templateUrl: 'invoice-add-title-dialog.component.html',
})
export class InvoiceAddTitleDialogComponent {
  public invoice: any;
  constructor(@Inject(MAT_DIALOG_DATA) private data: any) {
    if (this.data && this.data.invoice) {
      this.invoice = this.data.invoice;
    }
  }
}

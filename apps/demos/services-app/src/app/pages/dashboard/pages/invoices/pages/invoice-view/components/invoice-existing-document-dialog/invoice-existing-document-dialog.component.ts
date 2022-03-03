import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'rng-invoice-existing-document-dialog',
  templateUrl: './invoice-existing-document-dialog.component.html',
  styleUrls: ['./invoice-existing-document-dialog.component.scss'],
})
export class IvoiceExistingDocumentDialogComponent {
  public document!: any;
  public invoice!: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public matDialogRef: MatDialogRef<IvoiceExistingDocumentDialogComponent>
  ) {
    if (this.data) {
      this.invoice = this.data;
    }
  }

  openNewTab() {
    window.open(this.invoice.data.url, '_blank');
  }
  download() {
    try {
      const element = document.createElement('a');
      element.setAttribute('href', this.invoice.data.url);
      element.setAttribute('download', this.invoice.data.title);
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    } catch (e) {
      console.error(e);
      window.open(this.invoice.data.url);
    }
  }
}

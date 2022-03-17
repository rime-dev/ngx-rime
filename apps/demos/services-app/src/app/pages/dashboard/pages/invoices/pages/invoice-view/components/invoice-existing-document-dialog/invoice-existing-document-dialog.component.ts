import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DataService} from '@rng/data-access/base';
import {StorageUploadTaskMockService, StorageUploadTaskService} from '@rng/data-access/storage';
// eslint-disable-next-line max-len
import {RequestIfTrueDialogComponent} from 'apps/demos/services-app/src/app/components/request-if-true-dialog/request-if-true-dialog.component';
import {Invoice} from 'apps/demos/services-app/src/app/models/invoice.model';
import {of} from 'rxjs';
import {debounceTime, take, tap} from 'rxjs/operators';
@Component({
  selector: 'rng-invoice-existing-document-dialog',
  templateUrl: './invoice-existing-document-dialog.component.html',
  styleUrls: ['./invoice-existing-document-dialog.component.scss'],
})
export class IvoiceExistingDocumentDialogComponent {
  public document!: any;
  public path!: string;
  public invoice!: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private matDialogRef: MatDialogRef<IvoiceExistingDocumentDialogComponent>,
    private matDialog: MatDialog,
    private dataService: DataService,
    private storageUploadTaskService: StorageUploadTaskService
  ) {
    if (this.data && this.data.invoice) {
      this.invoice = this.data.invoice;
    }
    if (this.data && this.data.path) {
      this.path = this.data.path;
    }
    if (this.data && this.data.document) {
      this.document = this.data.document;
    }
  }
  remove() {
    this.matDialog
      .open(RequestIfTrueDialogComponent, {
        minWidth: '33vw',
      })
      .afterClosed()
      .subscribe((request) => {
        if (request) {
          this.storageUploadTaskService.delete(this.invoice.data.url);
          const data2 = {...this.invoice.data, url: null};
          const invoice2 = {...this.invoice, data: data2};
          this.invoice = invoice2;
          this.dataService.select<Invoice>('Invoice').update(invoice2);
        }
      });
  }
  onFinalize(documents: any[]) {
    of(documents)
      .pipe(
        debounceTime(250),
        take(1),
        tap({
          next: () => {
            const data2 = {...this.invoice.data, url: documents[0].url};
            const invoice2 = {...this.invoice, data: data2};
            this.invoice = invoice2;
            this.dataService.select<Invoice>('Invoice').update(invoice2);
          },
        })
      )
      .subscribe();
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
      window.open(this.invoice.data.url);
    }
  }
}

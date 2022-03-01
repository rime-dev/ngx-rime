import {Component, Inject} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {of} from 'rxjs';
import {debounceTime, delay, take, tap} from 'rxjs/operators';
@Component({
  selector: 'rng-invoice-create-dialog',
  templateUrl: './invoice-create-dialog.component.html',
  styleUrls: ['./invoice-create-dialog.component.scss'],
})
export class InvoiceCreateDialogComponent {
  public path!: string;
  public document!: string;
  public titleFormControl = new FormControl();
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public matDialogRef: MatDialogRef<InvoiceCreateDialogComponent>
  ) {
    if (this.data && this.data.path) {
      this.path = this.data.path;
    }
    if (this.data && this.data.document) {
      this.document = this.data.document;
    }
  }

  onFinalize(event: Event) {
    of(event)
      .pipe(
        debounceTime(250),
        take(1),
        delay(2000),
        tap({next: () => this.matDialogRef.close(event)})
      )
      .subscribe();
  }
}

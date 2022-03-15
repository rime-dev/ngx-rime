import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {of} from 'rxjs';
import {debounceTime, delay, take, tap} from 'rxjs/operators';
@Component({
  selector: 'rng-group-add-logo-dialog',
  templateUrl: './group-add-logo-dialog.component.html',
})
export class GroupAddLogoDialogComponent {
  public path!: string;
  public document!: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public matDialogRef: MatDialogRef<GroupAddLogoDialogComponent>
  ) {
    if (this.data && this.data.path) {
      this.path = this.data.path;
    }
    if (this.data && this.data.document) {
      this.document = this.data.document;
    }
  }

  onFinalize(event: string[]) {
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

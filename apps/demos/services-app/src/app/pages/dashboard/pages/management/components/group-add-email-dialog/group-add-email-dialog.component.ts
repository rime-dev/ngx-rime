import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'rng-group-add-email-dialog',
  templateUrl: 'group-add-email-dialog.component.html',
})
export class GroupAddEmailDialogComponent {
  public group: any;
  constructor(@Inject(MAT_DIALOG_DATA) private data: any) {
    if (this.data && this.data.group) {
      this.group = this.data.group;
    }
  }
}

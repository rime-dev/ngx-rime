import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'rng-group-add-phone-dialog',
  templateUrl: 'group-add-phone-dialog.component.html',
})
export class GroupAddPhoneDialogComponent {
  public group: any;
  constructor(@Inject(MAT_DIALOG_DATA) private data: any) {
    if (this.data && this.data.group) {
      this.group = this.data.group;
    }
  }
}

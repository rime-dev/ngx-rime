import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'rng-group-add-additional-info-dialog',
  templateUrl: 'group-add-additional-info-dialog.component.html',
})
export class GroupAddAdditionalInfoDialogComponent {
  public group: any;
  public info = '';

  constructor(@Inject(MAT_DIALOG_DATA) private data: any) {
    if (this.data && this.data.group) {
      this.group = this.data.group;
    }
    if (this.data && this.data.info) {
      this.info = this.data.info;
    }
  }
}

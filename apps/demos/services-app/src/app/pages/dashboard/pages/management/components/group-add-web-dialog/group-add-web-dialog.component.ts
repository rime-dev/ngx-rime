import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'rng-group-add-web-dialog',
  templateUrl: 'group-add-web-dialog.component.html',
})
export class GroupAddWebDialogComponent {
  public group: any;
  constructor(@Inject(MAT_DIALOG_DATA) private data: any) {
    if (this.data && this.data.group) {
      this.group = this.data.group;
    }
  }
}

import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'rng-group-add-location-dialog',
  templateUrl: 'group-add-location-dialog.component.html',
})
export class GroupAddLocationDialogComponent {
  public group: any;
  public coordinates: number[] = [];
  constructor(@Inject(MAT_DIALOG_DATA) private data: any) {
    if (this.data && this.data.group) {
      this.group = this.data.group;
      this.coordinates = this.group.data.location.coordinates;
    }
  }
}

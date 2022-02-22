import {Component, Inject} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'rng-project-document-change-title-dialog',
  templateUrl: 'project-document-change-title-dialog.component.html',
})
export class ProjectDocumentChangeTitleDialogComponent {
  property = '';
  nameControl = new FormControl('', Validators.required);
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public matDialogRef: MatDialogRef<ProjectDocumentChangeTitleDialogComponent>
  ) {
    if (this.data && this.data.property) {
      this.property = this.data.property;
      if (this.data.value) {
        this.nameControl.patchValue(this.data.value);
      }
    }
  }
}

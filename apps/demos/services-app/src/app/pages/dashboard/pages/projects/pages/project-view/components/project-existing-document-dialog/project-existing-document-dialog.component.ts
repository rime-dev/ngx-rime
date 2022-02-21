import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'rng-project-existing-document-dialog',
  templateUrl: './project-existing-document-dialog.component.html',
  styleUrls: ['./project-existing-document-dialog.component.scss'],
})
export class ProjectExistingDocumentDialogComponent {
  public document!: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public matDialogRef: MatDialogRef<ProjectExistingDocumentDialogComponent>
  ) {
    if (this.data && this.data.document) {
      this.document = this.data.document;
    }
  }
}

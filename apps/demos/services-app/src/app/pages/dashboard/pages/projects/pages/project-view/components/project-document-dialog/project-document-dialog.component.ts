import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'rng-project-document-dialog',
  templateUrl: './project-document-dialog.component.html',
  styleUrls: ['./project-document-dialog.component.scss'],
})
export class ProjectDocumentDialogComponent {
  public path!: string;
  public document!: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    if (this.data && this.data.path) {
      this.path = this.data.path;
    }
    if (this.data && this.data.document) {
      this.document = this.data.document;
    }
  }

  onFinalize(event: Event) {
    console.log(event);
  }
}

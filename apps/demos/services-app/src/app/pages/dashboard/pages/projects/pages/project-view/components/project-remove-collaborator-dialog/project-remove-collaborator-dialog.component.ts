import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'rng-project-remove-collaborator-dialog',
  templateUrl: 'project-remove-collaborator-dialog.component.html',
})
export class ProjectRemoveCollaboratorDialogComponent {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}

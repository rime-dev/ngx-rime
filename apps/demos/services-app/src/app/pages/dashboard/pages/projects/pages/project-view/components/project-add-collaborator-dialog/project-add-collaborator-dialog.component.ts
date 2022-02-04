import {Component} from '@angular/core';
import {DataService} from '@rng/data-access/base';
import {EntityState} from '@rng/data-access/base/models/base.model';
import {Collaborator} from 'apps/demos/services-app/src/app/models/collaborator.model';
import {Observable} from 'rxjs';

@Component({
  selector: 'rng-project-add-collaborator-dialog',
  templateUrl: 'project-add-collaborator-dialog.component.html',
})
export class ProjectAddCollaboratorDialogComponent {
  public collaborators$: Observable<EntityState<Collaborator>[]>;
  constructor(private dataService: DataService) {
    this.collaborators$ = this.dataService.select('Collaborator').entities$;
  }
}

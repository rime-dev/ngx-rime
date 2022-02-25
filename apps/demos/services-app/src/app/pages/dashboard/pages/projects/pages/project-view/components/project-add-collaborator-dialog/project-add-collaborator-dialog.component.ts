import {Component} from '@angular/core';
import {User} from '@rng/data-access/auth';
import {DataService} from '@rng/data-access/base';
import {EntityState} from '@rng/data-access/base/models/base.model';
import {Observable} from 'rxjs';

@Component({
  selector: 'rng-project-add-collaborator-dialog',
  templateUrl: 'project-add-collaborator-dialog.component.html',
})
export class ProjectAddCollaboratorDialogComponent {
  public users$: Observable<EntityState<User>[]>;
  constructor(private dataService: DataService) {
    this.users$ = this.dataService.select('User').entities$;
  }
}

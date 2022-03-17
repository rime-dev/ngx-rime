import {Component, Input} from '@angular/core';
import {DataService} from '@rng/data-access/base';
import {EntityState} from '@rng/data-access/base/models/base.model';
import {User} from 'apps/demos/services-app/src/app/models/user.model';
import {Observable} from 'rxjs';

@Component({
  selector: 'rng-project-activity',
  templateUrl: './project-activity.component.html',
  styleUrls: ['./project-activity.component.scss'],
})
export class ProjectActivityComponent {
  public users$: Observable<EntityState<User>[]>;
  @Input()
  get project() {
    return this.internalProject;
  }
  set project(value: any) {
    this.internalProject = value;
  }
  private internalProject: any = {};

  constructor(dataService: DataService) {
    this.users$ = dataService.select<User>('User').entities$;
  }
}

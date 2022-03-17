import {Component, Input} from '@angular/core';
import {DataService} from '@rng/data-access/base';
import {EntityState} from '@rng/data-access/base/models/base.model';
import {Project} from 'apps/demos/services-app/src/app/models/project.model';
import {User} from 'apps/demos/services-app/src/app/models/user.model';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'rng-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss'],
})
export class ProjectCardComponent {
  public users$: Observable<EntityState<User>[]>;

  @Input()
  get project() {
    return this.internalProject;
  }
  set project(value: EntityState<Project>) {
    this.internalProject = value;
  }
  private internalProject!: EntityState<Project>;

  constructor(private dataService: DataService) {
    this.users$ = this.dataService
      .select<User>('User')
      .entities$.pipe(
        map((users: EntityState<User>[]) =>
          users.filter((user: EntityState<User>) =>
            this.project.data.collaborators.includes(user.id)
          )
        )
      );
  }
}

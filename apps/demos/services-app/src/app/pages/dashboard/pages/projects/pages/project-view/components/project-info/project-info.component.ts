import {Component, Input} from '@angular/core';
import {DataService} from '@rng/data-access/base';
import {EntityState} from '@rng/data-access/base/models/base.model';
import {Collaborator} from 'apps/demos/services-app/src/app/models/collaborator.model';
import {Project} from 'apps/demos/services-app/src/app/models/project.model';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'rng-project-info',
  templateUrl: './project-info.component.html',
  styleUrls: ['./project-info.component.scss'],
})
export class ProjectInfoComponent {
  public collaborators$: Observable<EntityState<Collaborator>[]>;

  @Input()
  get project() {
    return this.internalProject;
  }
  set project(value: EntityState<Project> | null) {
    this.internalProject = value;
  }
  private internalProject!: EntityState<Project> | null;

  constructor(private dataService: DataService) {
    this.collaborators$ = this.dataService
      .select('Collaborator')
      .entities$.pipe(
        map((collaborators: EntityState<Collaborator>[]) =>
          collaborators.filter((collaborator: EntityState<Collaborator>) =>
            this.project?.data.collaborators.includes(collaborator.id)
          )
        )
      );
  }
}

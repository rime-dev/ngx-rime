import {Component, Input} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TranslocoService} from '@ngneat/transloco';
import {DataService} from '@rng/data-access/base';
import {EntityState} from '@rng/data-access/base/models/base.model';
import {Collaborator} from 'apps/demos/services-app/src/app/models/collaborator.model';
import {Project} from 'apps/demos/services-app/src/app/models/project.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';

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

  constructor(
    private dataService: DataService,
    private snackBar: MatSnackBar,
    private translocoService: TranslocoService
  ) {
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

  acceptProject() {
    if (this.project) {
      const data = {...this.project.data, accepted: true, group: 'GS1'};
      const project = {...this.project, data};
      this.dataService.select('Project').update(project);
      this.snackBar.open(this.translocoService.translate('project.accepted'), '', {
        horizontalPosition: 'end',
        verticalPosition: 'top',
        duration: 3000,
      });
    }
  }
}

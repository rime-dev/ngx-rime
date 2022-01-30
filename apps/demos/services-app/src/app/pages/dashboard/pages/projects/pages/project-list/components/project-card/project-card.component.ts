import {Component, Input} from '@angular/core';
import {DataService} from '@rng/data-access/base';
import {EntityState} from '@rng/data-access/base/models/base.model';
import {Collaborator} from 'apps/demos/services-app/src/app/models/collaborator.model';
import {Observable} from 'rxjs';
import {filter, tap} from 'rxjs/operators';

@Component({
  selector: 'rng-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss'],
})
export class ProjectCardComponent {
  public collaborators$: Observable<EntityState<Collaborator>[]>;

  @Input()
  get project() {
    return this.internalProject;
  }
  set project(value: EntityState<Collaborator>) {
    this.internalProject = value;
  }
  private internalProject!: EntityState<Collaborator>;

  constructor(private dataService: DataService) {
    this.collaborators$ = this.dataService.select('Collaborator').entities$.pipe(
      filter((collaborators: EntityState<Collaborator>[]) =>
        collaborators.every((collaborator: EntityState<Collaborator>) =>
          this.project.data.collaborators.filter((element: string) => collaborator.id === element)
        )
      ),
      tap((c) => console.log(c))
    );
  }
}

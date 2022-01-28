import {Component, Input} from '@angular/core';
import {EntityState} from '@rng/data-access/base/models/base.model';
import {Project} from 'apps/demos/services-app/src/app/models/project.model';

@Component({
  selector: 'rng-project-info',
  templateUrl: './project-info.component.html',
  styleUrls: ['./project-info.component.scss'],
})
export class ProjectInfoComponent {
  @Input()
  get project() {
    return this.internalProject;
  }
  set project(value: EntityState<Project> | null) {
    this.internalProject = value;
    console.log(value);
  }
  private internalProject!: EntityState<Project> | null;

  constructor() {}
}

import {Component, Input} from '@angular/core';
import {collaborators} from 'apps/demos/services-app/src/assets/data';

@Component({
  selector: 'rng-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss'],
})
export class ProjectCardComponent {
  public collaboratorsArray: any[] = [];

  @Input()
  get project() {
    return this.internalProject;
  }
  set project(value: any) {
    this.internalProject = value;
    this.getCollaborators(value.collaborators);
  }
  private internalProject: any = {};

  constructor() {}

  getCollaborators(collaboratorsBase: any[]) {
    this.collaboratorsArray = collaborators.filter((collaborator: any) =>
      collaboratorsBase.some((cb: any) => collaborator.uid === cb)
    );
  }
}

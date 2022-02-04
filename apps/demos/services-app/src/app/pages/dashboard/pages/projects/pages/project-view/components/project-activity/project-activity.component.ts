import {Component, Input} from '@angular/core';

@Component({
  selector: 'rng-project-activity',
  templateUrl: './project-activity.component.html',
  styleUrls: ['./project-activity.component.scss'],
})
export class ProjectActivityComponent {
  @Input()
  get project() {
    return this.internalProject;
  }
  set project(value: any) {
    this.internalProject = value;
  }
  private internalProject: any = {};

  constructor() {}
}

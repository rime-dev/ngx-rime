import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'rng-project-activity',
  templateUrl: './project-activity.component.html',
  styleUrls: ['./project-activity.component.scss'],
})
export class ProjectActivityComponent implements OnInit {
  @Input()
  get project() {
    return this.internalProject;
  }
  set project(value: any) {
    this.internalProject = value;
  }
  private internalProject: any = {};

  constructor() {}

  ngOnInit(): void {}
}

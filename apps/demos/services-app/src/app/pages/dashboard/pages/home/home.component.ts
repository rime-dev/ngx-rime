import {Component} from '@angular/core';
import {otherProjects, projects} from 'apps/demos/services-app/src/assets/data';

@Component({
  selector: 'rng-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  activeProjects: any[];
  otherProjects: any[];

  constructor() {
    this.activeProjects = projects.filter((project: any) => project.state === 'active');
    this.otherProjects = otherProjects;
  }
}

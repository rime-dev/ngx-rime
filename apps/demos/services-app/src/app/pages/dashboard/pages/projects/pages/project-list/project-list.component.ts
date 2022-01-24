import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {collaborators, otherProjects, projects} from 'apps/demos/services-app/src/assets/data';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'rng-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
})
export class ProjectListComponent {
  public tabSelected = 0;
  public activeProjects: Observable<any[]>;
  public otherProjects: Observable<any[]>;
  public finishedProjects: Observable<any[]>;
  public collaborators: any[];
  constructor(private router: Router) {
    this.collaborators = collaborators;
    this.activeProjects = of(projects.filter((project: any) => project.data.state === 'active'));
    this.otherProjects = of(otherProjects);
    this.finishedProjects = of(projects.filter((project: any) => project.state === 'finished'));
    const currentNavigation = this.router.getCurrentNavigation();
    const state = currentNavigation?.extras.state;
    if (state) {
      if (state[0] === 'state' && state[1] === 'active') {
        this.tabSelected = 0;
      }
      if (state[0] === 'group' && state[1] === undefined) {
        this.tabSelected = 1;
      }
      if (state[0] === 'state' && state[1] === 'finished') {
        this.tabSelected = 2;
      }
    }
  }
  changeTab(event: number): void {
    this.tabSelected = event;
  }
  filterByType(type?: string): void {
    if (!type) {
      this.activeProjects = of(projects.filter((project: any) => project.state === 'active'));
      this.otherProjects = of(otherProjects);
      this.finishedProjects = of(projects.filter((project: any) => project.state === 'finished'));
    } else {
      this.activeProjects = of(
        projects.filter((project: any) => project.state === 'active' && project.type === type)
      );
      this.otherProjects = of(otherProjects.filter((project: any) => project.type === type));
      this.finishedProjects = of(
        projects.filter((project: any) => project.state === 'finished' && project.type === type)
      );
    }
  }
}

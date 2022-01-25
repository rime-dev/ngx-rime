import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {DataFilter, DataService} from '@rng/data-access/base';
import {EntityState} from '@rng/data-access/base/models/base.model';
import {Project} from 'apps/demos/services-app/src/app/models/project.model';
import {collaborators} from 'apps/demos/services-app/src/assets/data';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'rng-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
})
export class ProjectListComponent {
  public tabSelected = 0;
  public collaborators: any[];

  @DataFilter({fieldPath: 'state', opStr: '==', value: 'active'})
  public activeProjects$: Observable<EntityState<Project>[]>;

  @DataFilter({fieldPath: 'group', opStr: '==', value: undefined})
  public otherProjects$: Observable<EntityState<Project>[]>;

  @DataFilter({fieldPath: 'state', opStr: '==', value: 'finished'})
  public finishedProjects$: Observable<EntityState<Project>[]>;

  constructor(private router: Router, private dataService: DataService) {
    this.collaborators = collaborators;
    this.activeProjects$ = this.dataService.select('Project').entities$;
    this.otherProjects$ = this.dataService.select('Project').entities$;
    this.finishedProjects$ = this.dataService.select('Project').entities$;
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
      this.activeProjects$ = this.dataService.select('Project').entities$;
      this.otherProjects$ = this.dataService.select('Project').entities$;
      this.finishedProjects$ = this.dataService.select('Project').entities$;
    } else {
      this.activeProjects$ = this.dataService
        .select('Project')
        .entities$.pipe(
          map((documents: EntityState<Project>[]) =>
            documents.filter((project: EntityState<Project>) => project.data.type === type)
          )
        );
      this.otherProjects$ = this.dataService
        .select('Project')
        .entities$.pipe(
          map((documents: EntityState<Project>[]) =>
            documents.filter((project: EntityState<Project>) => project.data.type === type)
          )
        );
      this.finishedProjects$ = this.dataService
        .select('Project')
        .entities$.pipe(
          map((documents: EntityState<Project>[]) =>
            documents.filter((project: EntityState<Project>) => project.data.type === type)
          )
        );
    }
  }
}

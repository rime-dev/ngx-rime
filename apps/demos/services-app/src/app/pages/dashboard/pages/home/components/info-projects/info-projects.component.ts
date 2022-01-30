import {Component} from '@angular/core';
import {DataFilter, DataService} from '@rng/data-access/base';
import {EntityState} from '@rng/data-access/base/models/base.model';
import {Project} from 'apps/demos/services-app/src/app/models/project.model';
import {Observable} from 'rxjs';

@Component({
  selector: 'rng-info-projects',
  templateUrl: './info-projects.component.html',
  styleUrls: ['./info-projects.component.scss'],
})
export class InfoProjectsComponent {
  @DataFilter({fieldPath: 'state', opStr: '==', value: 'finished'})
  public finishedProjects$: Observable<EntityState<Project>[]>;

  constructor(private dataService: DataService) {
    this.finishedProjects$ = this.dataService.select('Project').entities$;
  }
}

import {Component} from '@angular/core';
import {DataFilter, DataService} from '@rng/data-access/base';
import {EntityState} from '@rng/data-access/base/models/base.model';
import {Project} from 'apps/demos/services-app/src/app/models/project.model';
import {Observable} from 'rxjs';

@Component({
  selector: 'rng-other-projects',
  templateUrl: './other-projects.component.html',
  styleUrls: ['./other-projects.component.scss'],
})
export class OtherProjectsComponent {
  @DataFilter({fieldPath: 'group', opStr: '==', value: undefined})
  public projects$: Observable<EntityState<Project>[]>;

  constructor(private dataService: DataService) {
    this.projects$ = this.dataService.select<Project>('Project').entities$;
  }
}

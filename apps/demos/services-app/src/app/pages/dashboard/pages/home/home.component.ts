import {Component} from '@angular/core';
import {DataService} from '@rng/data-access/base';
import {otherProjects, projects} from 'apps/demos/services-app/src/assets/data';
import {Observable} from 'rxjs';

@Component({
  selector: 'rng-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public activeProjects$!: Observable<any>;
  public otherProjects$!: Observable<any>;

  constructor(private dataService: DataService) {
    this.activeProjects$ = this.dataService.select('Project').entities$;
    // this.dataService.select('Project').getWithQuery({
    //   fieldPath: 'state',
    //   opStr: '=',
    //   value: 'active',
    // });
    // this.dataService.select('Project').getAll();
    // this.activeProjects = projects.filter((project: any) => project.state === 'active');
    // this.otherProjects = otherProjects;
  }
}

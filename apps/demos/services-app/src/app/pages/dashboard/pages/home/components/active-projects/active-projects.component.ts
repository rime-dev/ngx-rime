import {Component, OnInit} from '@angular/core';
import {DataFilter, DataService} from '@rng/data-access/base';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'rng-active-projects',
  templateUrl: './active-projects.component.html',
  styleUrls: ['./active-projects.component.scss'],
})
export class ActiveProjectsComponent implements OnInit {
  @DataFilter({fieldPath: 'state', opStr: '==', value: 'active'})
  public projects$: Observable<any>;

  constructor(private dataService: DataService) {
    this.projects$ = this.dataService.select('Project').entities$;
  }

  ngOnInit(): void {
    const query = [
      {
        fieldPath: 'state',
        opStr: '==',
        value: 'active',
      },
    ];
    this.dataService.select('Project').getWithQuery(query as any);
  }
}

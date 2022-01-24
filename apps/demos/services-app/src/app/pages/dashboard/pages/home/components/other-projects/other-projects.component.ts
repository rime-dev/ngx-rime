import {Component, OnInit} from '@angular/core';
import {DataFilter, DataService} from '@rng/data-access/base';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'rng-other-projects',
  templateUrl: './other-projects.component.html',
  styleUrls: ['./other-projects.component.scss'],
})
export class OtherProjectsComponent implements OnInit {
  @DataFilter({fieldPath: 'group', opStr: '==', value: undefined})
  public projects$: Observable<any>;

  constructor(private dataService: DataService) {
    this.projects$ = this.dataService.select('Project').entities$;
  }

  ngOnInit(): void {
    const query0 = [
      {
        fieldPath: 'group',
        opStr: '==',
        value: undefined,
      },
    ];
    this.dataService.select('Project').getWithQuery(query0 as any);
  }
}

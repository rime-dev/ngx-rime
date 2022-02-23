import {Component} from '@angular/core';
import {DataService} from '@rng/data-access/base';
import {EntityState} from '@rng/data-access/base/models/base.model';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Group} from '../../../../models/group.model';

@Component({
  selector: 'rng-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss'],
})
export class ManagementComponent {
  public tabSelected = 0;
  public group$: Observable<EntityState<Group>>;
  constructor(private dataService: DataService) {
    this.group$ = this.dataService.select('Group').entities$.pipe(map((groups) => groups[0]));
  }
  changeTab(event: number): void {
    this.tabSelected = event;
  }
}

import {Component} from '@angular/core';
import {DataService} from '@rng/data-access/base';
import {EntityState} from '@rng/data-access/base/models/base.model';
import {Feature} from 'ol';
import Point from 'ol/geom/Point';
import {fromLonLat} from 'ol/proj';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {Group} from '../../../../models/group.model';

@Component({
  selector: 'rng-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss'],
})
export class ManagementComponent {
  public tabSelected = 0;
  public center: number[] = [];
  public point$: Observable<any[]> = of([]);
  public group$: Observable<EntityState<Group>>;
  constructor(private dataService: DataService) {
    this.group$ = this.dataService.select('Group').entities$.pipe(map((groups) => groups[0]));
    this.point$ = this.group$.pipe(
      map((group: EntityState<Group>) => {
        setTimeout(() => {
          this.center = fromLonLat(group.data.location.coordinates);
        }, 0);
        return [
          new Feature({
            geometry: new Point(fromLonLat(group.data.location.coordinates)),
          }),
        ];
      })
    );
  }
  changeTab(event: number): void {
    this.tabSelected = event;
  }
  addAdditionalInfo(group: EntityState<Group>) {
    const additionalInfo = [...group.data.additionalInfo];
    additionalInfo.push('');
    const data = {...group.data, additionalInfo};
    const groupClone = {...group, data};
    this.dataService.select('Group').update(groupClone);
  }
}

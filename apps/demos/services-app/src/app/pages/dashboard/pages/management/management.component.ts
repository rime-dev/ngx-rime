import {Component} from '@angular/core';
import {User} from '@rng/data-access/auth';
import {DataService} from '@rng/data-access/base';
import {EntityState} from '@rng/data-access/base/models/base.model';
import {Feature} from 'ol';
import Point from 'ol/geom/Point';
import {fromLonLat} from 'ol/proj';
import {Observable, of} from 'rxjs';
import {delay, map, tap} from 'rxjs/operators';
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
  public users$: Observable<EntityState<User>[]>;
  public interactions = {
    dragPan: false,
    mouseWheelZoom: false,
    doubleClickZoom: false,
  };
  constructor(private dataService: DataService) {
    this.group$ = this.dataService.select('Group').entities$.pipe(map((groups) => groups[0]));
    this.users$ = this.dataService.select('User').entities$;
    this.point$ = this.group$.pipe(
      map((group: EntityState<Group>) => [
        new Feature({
          geometry: new Point(fromLonLat(group.data.location.coordinates)),
        }),
      ]),
      delay(0),
      tap({
        next: (features: Feature<Point>[]) => this.setCenterOfMap(features),
      })
    );
  }
  setCenterOfMap(features: Feature<Point>[]) {
    const geometry = features[0].getGeometry();
    if (geometry) {
      this.center = geometry.getCoordinates();
    }
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

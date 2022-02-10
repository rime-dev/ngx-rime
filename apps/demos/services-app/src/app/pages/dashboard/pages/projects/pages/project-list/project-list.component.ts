import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DataService} from '@rng/data-access/base';
// import {DataFilter} from '@rng/data-access/base/decorators';
import {dataFilter} from '@rng/data-access/base/operators';
import {EntityState} from '@rng/data-access/base/models/base.model';
import {Project} from 'apps/demos/services-app/src/app/models/project.model';
import {Observable, of} from 'rxjs';
import {MapComponent} from 'apps/demos/services-app/src/app/components/map/map.component';

@Component({
  selector: 'rng-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectListComponent implements OnInit {
  public tabSelected = 0;
  public filterByTypeSelected = 'all';
  public points$: Observable<any[]> = of([]);
  public projectsFiltered!: any;
  public center = [-0.4729078334928575, 39.431874010962424];
  public mapIsOpenOnMobile = false;
  // @DataFilter([
  //   {fieldPath: 'state', opStr: '==', value: 'active'},
  //   {fieldPath: 'group', opStr: '==', value: 'GS1'},
  // ])
  public activeProjects$: Observable<EntityState<Project>[]>;

  // @DataFilter({fieldPath: 'group', opStr: '==', value: undefined})
  public otherProjects$: Observable<EntityState<Project>[]>;

  // @DataFilter([
  //   {fieldPath: 'state', opStr: '==', value: 'inactive'},
  //   {fieldPath: 'group', opStr: '==', value: 'GS1'},
  // ])
  public inactiveProjects$: Observable<EntityState<Project>[]>;

  // @DataFilter([
  //   {fieldPath: 'state', opStr: '==', value: 'finished'},
  //   {fieldPath: 'group', opStr: '==', value: 'GS1'},
  // ])
  public finishedProjects$: Observable<EntityState<Project>[]>;

  constructor(
    private router: Router,
    private dataService: DataService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.activeProjects$ = this.dataService.select('Project').entities$.pipe(
      dataFilter([
        {fieldPath: 'state', opStr: '==', value: 'active'},
        {fieldPath: 'group', opStr: '==', value: 'GS1'},
      ])
    );
    this.otherProjects$ = this.dataService
      .select('Project')
      .entities$.pipe(dataFilter({fieldPath: 'group', opStr: '==', value: undefined}));
    this.inactiveProjects$ = this.dataService.select('Project').entities$.pipe(
      dataFilter([
        {fieldPath: 'state', opStr: '==', value: 'inactive'},
        {fieldPath: 'group', opStr: '==', value: 'GS1'},
      ])
    );
    this.finishedProjects$ = this.dataService.select('Project').entities$.pipe(
      dataFilter([
        {fieldPath: 'state', opStr: '==', value: 'finished'},
        {fieldPath: 'group', opStr: '==', value: 'GS1'},
      ])
    );
    const currentNavigation = this.router.getCurrentNavigation();
    const state = currentNavigation?.extras.state;
    if (state) {
      if (state[0] === 'state' && state[1] === 'active') {
        this.tabSelected = 0;
      }
      if (state[0] === 'group' && state[1] === undefined) {
        this.tabSelected = 1;
      }
      if (state[0] === 'state' && state[1] === 'inactive') {
        this.tabSelected = 2;
      }
      if (state[0] === 'state' && state[1] === 'finished') {
        this.tabSelected = 3;
      }
    }
  }
  toogleMapOnMobile() {
    this.mapIsOpenOnMobile = !this.mapIsOpenOnMobile;
  }
  updateMap(map: MapComponent): void {
    setTimeout(() => {
      map.updateMap();
    }, 0);
  }
  changeTab(event: number): void {
    this.tabSelected = event;
  }
  loadDataPoints(projects: EntityState<Project>[]) {
    if (projects) {
      this.points$ = of([
        ...projects.map((project: EntityState<Project>) => project.data.location.coordinates),
      ]);
    }
  }
  filterByType(type?: string): void {
    if (!type) {
      this.activeProjects$ = this.dataService.select('Project').entities$.pipe(
        dataFilter([
          {fieldPath: 'state', opStr: '==', value: 'active'},
          {fieldPath: 'group', opStr: '==', value: 'GS1'},
        ])
      );

      this.otherProjects$ = this.dataService
        .select('Project')
        .entities$.pipe(dataFilter({fieldPath: 'group', opStr: '==', value: undefined}));

      this.inactiveProjects$ = this.dataService.select('Project').entities$.pipe(
        dataFilter([
          {fieldPath: 'state', opStr: '==', value: 'inactive'},
          {fieldPath: 'group', opStr: '==', value: 'GS1'},
        ])
      );

      this.finishedProjects$ = this.dataService.select('Project').entities$.pipe(
        dataFilter([
          {fieldPath: 'state', opStr: '==', value: 'finished'},
          {fieldPath: 'group', opStr: '==', value: 'GS1'},
        ])
      );

      this.filterByTypeSelected = 'all';
    } else {
      this.activeProjects$ = this.dataService.select('Project').entities$.pipe(
        dataFilter([
          {fieldPath: 'state', opStr: '==', value: 'active'},
          {fieldPath: 'group', opStr: '==', value: 'GS1'},
          {fieldPath: 'type', opStr: '==', value: type},
        ])
      );

      this.otherProjects$ = this.dataService.select('Project').entities$.pipe(
        dataFilter([
          {fieldPath: 'group', opStr: '==', value: undefined},
          {fieldPath: 'type', opStr: '==', value: type},
        ])
      );

      this.inactiveProjects$ = this.dataService.select('Project').entities$.pipe(
        dataFilter([
          {fieldPath: 'state', opStr: '==', value: 'inactive'},
          {fieldPath: 'group', opStr: '==', value: 'GS1'},
          {fieldPath: 'type', opStr: '==', value: type},
        ])
      );

      this.finishedProjects$ = this.dataService.select('Project').entities$.pipe(
        dataFilter([
          {fieldPath: 'state', opStr: '==', value: 'finished'},
          {fieldPath: 'group', opStr: '==', value: 'GS1'},
          {fieldPath: 'type', opStr: '==', value: type},
        ])
      );
      this.filterByTypeSelected = type;
    }
    this.loadDataPoints(this.projectsFiltered);
    this.changeDetectorRef.detectChanges();
  }
  ngOnInit(): void {
    this.filterByType();
  }
}

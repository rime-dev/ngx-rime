import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DataService} from '@rng/data-access/base';
import {EntityState} from '@rng/data-access/base/models/base.model';
import {Project} from 'apps/demos/services-app/src/app/models/project.model';
import {collaborators} from 'apps/demos/services-app/src/assets/data';
import {Observable, of, Subject} from 'rxjs';
import {map, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'rng-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.scss'],
})
export class ProjectViewComponent implements OnInit, OnDestroy {
  public collaboratorsArray: any[] = [];
  public project$: Observable<EntityState<Project>> = of();
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private route: ActivatedRoute, private dataService: DataService) {}

  getCollaborators(collaboratorsBase: any[]) {
    this.collaboratorsArray = collaborators.filter((collaborator: any) =>
      collaboratorsBase.some((cb: any) => collaborator.uid === cb)
    );
  }
  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      this.project$ = this.dataService
        .select('Project')
        .entities$.pipe(
          map(
            (projects: EntityState<Project>[]) =>
              projects.filter((project) => project.id === params.id)[0]
          )
        );
      this.dataService.select('Project').getByKey(params.id);
      this.project$.pipe(takeUntil(this.destroy$)).subscribe();
    });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

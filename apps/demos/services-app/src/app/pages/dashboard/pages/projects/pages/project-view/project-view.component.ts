import {Component, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {collaborators, otherProjects, projects} from 'apps/demos/services-app/src/assets/data';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'rng-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.scss'],
})
export class ProjectViewComponent implements OnDestroy {
  public collaboratorsArray: any[] = [];
  public project: any;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private route: ActivatedRoute) {
    const allProjects = [...projects, ...otherProjects];
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      this.project = allProjects.filter((project: any) => project.uid === params.id)[0];
    });
  }
  getCollaborators(collaboratorsBase: any[]) {
    this.collaboratorsArray = collaborators.filter((collaborator: any) =>
      collaboratorsBase.some((cb: any) => collaborator.uid === cb)
    );
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

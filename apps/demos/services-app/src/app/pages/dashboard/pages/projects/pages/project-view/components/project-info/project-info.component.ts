import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, Input, OnDestroy, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TranslocoService} from '@ngneat/transloco';
import {AuthService} from '@rng/data-access/auth';
import {DataService} from '@rng/data-access/base';
import {EntityState} from '@rng/data-access/base/models/base.model';
import {log$} from 'apps/demos/services-app/src/app/decorators/log.decorator';
import {Collaborator} from 'apps/demos/services-app/src/app/models/collaborator.model';
import {
  Labels,
  Project,
  ProjectActivity,
} from 'apps/demos/services-app/src/app/models/project.model';
import {Observable, Subject} from 'rxjs';
import {map, startWith, takeUntil, tap} from 'rxjs/operators';
import {ProjectAddCollaboratorDialogComponent} from '../project-add-collaborator-dialog/project-add-collaborator-dialog.component';
import {ProjectChangeStateDialogComponent} from '../project-change-state-dialog/project-change-state-dialog.component';
import {ProjectRemoveCollaboratorDialogComponent} from '../project-remove-collaborator-dialog/project-remove-collaborator-dialog.component';

@Component({
  selector: 'rng-project-info',
  templateUrl: './project-info.component.html',
  styleUrls: ['./project-info.component.scss'],
})
export class ProjectInfoComponent implements OnDestroy {
  public labels = Labels;
  public separatorKeysCodes: number[] = [ENTER, COMMA];
  public collaborators$: Observable<EntityState<Collaborator>[]>;
  public filteredLabels: Observable<string[]>;
  public labelsControl = new FormControl();
  public editLabels = false;
  private stateChange$: Subject<void> = new Subject();
  private destroy$: Subject<void> = new Subject<void>();

  @Input()
  get project() {
    return this.internalProject;
  }
  set project(value: EntityState<Project> | null) {
    this.internalProject = value;
    this.stateChange$.next();
  }
  private internalProject!: EntityState<Project> | null;

  @ViewChild('labelsInput') labelsInput!: ElementRef<HTMLInputElement>;

  constructor(
    private dataService: DataService,
    private snackBar: MatSnackBar,
    private translocoService: TranslocoService,
    private authService: AuthService,
    public matDialog: MatDialog
  ) {
    this.filteredLabels = this.labelsControl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this.filterLabels(fruit) : Labels.labels.slice()))
    );
    this.collaborators$ = this.dataService.select('Collaborator').entities$;
    this.loadCollaborators();
    this.stateChange$
      .pipe(tap({next: () => this.loadCollaborators()}), takeUntil(this.destroy$))
      .subscribe();
  }
  private loadCollaborators() {
    this.collaborators$ = this.collaborators$.pipe(
      map((collaborators: EntityState<Collaborator>[]) =>
        collaborators.filter((collaborator: EntityState<Collaborator>) =>
          this.project?.data.collaborators.includes(collaborator.id)
        )
      )
    );
  }
  checkIfProjectIsFinished(): boolean {
    return this.project?.data.state === 'finished' ? true : false;
  }
  changeLabelsVisibility(visibility: boolean): void {
    if (this.checkIfProjectIsFinished()) {
      return;
    }
    this.editLabels = visibility;
  }
  removeLabel(label: string): void {
    const index = this.project?.data.labels.indexOf(label);
    if (index >= 0 && this.project) {
      const labels = [...this.project?.data.labels];
      labels.splice(index, 1);
      const data = {...this.project?.data, labels};
      let project = {...this.project, data};
      const activity = {
        action: 'remove',
        affected: 'label',
        result: label,
      };
      project = this.addActivity(activity, project);
      this.dataService.select('Project').update(project);
    }
  }

  selectedLabel(event: MatAutocompleteSelectedEvent): void {
    if (this.project) {
      const labels = [...this.project?.data.labels];
      labels.push(event.option.value);
      const data = {...this.project?.data, labels};
      let project = {...this.project, data};
      const activity = {
        action: 'add',
        affected: 'label',
        result: event.option.value,
      };
      project = this.addActivity(activity, project);
      this.dataService.select('Project').update(project);
      this.labelsInput.nativeElement.value = '';
      this.labelsControl.setValue(null);
    }
  }

  private filterLabels(value: string): string[] {
    const filterValue = value.toLowerCase();
    return Labels.labels.filter((label) => {
      const originalLabel = label.toLowerCase();
      const translatedLabel = this.translocoService
        .translate('labels.' + originalLabel)
        .toLowerCase();
      return translatedLabel.includes(filterValue);
    });
  }

  private addActivity(
    newActivity: Partial<ProjectActivity>,
    project: EntityState<Project>
  ): EntityState<Project> {
    newActivity = {
      ...newActivity,
      date: new Date().toISOString(),
      user: this.authService.user$.value?.uid as string,
    };
    const activity = [...project.data.activity];
    activity.push(newActivity);
    const data = {...project?.data, activity};
    return {...project, data};
  }

  acceptProject() {
    if (this.checkIfProjectIsFinished()) {
      return;
    }
    if (this.project) {
      const data = {...this.project.data, accepted: true, group: 'GS1'};
      const project = {...this.project, data};
      this.dataService.select('Project').update(project);
      this.snackBar.open(this.translocoService.translate('project.accepted'), '', {
        horizontalPosition: 'end',
        verticalPosition: 'top',
        duration: 3000,
      });
    }
  }
  openDialogToChangeState() {
    if (this.checkIfProjectIsFinished()) {
      return;
    }
    this.matDialog
      .open(ProjectChangeStateDialogComponent, {minWidth: '300px'})
      .afterClosed()
      .subscribe((state: string) => {
        if (state && state !== this.project?.data.state && this.project) {
          let data = {...this.project.data, state};
          if (state === 'finished') {
            data = {...data, endingDate: new Date().toISOString()};
          }
          let project: EntityState<Project> = {...this.project, data};
          const activity = {
            action: 'change',
            affected: 'state',
            result: state,
          };
          project = this.addActivity(activity, project);
          this.dataService.select('Project').update(project);
        }
      });
  }
  openDialogAddCollaborator() {
    if (this.checkIfProjectIsFinished()) {
      return;
    }
    this.matDialog
      .open(ProjectAddCollaboratorDialogComponent, {minWidth: '300px'})
      .afterClosed()
      .subscribe((collaborator: string) => {
        if (
          collaborator &&
          !this.project?.data.collaborators.includes(collaborator) &&
          this.project
        ) {
          const collaborators = [...this.project?.data.collaborators, collaborator];
          const data = {...this.project?.data, collaborators};
          let project: EntityState<Project> = {...this.project, data};
          const activity = {
            action: 'add',
            affected: 'collaborator',
            result: collaborator,
          };
          project = this.addActivity(activity, project);
          this.dataService.select('Project').update(project);
        }
      });
  }
  openDialogRemoveCollaborator(collaborator: EntityState<Collaborator>) {
    if (this.checkIfProjectIsFinished()) {
      return;
    }
    this.matDialog
      .open(ProjectRemoveCollaboratorDialogComponent, {minWidth: '300px', data: {collaborator}})
      .afterClosed()
      .subscribe((shouldRemove: boolean) => {
        if (shouldRemove && this.project) {
          const collaborators = [...this.project?.data.collaborators].filter(
            (value: string) => value !== collaborator.id
          );
          const data = {...this.project?.data, collaborators};
          let project = {...this.project, data};
          const activity = {
            action: 'remove',
            affected: 'collaborator',
            result: collaborator.id,
          };
          project = this.addActivity(activity, project);
          this.dataService.select('Project').update(project);
        }
      });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

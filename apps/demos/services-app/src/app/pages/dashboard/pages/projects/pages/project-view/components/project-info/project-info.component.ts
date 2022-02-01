import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {MatChipInputEvent} from '@angular/material/chips';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TranslocoService} from '@ngneat/transloco';
import {DataService} from '@rng/data-access/base';
import {EntityState} from '@rng/data-access/base/models/base.model';
import {Collaborator} from 'apps/demos/services-app/src/app/models/collaborator.model';
import {Labels, Project} from 'apps/demos/services-app/src/app/models/project.model';
import {Observable} from 'rxjs';
import {map, startWith, tap} from 'rxjs/operators';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';

@Component({
  selector: 'rng-project-info',
  templateUrl: './project-info.component.html',
  styleUrls: ['./project-info.component.scss'],
})
export class ProjectInfoComponent {
  public labels = Labels;
  public separatorKeysCodes: number[] = [ENTER, COMMA];
  public collaborators$: Observable<EntityState<Collaborator>[]>;
  public filteredLabels: Observable<string[]>;
  public labelsControl = new FormControl();

  @Input()
  get project() {
    return this.internalProject;
  }
  set project(value: EntityState<Project> | null) {
    this.internalProject = value;
  }
  private internalProject!: EntityState<Project> | null;

  @ViewChild('labelsInput') labelsInput!: ElementRef<HTMLInputElement>;

  constructor(
    private dataService: DataService,
    private snackBar: MatSnackBar,
    private translocoService: TranslocoService
  ) {
    this.filteredLabels = this.labelsControl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this.filterLabels(fruit) : Labels.labels.slice()))
    );
    this.collaborators$ = this.dataService
      .select('Collaborator')
      .entities$.pipe(
        map((collaborators: EntityState<Collaborator>[]) =>
          collaborators.filter((collaborator: EntityState<Collaborator>) =>
            this.project?.data.collaborators.includes(collaborator.id)
          )
        )
      );
  }

  removeLabel(label: string): void {
    const index = this.project?.data.labels.indexOf(label);
    if (index >= 0) {
      const labels = [...this.project?.data.labels];
      labels.splice(index, 1);
      const data = {...this.project?.data, labels};
      const project = {...this.project, data};
      this.dataService.select('Project').update(project);
    }
  }
  selectedLabel(event: MatAutocompleteSelectedEvent): void {
    const labels = [...this.project?.data.labels];
    labels.push(event.option.value);
    const data = {...this.project?.data, labels};
    const project = {...this.project, data};
    this.dataService.select('Project').update(project);
    this.labelsInput.nativeElement.value = '';
    this.labelsControl.setValue(null);
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
  acceptProject() {
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
}

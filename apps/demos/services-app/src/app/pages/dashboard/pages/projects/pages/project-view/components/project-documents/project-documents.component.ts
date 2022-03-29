import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {Update} from '@ngrx/entity';
import {AuthService} from '@rng/data-access/auth';
import {DataService} from '@rng/data-access/base';
import {EntityState} from '@rng/data-access/base/models/base.model';
import {Project, ProjectActivity} from 'apps/demos/services-app/src/app/models/project.model';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {filter, map, startWith, takeUntil, tap} from 'rxjs/operators';
import {ProjectDocumentDialogComponent} from '../project-document-dialog/project-document-dialog.component';
import {ProjectExistingDocumentDialogComponent} from '../project-existing-document-dialog/project-existing-document-dialog.component';
@Component({
  selector: 'rng-project-documents',
  templateUrl: './project-documents.component.html',
  styleUrls: ['./project-documents.component.scss'],
})
export class ProjectDocumentsComponent implements OnInit, OnDestroy {
  public filteredDocuments$: Observable<any[]> = of([]);
  public filteredDocuments: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public documentsFormControl = new FormControl('');

  @Input()
  get project() {
    return this.internalProject;
  }
  set project(value: any) {
    this.internalProject = value;
  }
  private internalProject: any = {};

  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private matDialog: MatDialog,
    private authService: AuthService,
    private dataService: DataService
  ) {
    this.filteredDocuments$ = this.filteredDocuments.asObservable();
  }

  ngOnInit(): void {
    if (this.project.data.documents) {
      this.filteredDocuments.next(this.project.data.documents);
    }

    this.documentsFormControl.valueChanges
      .pipe(
        startWith(''),
        filter(() => this.project.data.documents && this.project.data.documents.length > 0),
        map((value) => this.filter(value)),
        tap({
          next: (value) => this.filteredDocuments.next(value),
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  checkIfProjectIsFinished(): boolean {
    return this.project?.data.state === 'finished' ? true : false;
  }
  addDocument() {
    if (this.checkIfProjectIsFinished()) {
      return;
    }
    this.matDialog
      .open(ProjectDocumentDialogComponent, {
        data: {path: 'projects', document: this.project.id},
      })
      .afterClosed()
      .subscribe((documentsURL) => {
        this.addDocuments(documentsURL);
      });
  }
  viewDocument(document: any) {
    this.matDialog
      .open(ProjectExistingDocumentDialogComponent, {
        data: {document, project: this.project},
        width: '100vw',
        height: '100vh',
      })
      .afterClosed()
      .subscribe(() => {
        this.updateFormControl();
      });
  }
  private updateFormControl() {
    setTimeout(() => {
      const value = this.documentsFormControl.value || '';
      this.documentsFormControl.patchValue(value);
    }, 0);
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
    activity.push(newActivity as ProjectActivity);
    const data = {...project?.data, activity};
    return {...project, data};
  }

  private addDocuments(documents: any[]) {
    if (documents && documents.length > 0 && this.project) {
      const newDocuments = [...this.project.data.documents, ...documents];
      const data = {...this.project.data, documents: newDocuments};
      let project: EntityState<Project> = {...this.project, data};
      const activity = {
        action: 'add',
        affected: 'documents',
        result: documents.map((document) => document.title).join('. '),
      };
      project = this.addActivity(activity, project);
      this.dataService.select<Project>('Project').update(project);
      this.filteredDocuments.next(this.project.data.documents);
      this.updateFormControl();
    }
  }

  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.project.data.documents.filter((option: any) =>
      option.title.toLowerCase().includes(filterValue)
    );
  }
}

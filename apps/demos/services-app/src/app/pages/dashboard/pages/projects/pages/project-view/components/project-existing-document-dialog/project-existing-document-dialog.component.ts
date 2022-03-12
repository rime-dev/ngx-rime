import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {AuthService} from '@rng/data-access/auth';
import {DataService} from '@rng/data-access/base';
import {EntityState} from '@rng/data-access/base/models/base.model';
import {Project, ProjectActivity} from 'apps/demos/services-app/src/app/models/project.model';
// eslint-disable-next-line max-len
import {ProjectDocumentChangeTitleDialogComponent} from '../project-document-change-title-dialog/project-document-change-title-dialog.component';
@Component({
  selector: 'rng-project-existing-document-dialog',
  templateUrl: './project-existing-document-dialog.component.html',
  styleUrls: ['./project-existing-document-dialog.component.scss'],
})
export class ProjectExistingDocumentDialogComponent {
  public document!: any;
  public project!: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public matDialogRef: MatDialogRef<ProjectExistingDocumentDialogComponent>,
    private matDialog: MatDialog,
    private authService: AuthService,
    private dataService: DataService
  ) {
    if (this.data && this.data.document) {
      this.document = this.data.document;
    }
    if (this.data && this.data.project) {
      this.project = this.data.project;
    }
  }
  checkIfProjectIsFinished(): boolean {
    return this.project?.data.state === 'finished' ? true : false;
  }
  changeTitle() {
    if (this.checkIfProjectIsFinished()) {
      return;
    }
    this.matDialog
      .open(ProjectDocumentChangeTitleDialogComponent, {
        data: {property: 'title', value: this.document.title},
      })
      .afterClosed()
      .subscribe((propertyModified) => {
        if (propertyModified && propertyModified !== this.document.title) {
          const document = {...this.document, title: propertyModified};
          this.modifyDocument(document, 'title');
        }
      });
  }
  changeSubtitle() {
    if (this.checkIfProjectIsFinished()) {
      return;
    }
    this.matDialog
      .open(ProjectDocumentChangeTitleDialogComponent, {
        data: {property: 'subtitle', value: this.document.subtitle},
      })
      .afterClosed()
      .subscribe((propertyModified) => {
        if (propertyModified && propertyModified !== this.document.subtitle) {
          const document = {...this.document, subtitle: propertyModified};
          this.modifyDocument(document, 'subtitle');
        }
      });
  }
  openNewTab() {
    window.open(this.document.url, '_blank');
  }
  download() {
    try {
      const element = document.createElement('a');
      element.setAttribute('href', this.document.url);
      element.setAttribute('download', this.document.title);
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    } catch (e) {
      window.open(this.document.url);
    }
  }
  delete() {
    if (this.checkIfProjectIsFinished()) {
      return;
    }
    this.deleteDocument(this.document);
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
  private modifyDocument(document: any, property: string) {
    if (document && this.project) {
      const index = this.project.data.documents.findIndex((doc: any) => doc.id === document.id);
      const documents = [...this.project.data.documents];
      documents.splice(index, 1, document);
      const newDocuments = [...documents];
      const data = {...this.project.data, documents: newDocuments};
      let project: EntityState<Project> = {...this.project, data};
      const activity = {
        action: 'change',
        affected: 'documents',
        result: document[property],
      };
      project = this.addActivity(activity, project);
      this.dataService.select('Project').update(project);
      this.document = {...document};
    }
  }
  private deleteDocument(document: any) {
    if (document && this.project) {
      const index = this.project.data.documents.findIndex((doc: any) => doc.id === document.id);
      const documents = [...this.project.data.documents];
      documents.splice(index, 1);
      const newDocuments = [...documents];
      const data = {...this.project.data, documents: newDocuments};
      let project: EntityState<Project> = {...this.project, data};
      const activity = {
        action: 'remove',
        affected: 'documents',
        result: document.title,
      };
      project = this.addActivity(activity, project);
      this.dataService.select('Project').update(project);
      this.matDialogRef.close();
    }
  }
}

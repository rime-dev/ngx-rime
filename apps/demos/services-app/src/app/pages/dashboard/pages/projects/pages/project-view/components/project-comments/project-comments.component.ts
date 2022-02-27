import {Component, Input} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AuthService, User} from '@rng/data-access/auth';
import {DataService} from '@rng/data-access/base';
import {EntityState} from '@rng/data-access/base/models/base.model';
import {Project, ProjectActivity} from 'apps/demos/services-app/src/app/models/project.model';
import {Observable} from 'rxjs';
import {ProjectAddCommentDialogComponent} from '../project-add-comment-dialog/project-add-comment-dialog.component';

@Component({
  selector: 'rng-project-comments',
  templateUrl: './project-comments.component.html',
  styleUrls: ['./project-comments.component.scss'],
})
export class ProjectCommentsComponent {
  @Input()
  get project() {
    return this.internalProject;
  }
  set project(value: any) {
    this.internalProject = value;
  }
  private internalProject: any = {};

  constructor(
    private dataService: DataService,
    private authService: AuthService,
    private matDialog: MatDialog
  ) {}

  openDialogToAddComment() {
    this.matDialog
      .open(ProjectAddCommentDialogComponent, {minWidth: '300px'})
      .afterClosed()
      .subscribe((comment: Record<string, any>) => {
        if (comment && this.project) {
          const comments = [...this.project?.data.comments];
          comment.user = this.authService.user$.value?.uid;
          comments.push(comment);
          const data = {...this.project?.data, comments};
          let project: EntityState<Project> = {...this.project, data};
          const activity = {
            action: 'add',
            affected: 'comment',
            result: comment.title,
          };
          project = this.addActivity(activity, project);
          this.dataService.select('Project').update(project);
        }
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
}

import {Component, Input} from '@angular/core';
import {User} from '@rng/data-access/auth';
import {DataService} from '@rng/data-access/base';
import {EntityState} from '@rng/data-access/base/models/base.model';
import {Observable} from 'rxjs';

@Component({
  selector: 'rng-project-comments',
  templateUrl: './project-comments.component.html',
  styleUrls: ['./project-comments.component.scss'],
})
export class ProjectCommentsComponent {
  public users$: Observable<EntityState<User>[]>;
  @Input()
  get project() {
    return this.internalProject;
  }
  set project(value: any) {
    this.internalProject = value;
  }
  private internalProject: any = {};

  constructor(dataService: DataService) {
    this.users$ = dataService.select('User').entities$;
  }
}

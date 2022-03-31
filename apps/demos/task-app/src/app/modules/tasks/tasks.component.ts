import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Update} from '@ngrx/entity';
import {DataService} from '@rime-dev/data-access/base';
import {EntityState} from '@rime-dev/data-access/base/models/base.model';
import {Observable} from 'rxjs';

@Component({
  selector: 'rng-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  public tasks$!: Observable<any>;
  public form: FormGroup;
  public addMode = false;
  public editMode = false;
  public selectedTask!: EntityState<any> | undefined;
  constructor(private dataService: DataService, private formBuilder: FormBuilder) {
    this.tasks$ = this.dataService.select('Task').entities$;
    this.form = this.formBuilder.group({
      title: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.dataService.select('Task').getAll();
  }
  addTask() {
    this.addMode = !this.addMode;
  }
  editTask(task: EntityState<any>) {
    this.editMode = !this.editMode;
    this.selectedTask = task;
    this.form.patchValue(this.selectedTask?.data);
  }
  removeTask(task: EntityState<any>) {
    this.editMode = !this.editMode;
    const data = this.form.getRawValue();
    this.dataService.select('Task').delete(task.id);
  }
  saveEdition() {
    if (this.form.invalid) {
      return;
    }
    this.editMode = !this.editMode;
    const data = this.form.getRawValue();
    if (this.selectedTask) {
      this.selectedTask = {id: this.selectedTask.id, data};
      this.dataService.select('Task').update(this.selectedTask as any);
    }
  }
  closeEdition() {
    this.editMode = !this.editMode;
    this.selectedTask = undefined;
  }
  submitAdd() {
    if (this.form.invalid) {
      return;
    }
    this.dataService.select('Task').add(this.form.getRawValue());
  }
}

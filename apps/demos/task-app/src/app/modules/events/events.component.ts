import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RimeDataService} from '@ngx-rime/data-access/base';
import {
  ConditionalQueryFirestore,
  RimeEntityState,
} from '@ngx-rime/data-access/base/models/base.model';
import {Observable} from 'rxjs';

@Component({
  selector: 'rime-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit {
  public events$!: Observable<any>;
  public form: FormGroup;
  public addMode = false;
  public editMode = false;
  public selectedEvent!: RimeEntityState<any> | undefined;
  constructor(private dataService: RimeDataService, private formBuilder: FormBuilder) {
    this.events$ = this.dataService.select('Event').entities$;
    this.form = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', []],
    });
  }
  ngOnInit(): void {
    const query: ConditionalQueryFirestore[] = [
      {
        fieldPath: 'type',
        opStr: '==',
        value: '3',
      },
      {
        fieldPath: 'description',
        opStr: '!=',
        value: '',
      },
    ];
    this.dataService.select('Event').getWithQuery(query);
  }
  addEvent() {
    this.addMode = !this.addMode;
  }
  editEvent(task: RimeEntityState<any>) {
    this.editMode = !this.editMode;
    this.selectedEvent = task;
    this.form.patchValue(this.selectedEvent?.data);
  }
  removeEvent(task: RimeEntityState<any>) {
    this.editMode = !this.editMode;
    const data = this.form.getRawValue();
    this.dataService.select('Event').delete(task.id);
  }
  saveEdition() {
    if (this.form.invalid) {
      return;
    }
    this.editMode = !this.editMode;
    const data = this.form.getRawValue();
    if (this.selectedEvent) {
      this.selectedEvent = {id: this.selectedEvent.id, data};
      this.dataService.select('Event').update(this.selectedEvent as any);
    }
  }
  closeEdition() {
    this.editMode = !this.editMode;
    this.selectedEvent = undefined;
  }
  submitAdd() {
    if (this.form.invalid) {
      return;
    }
    this.dataService.select('Event').add(this.form.getRawValue());
  }
}

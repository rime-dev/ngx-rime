import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, Inject, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {TranslocoService} from '@ngneat/transloco';
import {DataService} from '@rng/data-access/base';
import {Observable} from 'rxjs';
import {map, startWith, tap} from 'rxjs/operators';

@Component({
  selector: 'rng-group-add-activity-dialog',
  templateUrl: 'group-add-activity-dialog.component.html',
})
export class GroupAddActivityDialogComponent {
  public group: any;
  public activities$: Observable<any>;
  public activities: any[];
  public filteredActivities$: Observable<any[]>;

  public separatorKeysCodes: number[] = [ENTER, COMMA];
  public activityControl = new FormControl();

  @ViewChild('activitiesInput') activitiesInput!: ElementRef<HTMLInputElement>;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dataService: DataService,
    private translocoService: TranslocoService
  ) {
    if (this.data && this.data.group) {
      this.group = this.data.group;
    }
    this.activities = [];
    this.activities$ = this.dataService
      .select('Activity')
      .entities$.pipe(tap({next: (values: any[]) => (this.activities = values)}));

    this.filteredActivities$ = this.activityControl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => this.filterActivities(fruit as string))
    );
  }
  removeActivity(label: string): void {
    const index = this.group?.data.activities.indexOf(label);
    if (index >= 0 && this.group) {
      const activities = [...this.group?.data.activities];
      activities.splice(index, 1);
      const data = {...this.group?.data, activities};
      this.group = {...this.group, data};
    }
  }
  selectedActivity(event: MatAutocompleteSelectedEvent): void {
    if (this.group) {
      this.activitiesInput.nativeElement.value = '';
      this.activityControl.setValue(null);
      let activities: any = [];
      if (this.group?.data.activities) {
        activities = [...this.group?.data.activities];
      }
      activities.push(event.option.value);
      const data = {...this.group?.data, activities};
      this.group = {...this.group, data};
    }
  }
  private filterActivities(value: string): string[] {
    const filterValue = value?.toLowerCase();
    if (filterValue === null || filterValue === undefined) {
      return this.activities;
    }
    return this.activities.filter((activity) => {
      const originalLabel = String(activity.data.code.toLowerCase());
      const translatedLabel = this.translocoService
        .translate('activities.' + originalLabel)
        .toLowerCase();
      return translatedLabel.includes(filterValue);
    });
  }
}

import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, Inject, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatChipInputEvent} from '@angular/material/chips';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'rng-group-add-postal-code-dialog',
  templateUrl: 'group-add-postal-code-dialog.component.html',
})
export class GroupAddPostalCodeDialogComponent {
  public group: any;
  public separatorKeysCodes: number[] = [ENTER, COMMA];
  public postalCodeControl = new FormControl();
  @ViewChild('coverageInput') coverageInput!: ElementRef<HTMLInputElement>;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any) {
    if (this.data && this.data.group) {
      this.group = this.data.group;
    }
  }
  removePostalCode(label: string): void {
    const index = this.group?.data.coverage.indexOf(label);
    if (index >= 0 && this.group) {
      const coverage = [...this.group?.data.coverage];
      coverage.splice(index, 1);
      const data = {...this.group?.data, coverage};
      this.group = {...this.group, data};
    }
  }
  selectedPostalCode(event: MatChipInputEvent): void {
    if (this.group) {
      this.coverageInput.nativeElement.value = '';
      this.postalCodeControl.setValue(null);
      let coverage: string[] = [];
      if (this.group?.data.coverage) {
        coverage = [...this.group?.data.coverage];
      }
      const value = (event.value || '').trim();
      if (value) {
        coverage.push(value);
        const data = {...this.group?.data, coverage};
        this.group = {...this.group, data};
      }
    }
  }
}

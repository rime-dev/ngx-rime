import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {DataFilter, DataService} from '@rng/data-access/base';
import {EntityState} from '@rng/data-access/base/models/base.model';
import {Project} from 'apps/demos/services-app/src/app/models/project.model';
import {Observable, of} from 'rxjs';
import {debounceTime, delay, take, tap} from 'rxjs/operators';
@Component({
  selector: 'rng-invoice-create-dialog',
  templateUrl: './invoice-create-dialog.component.html',
  styleUrls: ['./invoice-create-dialog.component.scss'],
})
export class InvoiceCreateDialogComponent {
  public path!: string;
  public document!: string;
  public titleFormControl = new FormControl();
  public descriptionFormControl = new FormControl();
  public costFormControl = new FormControl();
  public taxesFormControl = new FormControl();
  public projectsFormControl = new FormControl();
  public form: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl(''),
    cost: new FormControl(null, [Validators.required]),
    taxes: new FormControl(null, Validators.required),
    project: new FormControl('', Validators.required),
    url: new FormControl('', Validators.required),
  });
  public files!: any[];

  @DataFilter({fieldPath: 'state', opStr: '==', value: 'active'})
  public projects$: Observable<EntityState<Project>[]>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public matDialogRef: MatDialogRef<InvoiceCreateDialogComponent>,
    private dataService: DataService,
    private matSnackBar: MatSnackBar
  ) {
    this.projects$ = this.dataService.select('Project').entities$;
    if (this.data && this.data.path) {
      this.path = this.data.path;
    }
    if (this.data && this.data.document) {
      this.document = this.data.document;
    }
  }
  openSnackBar(message: string, action: string) {
    this.matSnackBar.open(message, action, {
      duration: 200000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }
  submitInvoice() {
    if (!this.form.valid) {
      this.openSnackBar('Faltan datos', '');
      return;
    }
    this.matDialogRef.close(this.form.getRawValue());
  }
  onFinalize(documents: any[]) {
    of(documents)
      .pipe(
        debounceTime(250),
        take(1),
        tap({
          next: () => {
            this.files = documents;
            this.form.controls.url.patchValue(documents[0].url);
          },
        })
      )
      .subscribe();
  }
}

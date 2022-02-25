import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {DataService} from '@rng/data-access/base';
import {BehaviorSubject, Observable, of} from 'rxjs';
@Component({
  selector: 'rng-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.scss'],
})
export class AddUserDialogComponent {
  public userFormControl = new FormControl('');
  public userFound$: Observable<any[] | undefined> = of(undefined);
  constructor(private dataService: DataService) {}

  searchUser(email: string) {
    if (email) {
      this.userFound$ = this.dataService.select('User').getWithQuery([
        {
          fieldPath: 'email',
          opStr: '==',
          value: email,
        },
      ] as any);
    }
  }
}

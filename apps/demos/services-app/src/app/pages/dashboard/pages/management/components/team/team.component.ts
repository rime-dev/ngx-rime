import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {DataService} from '@rng/data-access/base';
import {BehaviorSubject, Subject} from 'rxjs';
import {map, startWith, takeUntil, tap} from 'rxjs/operators';

@Component({
  selector: 'rng-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
})
export class TeamComponent implements OnInit, OnDestroy {
  public usersFormControl = new FormControl('');
  public filteredUsers$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  private destroy$: Subject<void> = new Subject<void>();

  @Input() users: any[] = [];

  constructor(private matDialog: MatDialog, private dataService: DataService) {}

  ngOnInit(): void {
    this.filteredUsers$.next(this.users);
    this.usersFormControl.valueChanges
      .pipe(
        startWith(''),
        map((value) => this.filter(value)),
        tap({
          next: (value) => this.filteredUsers$.next(value),
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  openTabForEmail(email: string): void {
    if (email) {
      window.open('mailto:' + email, '_blank');
    }
  }
  openTabForPhone(phone: string): void {
    if (phone) {
      window.open('tel:' + phone, '_blank');
    }
  }
  private addUserDocument(user: any) {
    if (user) {
      this.updateFormControl();
    }
  }
  private updateFormControl() {
    setTimeout(() => {
      const value = this.usersFormControl.value || '';
      this.usersFormControl.patchValue(value);
    }, 0);
  }
  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.users.filter((option: any) =>
      option.data.name?.toLowerCase().includes(filterValue)
    );
  }
}

import {Injectable, OnDestroy} from '@angular/core';
import {User as User2} from '@angular/fire/auth';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {Action} from '@ngrx/store';
import {Observable, Subject} from 'rxjs';
import {distinctUntilChanged, map, takeUntil} from 'rxjs/operators';

export class User {
  uid: string | undefined;
  displayName?: string | null | undefined;
  email?: string | null | undefined;
  phoneNumber?: string | null | undefined;
  photoUrl?: string | null | undefined;
  constructor(payload: Partial<User2> | null) {
    this.uid = payload?.uid;
    this.displayName = payload?.displayName;
    this.email = payload?.email;
    this.phoneNumber = payload?.phoneNumber;
    this.photoUrl = payload?.photoURL;
  }
}

@Injectable()
export class UserService implements OnDestroy {
  private destroy$: Subject<void> = new Subject();
  public user$!: Observable<User>;
  constructor(private angularFireAuth: AngularFireAuth) {
    this.user$ = angularFireAuth.authState.pipe(
      distinctUntilChanged(),
      map((user) => new User(user as User2)),
      takeUntil(this.destroy$)
    );
  }
  login(email: string, password: string) {
    this.angularFireAuth.signInWithEmailAndPassword(email, password);
  }
  logout() {
    this.angularFireAuth.signOut();
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

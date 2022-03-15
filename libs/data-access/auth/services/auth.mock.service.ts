import {Injectable, NgZone, OnDestroy} from '@angular/core';
import {GoogleAuthProvider} from '@angular/fire/auth';
import {Router} from '@angular/router';
import firebase from 'firebase/compat';
import {BehaviorSubject, of, Subject} from 'rxjs';
import {User} from '../models/auth.model';

@Injectable()
export class AuthTestingService implements OnDestroy {
  private destroy$: Subject<void> = new Subject();
  public user$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>({
    uid: 'ABC',
    email: 'carlos@gmail.com',
    displayName: 'carlos',
    photoURL: '',
    emailVerified: true,
  });

  constructor(public router: Router, public ngZone: NgZone) {
    const user: User = {
      uid: 'ABC',
      email: 'carlos@gmail.com',
      displayName: 'carlos',
      photoURL: '',
      emailVerified: true,
    };
    this.user$.next(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  // Sign in with email/password
  signIn(email: string, password: string): Promise<void> {
    const user: User = {
      uid: 'ABC',
      email: email,
      displayName: 'carlos',
      photoURL: '',
      emailVerified: true,
    };
    this.ngZone.run(() => {
      this.router.navigate(['/dashboard']);
      this.setUserData(user);
    });
    return Promise.resolve();
  }

  // Sign up with email/password
  signUp(email: string, password: string) {
    const user: User = {
      uid: 'ABC',
      email: email,
      displayName: 'carlos',
      photoURL: '',
      emailVerified: true,
    };
    this.sendVerificationMail();
    this.setUserData(user);
    return Promise.resolve();
  }

  // Send email verfificaiton when new user sign up
  public sendVerificationMail() {
    this.router.navigate(['verify-email-address']);
  }

  // Reset Forggot password
  public forgotPassword(passwordResetEmail: string) {
    window.alert('Password reset email sent, check your inbox.');
  }

  // Returns user role
  get userRole(): string | null {
    return localStorage.getItem('role');
  }
  // Returns user type
  get userType(): string | null {
    return localStorage.getItem('type');
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(String(localStorage.getItem('user')));
    return user !== null ? true : false;
  }

  // Returns true when user has a verified email
  get hasEmailVerified(): boolean {
    const user = JSON.parse(String(localStorage.getItem('user')));
    return user && user.emailVerified ? true : false;
  }
  // Sign in with Google
  public googleAuth() {
    return this.authLogin(new GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  public authLogin(provider: firebase.auth.AuthProvider) {
    const user: User = {
      uid: 'ABC',
      email: 'carlos@gmail.com',
      displayName: 'carlos',
      photoURL: '',
      emailVerified: true,
    };

    this.ngZone.run(() => {
      this.router.navigate(['dashboard']);
    });
    this.setUserData(user );
  }

  /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  public setUserData(user: User) {
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };

    return Promise.resolve(userData);
  }
  public getUserData(user: User) {
    return of(user);
  }
  // Sign out
  public signOut() {
    localStorage.removeItem('user');
    this.router.navigate(['sign-in']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService, User} from '@rng/data-access/auth/services/auth.service';
import {DataService} from '@rng/data-access/base';
import {Observable, Subject} from 'rxjs';
import {environment} from '../environments/environment';

@Component({
  selector: 'rng-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'rng-app';
  logo = {
    src: 'assets/rng-logo.png',
    alt: 'RNG APP',
  };
  topRoutes = [
    {
      path: '/home',
      text: 'Home',
    },
  ];
  sideRoutes = [
    {
      path: '/home',
      text: 'Home',
      icon: 'home',
      divider: true,
    },
    {
      text: 'Tools',
      children: [
        {
          path: '/tools/1',
          text: 'Tool 1',
          icon: 'build',
        },
        {
          path: '/tools/2',
          text: 'Tool 2',
          icon: 'build',
        },
      ],
    },
    {
      divider: true,
    },
  ];
  userRoutes = [
    {
      click: () => {
        this.authService.signOut();
      },
      text: 'Logout',
      icon: 'logout',
    },
  ];
  userInfo = {
    name: 'Name',
    lastname: 'Lastname',
    // eslint-disable-next-line max-len
    avatar: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`,
    email: 'email.email.com',
  };
  private destroy$: Subject<void> = new Subject();
  public user$: Observable<User | null>;
  // public houses$: Observable<any>;
  // public clients$: Observable<any>;
  public groups$: Observable<any>;
  public tasks$: Observable<any>;
  showLoginButton = false;
  showLogoutButton = false;

  constructor(private authService: AuthService, private dataService: DataService) {
    this.user$ = this.authService.user$;
    this.dataService.select('Task').getAll();
    this.tasks$ = this.dataService.select('Task').entities$;
    this.dataService.select('Group').getAll();
    this.groups$ = this.dataService.select('Group').entities$;
  }

  ngOnInit() {
    this.login();
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  login() {
    this.authService.signIn(
      environment.userCredentials.email,
      environment.userCredentials.password
    );
  }
  logout() {
    this.authService.signOut();
  }
}

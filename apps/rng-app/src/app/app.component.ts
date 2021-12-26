import {Component, OnDestroy} from '@angular/core';
import {AuthService, User} from '@rng/data-access/auth/services/auth.service';
import {DataService} from '@rng/data-access/base';
import {Observable, Subject} from 'rxjs';

@Component({
  selector: 'rng-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
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
  private destroy$: Subject<void> = new Subject();
  public user$: Observable<User | null>;
  showLoginButton = false;
  showLogoutButton = false;

  constructor(private authService: AuthService) {
    this.user$ = this.authService.user$;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

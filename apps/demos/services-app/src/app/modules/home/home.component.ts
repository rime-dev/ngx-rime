import {Component, OnDestroy} from '@angular/core';
import {AuthService, User} from '@rng/data-access/auth';
import {Subject, Observable} from 'rxjs';

@Component({
  selector: 'rng-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnDestroy {
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
      path: '/dashboard',
      text: 'Home',
      icon: 'home',
      divider: true,
    },
    {
      text: 'Tools',
      children: [
        {
          path: '/tasks',
          text: 'Tasks',
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

import { Component, OnDestroy } from '@angular/core';
import { RimeRoutes, RimeShellLogo } from '@ngx-rime/ui/shell';
import { Subject } from 'rxjs';

@Component({
  selector: 'rime-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  title = 'ngx-rime-app';
  logo: RimeShellLogo = {
    src: 'assets/ngx-rime-logo.png',
    alt: 'NGX-RIME APP',
  };
  topRoutes: RimeRoutes[] = [
    {
      path: '/home',
      text: 'Home',
    },
  ];
  sideRoutes: RimeRoutes[] = [
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

  private destroy$: Subject<void> = new Subject();
  showLoginButton = false;
  showLogoutButton = false;



  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

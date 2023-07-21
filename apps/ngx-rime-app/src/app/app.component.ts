import {Component, OnDestroy, OnInit} from '@angular/core';
import {RimeRoutes, RimeShellLogo} from '@ngx-rime/ui/shell';
import {Subject} from 'rxjs';

@Component({
  selector: 'rime-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
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

  ngOnInit(): void {
    if (
      localStorage.getItem('theme') === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#303030');
    } else {
      document.documentElement.classList.remove('dark');
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#ffffff');
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

import {Component, OnDestroy} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {filter, Observable, Subject, takeUntil, tap} from 'rxjs';

import {RimeAuthService} from '@ngx-rime/data-access/auth';
import {RimeRoutes, RimeShellLogo} from '@ngx-rime/ui/shell';
import {RimeUserInfo} from '@ngx-rime/ui/user-account-popup';

@Component({
  selector: 'rime-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  title = 'Task APP';
  titlePage = 'Task APP';
  logo: RimeShellLogo = {
    src: 'assets/ngx-rime-logo.png',
    alt: 'NGX-RIME APP',
  };
  topRoutes: RimeRoutes[] = [];
  sideRoutes: RimeRoutes[] = [
    {
      path: '/tasks',
      text: 'Tasks',
      icon: 'task',
      divider: true,
    },
    {
      path: '/events',
      text: 'Events',
      icon: 'event',
      divider: true,
    },
  ];
  userRoutes = [
    {
      click: () => this.userOnSignout(),
      text: 'Logout',
      icon: 'logout',
    },
  ];
  public user$!: Observable<RimeUserInfo | null>;
  private destroy = new Subject<void>();

  constructor(private router: Router, private authService: RimeAuthService) {
    this.user$ = this.authService.user$;
    this.getTitlePage(this.router.url);
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        tap({
          next: (event) => {
            this.getTitlePage((event as NavigationEnd).url);
          },
        }),
        takeUntil(this.destroy)
      )
      .subscribe();
  }
  ngOnDestroy() {
    this.destroy.next();
    this.destroy.next();
  }
  public async userOnSignout() {
    await this.authService.signOut();
  }
  private getTitlePage(url: string) {
    const rimeRoute = this.sideRoutes.filter(
      (route) => route.path && url.includes(route.path) && route.text
    )[0];
    if (rimeRoute) {
      this.titlePage = rimeRoute.text as string;
    }
  }
}

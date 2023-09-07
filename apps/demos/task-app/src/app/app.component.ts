import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {RimeRoutes, RimeShellLogo} from '@ngx-rime/ui/shell';
import {NavigationEnd, Router} from "@angular/router";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {filter, tap} from "rxjs";

@Component({
  selector: 'rime-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent  {
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
  private readonly destroy: DestroyRef = inject(DestroyRef);

  constructor(
    private router: Router,
  ) {

    this.getTitlePage(this.router.url);
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        tap({
          next: (event) => {
            this.getTitlePage((event as NavigationEnd).url);
          },
        }),
        takeUntilDestroyed(this.destroy)
      )
      .subscribe();
  }
  private getTitlePage(url: string) {
    const rimeRoute = this.sideRoutes.filter(
      (route) =>  route.path && url.includes(route.path) && route.text
    )[0];
    if (rimeRoute) {
      this.titlePage = rimeRoute.text as string;
    }

  }
}

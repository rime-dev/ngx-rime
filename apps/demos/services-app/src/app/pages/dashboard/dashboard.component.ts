import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {AuthService, User} from '@rng/data-access/auth';
import {DataService} from '@rng/data-access/base';
import {Observable, Subject} from 'rxjs';
import {filter, map, take, takeUntil, tap} from 'rxjs/operators';
import {log$} from 'apps/demos/services-app/src/app/decorators/log.decorator';
import {EntityState} from '@rng/data-access/base/models/base.model';
import {UserInfo} from '@rng/ui/user-account-popup';
import {user} from 'rxfire/auth';

@Component({
  selector: 'rng-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  appName = 'E-Servicios';
  logo = {
    src: 'assets/rng-logo.png',
    alt: 'RNG APP',
  };
  topRoutes = [];
  sideRoutes = [
    {
      path: '/dashboard/home',
      text: 'Inicio',
      icon: 'home',
    },
    {
      path: '/dashboard/projects',
      text: 'Proyectos',
      icon: 'work',
    },
    {
      path: '/dashboard/invoices',
      text: 'Facturas',
      icon: 'receipt_long',
    },
    {
      path: '/dashboard/management',
      text: 'Administración',
      icon: 'admin_panel_settings',
    },
    // {
    //   path: '/dashboard/reports',
    //   text: 'Informes',
    //   icon: 'analytics',
    // },
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

  public hasSidenav = true;
  private destroy$: Subject<void> = new Subject();
  @log$ public userAuth$: Observable<User | null>;
  @log$ public user$!: Observable<UserInfo>;
  showLoginButton = false;
  showLogoutButton = false;
  showTitlePage = false;
  scrolled!: Record<string, any>;
  titlePage = '';
  constructor(
    private authService: AuthService,
    private router: Router,
    private dataService: DataService
  ) {
    this.userAuth$ = this.authService.user$;
    this.userAuth$
      .pipe(
        tap({
          next: (userResult: User | null) => {
            this.loadUser(userResult?.uid);
          },
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  onScroll(event: any) {
    this.showTitlePage = event.isScrolled;
  }

  scrollToTop() {
    this.scrolled.target.scrollTop = 0;
  }

  ngOnInit(): void {
    this.getTitlePage(this.router.url);
    this.router.events
      .pipe(
        filter((event: any) => event instanceof NavigationEnd),
        tap({
          next: (event: any) => {
            this.getTitlePage(event.url);
          },
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  private loadUser(id?: string): void {
    if (id) {
      this.user$ = this.dataService
        .select('User')
        .getByKey(id)
        .pipe(
          map((userResult: EntityState<User>) => userResult.data),
          tap({next: (userResult: User) => this.loadDataByUser(userResult)})
        );
    }
  }

  private loadDataByUser(userResult: User) {
    this.loadGroups(userResult);
    this.loadProjects(userResult);
    this.loadCollaborators(userResult);
    this.loadInvoices(userResult);
  }

  private loadGroups(userResult: any) {
    if (!userResult) {
      return;
    }
    this.dataService.select('Group').getByKey(userResult.group);
  }

  private loadProjects(userResult: any): void {
    if (!userResult) {
      return;
    }
    const query = [
      {
        fieldPath: 'group',
        opStr: '==',
        value: userResult.group,
      },
    ];
    this.dataService.select('Project').getWithQuery(query as any);
    const query0 = [
      {
        fieldPath: 'group',
        opStr: '==',
        value: undefined,
      },
    ];
    this.dataService.select('Project').getWithQuery(query0 as any);
  }

  private loadCollaborators(userResult: any): void {
    if (!userResult) {
      return;
    }
    const query1 = [
      {
        fieldPath: 'group',
        opStr: '==',
        value: userResult.group,
      },
    ];
    this.dataService.select('User').getWithQuery(query1 as any);
  }
  private loadInvoices(userResult: any): void {
    if (!userResult) {
      return;
    }
    const query = [
      {
        fieldPath: 'group',
        opStr: '==',
        value: userResult.group,
      },
    ];
    this.dataService.select('Invoice').getWithQuery(query as any);
  }
  private getTitlePage(url: string) {
    const pathMatch = this.sideRoutes.filter((route: any) => url.includes(route.path))[0];
    if (pathMatch) {
      this.titlePage = pathMatch.text;
    }
  }
}

import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NavigationEnd, Router} from '@angular/router';
import {TranslocoService} from '@ngneat/transloco';
import {AuthService, User as UserAuth} from '@rng/data-access/auth';
import {DataService} from '@rng/data-access/base';
import {ConditionalQueryFirestore, EntityState} from '@rng/data-access/base/models/base.model';
import {Routes, UserInfo} from '@rng/ui/user-account-popup';
import {Observable, of, Subject} from 'rxjs';
import {filter, map, take, takeUntil, tap} from 'rxjs/operators';
import {Activity} from '../../models/activity.model';
import {Group} from '../../models/group.model';
import {Invoice} from '../../models/invoice.model';
import {Project} from '../../models/project.model';
import {User} from '../../models/user.model';

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
  sideRoutes$: Observable<Routes[]>;
  userRoutes = [
    {
      click: async () => {
        await this.authService.signOut();
      },
      text: 'Logout',
      icon: 'logout',
    },
  ];

  public hasSidenav = true;
  private destroy$: Subject<void> = new Subject();
  public userAuth$: Observable<UserAuth | null>;
  public user$!: Observable<UserInfo | null>;
  showLoginButton = false;
  showLogoutButton = false;
  showTitlePage = false;
  scrolled!: Record<string, unknown>;
  titlePage = '';
  constructor(
    private authService: AuthService,
    private router: Router,
    private dataService: DataService,
    private snackBar: MatSnackBar,
    private translocoService: TranslocoService
  ) {
    this.sideRoutes$ = of([]);
    this.userAuth$ = this.authService.user$;
    this.userAuth$
      .pipe(
        tap({
          next: (userResult: UserAuth | null) => {
            this.loadUser(userResult?.uid);
          },
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  private checkPermissions(user: User | null): User | null {
    if (user && user.role && user.type && user.type !== 'provider' && user.role === 'user') {
      void this.router.navigate(['sign-in']);
      this.snackBar.open('No tiene permisos para esta aplicación', '', {
        horizontalPosition: 'end',
        verticalPosition: 'top',
        duration: 3000,
      });
      return null;
    }
    return user;
  }

  onScroll(event: Record<string, unknown>) {
    this.showTitlePage = event.isScrolled as boolean;
  }

  scrollToTop() {
    (this.scrolled.target as HTMLElement).scrollTop = 0;
  }

  ngOnInit(): void {
    this.getTitlePage(this.router.url);
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        tap({
          next: (event) => {
            this.getTitlePage((event as NavigationEnd).url);
          },
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
    this.sideRoutes$ = this.translocoService.events$.pipe(map(() => this.getSideRoutes()));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  private getSideRoutes() {
    return [
      {
        path: '/dashboard/home',
        text: this.translocoService.translate('home'),
        icon: 'home',
      },
      {
        path: '/dashboard/projects',
        text: this.translocoService.translate('projects'),
        icon: 'work',
      },
      {
        path: '/dashboard/invoices',
        text: this.translocoService.translate('invoices'),
        icon: 'receipt_long',
      },
      {
        path: '/dashboard/management',
        text: this.translocoService.translate('management'),
        icon: 'admin_panel_settings',
      },
    ];
  }
  private loadUser(id?: string): void {
    if (id) {
      this.user$ = this.dataService
        .select('User')
        .getByKey(id)
        .pipe(
          map<unknown, User>((userResult) => (userResult as EntityState<User>).data),
          map<User | null, User | null>((userResult) => this.checkPermissions(userResult)),
          tap({next: (userResult) => this.loadDataByUser(userResult)})
        );
    }
  }

  private loadDataByUser(userResult: User | null) {
    if (!userResult) {
      return;
    }
    this.loadActivities(userResult);
    this.loadGroups(userResult);
    this.loadProjects(userResult);
    this.loadCollaborators(userResult);
    this.loadInvoices(userResult);
  }
  private loadActivities(userResult: User) {
    if (!userResult) {
      return;
    }
    this.dataService.select<Activity>('Activity').getAll();
  }
  private loadGroups(userResult: User) {
    if (!userResult) {
      return;
    }
    this.dataService.select<Group>('Group').getByKey(userResult.group);
  }

  private loadProjects(userResult: User): void {
    if (!userResult) {
      return;
    }
    const query: ConditionalQueryFirestore[] = [
      {
        fieldPath: 'group',
        opStr: '==',
        value: userResult.group,
      },
    ];
    this.dataService.select<Project>('Project').getWithQuery(query);
    const query0: ConditionalQueryFirestore[] = [
      {
        fieldPath: 'group',
        opStr: '==',
        value: undefined,
      },
    ];
    this.dataService.select<Project>('Project').getWithQuery(query0);
  }

  private loadCollaborators(userResult: User): void {
    if (!userResult) {
      return;
    }
    const query1: ConditionalQueryFirestore[] = [
      {
        fieldPath: 'group',
        opStr: '==',
        value: userResult.group,
      },
    ];
    this.dataService.select<Project>('User').getWithQuery(query1);
  }
  private loadInvoices(userResult: User): void {
    if (!userResult) {
      return;
    }
    const query: ConditionalQueryFirestore[] = [
      {
        fieldPath: 'group',
        opStr: '==',
        value: userResult.group,
      },
    ];
    this.dataService.select<Invoice>('Invoice').getWithQuery(query);
  }
  private getTitlePage(url: string) {
    this.sideRoutes$
      .pipe(
        map(
          (routes: Routes[]) => routes.filter((route) => route.path && url.includes(route.path))[0]
        ),
        filter((value: Routes) => Boolean(value && value.text)),
        tap({next: (value: Routes) => (this.titlePage = value.text as string)}),
        take(1)
      )
      .subscribe();
  }
}

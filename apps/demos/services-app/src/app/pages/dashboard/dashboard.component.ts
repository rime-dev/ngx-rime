import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {AuthService, User} from '@rng/data-access/auth';
import {Subject, Observable} from 'rxjs';
import {filter, takeUntil, tap} from 'rxjs/operators';

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
      path: '/dashboard/profile',
      text: 'Perfil',
      icon: 'person',
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
      path: '/dashboard/reports',
      text: 'Informes',
      icon: 'analytics',
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

  public hasSidenav = true;
  private destroy$: Subject<void> = new Subject();
  public user$: Observable<User | null>;
  showLoginButton = false;
  showLogoutButton = false;
  showTitlePage = false;
  scrolled!: Record<string, any>;
  titlePage = '';
  constructor(private authService: AuthService, private router: Router) {
    this.user$ = this.authService.user$;
  }
  onScroll(event: any) {
    this.showTitlePage = event.isScrolled;
  }
  scrollToTop() {
    this.scrolled.target.scrollTop = 0;
  }

  private getTitlePage(url: string) {
    const pathMatch = this.sideRoutes.filter((route: any) => url.includes(route.path))[0];
    if (pathMatch) {
      this.titlePage = pathMatch.text;
    }
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
}

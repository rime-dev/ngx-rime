import {Component, OnDestroy} from '@angular/core';
import {AuthService, User} from '@rng/data-access/auth';
import {Subject, Observable} from 'rxjs';

@Component({
  selector: 'rng-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnDestroy {
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
      path: '/dashboard/reports',
      text: 'Informes',
      icon: 'analytics',
    },
    {
      path: '/dashboard/team',
      text: 'Equipo',
      icon: 'group',
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

import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {RimeAuthService} from '../services/auth.service';

@Injectable({providedIn: 'root'})
export class RimeAuthGuard implements CanActivate {
  constructor(private router: Router, private rimeAuthService: RimeAuthService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.rimeAuthService.isLoggedIn) {
      void this.router.navigate(['sign-in'], {queryParams: {returnUrl: state.url}});
      return false;
    }
    if (!this.rimeAuthService.hasEmailVerified) {
      void this.router.navigate(['verify-email-address']);
      return false;
    }
    return true;
  }
}

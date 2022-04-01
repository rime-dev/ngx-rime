import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';

export interface RimeRoutes {
  path?: string;
  icon?: string;
  text?: string;
  click?: () => void;
}

export interface RimeUserInfo {
  displayName?: string;
  email?: string;
  photoURL?: string;
  uid?: string;
}

@Component({
  selector: 'rime-user-account-popup',
  templateUrl: './user-account-popup.component.html',
  styleUrls: ['./user-account-popup.component.scss'],
})
export class RimeUserAccountPopupComponent {
  /**
   * Defines the routes in the menu
   */
  @Input()
  set routes(value: RimeRoutes[]) {
    this._routes = value;
  }
  get routes(): RimeRoutes[] {
    return this._routes;
  }
  private _routes!: RimeRoutes[];
  /**
   * Defines the user information
   */
  @Input()
  set userInfo(value: RimeUserInfo | null) {
    this._userInfo = value;
  }
  get userInfo(): RimeUserInfo | null {
    return this._userInfo;
  }
  private _userInfo!: RimeUserInfo | null;
  constructor(private router: Router) {}
  handleClickEvent(event: (() => void) | undefined) {
    if (event) {
      event();
    }
  }
  handleRouterEvent(path: string | undefined) {
    if (!path) {
      return;
    }
    void this.router.navigate([path]);
  }
}

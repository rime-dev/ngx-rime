import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';

export interface Routes {
  path?: string;
  icon?: string;
  text?: string;
  click?: () => void;
}

export interface UserInfo {
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
export class UserAccountPopupComponent {
  /**
   * Defines the routes in the menu
   */
  @Input()
  set routes(value: Routes[]) {
    this._routes = value;
  }
  get routes(): Routes[] {
    return this._routes;
  }
  private _routes!: Routes[];
  /**
   * Defines the user information
   */
  @Input()
  set userInfo(value: UserInfo | null) {
    this._userInfo = value;
  }
  get userInfo(): UserInfo | null {
    return this._userInfo;
  }
  private _userInfo!: UserInfo | null;
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

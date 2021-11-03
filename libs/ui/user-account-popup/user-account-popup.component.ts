import {Component, Input} from '@angular/core';

export interface Routes {
  path?: string;
  icon?: string;
  text?: string;
  click?: unknown;
}

export interface UserInfo {
  username?: string;
  name?: string;
  lastname?: string;
  email?: string;
  avatar?: string;
}

@Component({
  selector: 'rng-user-account-popup',
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
  set userInfo(value: UserInfo) {
    console.log(value);

    this._userInfo = value;
  }
  get userInfo(): UserInfo {
    return this._userInfo;
  }
  private _userInfo!: UserInfo;
  constructor() {}
  handleClickEvent(event: any) {
    event();
  }
}

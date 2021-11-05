import {Component, HostListener, Input, ViewChild} from '@angular/core';
import {MatDrawerMode, MatSidenav} from '@angular/material/sidenav';

export interface ShellLogo {
  src: string;
  alt?: string;
}
export interface Routes {
  path: string;
  icon?: string;
  text?: string;
}
@Component({
  selector: 'rng-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent {
  public sidenavOpened = true;
  public sidenavMode: MatDrawerMode = 'side';

  /**
   * Sets an elevation
   */
  @Input()
  set elevation(value: boolean) {
    this._elevation = value;
  }
  get elevation(): boolean {
    return this._elevation;
  }
  private _elevation = true;

  /**
   * Defines the URL to render the main image
   */
  @Input()
  set logo(value: ShellLogo) {
    this._logo = value;
  }
  get logo(): ShellLogo {
    return this._logo;
  }
  private _logo!: ShellLogo;

  /**
   * Defines the routes in the top navigation bar
   */
  @Input()
  set topRoutes(value: Routes[]) {
    this._topRoutes = value;
  }
  get topRoutes(): Routes[] {
    return this._topRoutes;
  }
  private _topRoutes!: Routes[];
  /**
   * Defines the routes in the side navigation bar
   */
  @Input()
  set sideRoutes(value: Routes[]) {
    this._sideRoutes = value;
  }
  get sideRoutes(): Routes[] {
    return this._sideRoutes;
  }
  private _sideRoutes!: Routes[];

  @ViewChild('sidenav') sidenav!: MatSidenav;

  @HostListener('window:resize')
  onResize() {
    if (!(window.innerWidth < 768 ? true : false)) {
      this.sidenavMode = 'side';
      this.sidenavOpened = true;
    } else {
      this.sidenavMode = 'over';
      this.sidenavOpened = false;
    }
  }
  constructor() {}
}

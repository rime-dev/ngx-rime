import {Component, Input} from '@angular/core';

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

  constructor() {}
}

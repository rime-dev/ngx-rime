import {Component, Input} from '@angular/core';

export interface ShellLogo {
  src: string;
  alt?: string;
}
@Component({
  selector: 'rng-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent {
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

  constructor() {}
}

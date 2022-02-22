import {Component} from '@angular/core';

@Component({
  selector: 'rng-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss'],
})
export class ManagementComponent {
  public tabSelected = 0;

  changeTab(event: number): void {
    this.tabSelected = event;
  }
}

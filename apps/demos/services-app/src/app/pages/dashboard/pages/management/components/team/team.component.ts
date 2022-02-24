import {Component, Input} from '@angular/core';

@Component({
  selector: 'rng-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
})
export class TeamComponent {
  @Input() users: any[] = [];

  constructor() {}

  openTabForEmail(email: string): void {
    if (email) {
      window.open('mailto:' + email, '_blank');
    }
  }
  openTabForPhone(phone: string): void {
    if (phone) {
      window.open('tel:' + phone, '_blank');
    }
  }
}

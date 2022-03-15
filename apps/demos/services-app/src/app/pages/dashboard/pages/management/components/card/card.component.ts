import {Component, Input} from '@angular/core';

@Component({
  selector: 'rng-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() group: any = undefined;

  openTabForEmail(email: string): void {
    if (email) {
      window.open('mailto:' + email, '_blank');
    }
  }
  openTabForPhone(phone: string): void {
    if (phone) {
      window.open('tel:' + phone, '_self');
    }
  }
  openTabForMap(coordinates: number[]): void {
    if (coordinates) {
      coordinates = [...coordinates].reverse();
      window.open('https://www.google.com.sa/maps/search/' + coordinates.join(','), '_blank');
    }
  }
}

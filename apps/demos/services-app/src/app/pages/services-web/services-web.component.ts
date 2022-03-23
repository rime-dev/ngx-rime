import {Component} from '@angular/core';

@Component({
  selector: 'rng-services-web',
  templateUrl: './services-web.component.html',
  styleUrls: ['./services-web.component.scss'],
})
export class ServicesWebComponent {
  appName = 'E-Servicios';
  logo = {
    src: 'assets/rng-logo.png',
    alt: 'E-Servicios',
  };
  topRoutes = [];
}

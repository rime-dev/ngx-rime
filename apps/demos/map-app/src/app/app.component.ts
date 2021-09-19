import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'rng-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'map-app';

  public geojson = {
    type: 'Point',
    coordinates: [0, 0],
  };
  public center = [-0.336129, 39.4666941];

  constructor() {}

  ngOnInit(): void {
    this.getLocation();
  }
  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          if (position) {
            console.log(
              'Latitude: ' + position.coords.latitude + 'Longitude: ' + position.coords.longitude
            );
            this.geojson.coordinates = [position.coords.longitude, position.coords.latitude];
            this.center = [position.coords.longitude, position.coords.latitude];
          }
        },
        (error: GeolocationPositionError) => console.log(error)
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }
}

import {coerceArray} from '@angular/cdk/coercion';
import {AfterViewInit, Component, HostBinding, Input} from '@angular/core';
import TileLayer from 'ol/layer/Tile';
import Map from 'ol/Map';
import * as proj from 'ol/proj';
import OSM from 'ol/source/OSM';
import View from 'ol/View';

@Component({
  selector: 'rng-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit {
  private map: Map = {} as Map;

  @Input()
  set data(value) {
    this._data = value;
    this.updateMap();
  }
  get data() {
    return this._data;
  }
  private _data = {};

  @Input()
  set center(value) {
    this._center = coerceArray(value);
    this.changeCenter(value);
  }
  get center() {
    return this._center;
  }
  private _center = [0, 0];

  @HostBinding('attr.id') id = 'rng-map';

  constructor() {}

  public updateMap() {
    if (this.map && this.map instanceof Map) {
      this.map.updateSize();
    }
  }

  private changeCenter(center: number[]) {
    if (this.map && this.map instanceof Map) {
      this.map.getView().setCenter(center);
    }
  }

  ngAfterViewInit(): void {
    const map = new Map({
      target: this.id,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        projection: 'EPSG:4326',
        center: proj.fromLonLat(this.center),
        zoom: 4,
      }),
    });
    console.log(map);
    this.map = map;
  }
}

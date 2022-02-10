import {coerceArray} from '@angular/cdk/coercion';
import {AfterViewInit, Component, HostBinding, InjectionToken, Input} from '@angular/core';
import {Feature} from 'ol';
import Point from 'ol/geom/Point';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import Map from 'ol/Map';
import Stamen from 'ol/source/Stamen';
import VectorSource from 'ol/source/Vector';
import {Fill, Style} from 'ol/style';
import CircleStyle from 'ol/style/Circle';
import View from 'ol/View';

const MAP = new InjectionToken<MapComponent>('MapComponent');
const outerCircleFill = new Fill({
  color: 'rgba(55, 89, 132, 0.3)',
});
const innerCircleFill = new Fill({
  color: 'rgba(55, 89, 132, 0.7)',
});

const innerCircle = new CircleStyle({
  radius: 10,
  fill: innerCircleFill,
});
const outerCircle = new CircleStyle({
  radius: 15,
  fill: outerCircleFill,
});
const pointStyle = [
  new Style({
    image: outerCircle,
  }),
  new Style({
    image: innerCircle,
  }),
];
@Component({
  selector: 'rng-map',
  templateUrl: './map.component.html',
  providers: [{provide: MAP, useExisting: MapComponent}],
})
export class MapComponent implements AfterViewInit {
  private map!: Map;
  private vectorLayer!: VectorLayer<any>;
  @Input()
  set data(value) {
    this._data = value;
    this.addPoints(value);
  }
  get data() {
    return this._data;
  }
  private _data: any[] | null = [];

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
      this.map.render();
    }
  }

  private changeCenter(center: number[]) {
    if (this.map && this.map instanceof Map) {
      this.map.getView().setCenter(center);
    }
  }
  private addPoints(points: any) {
    console.log('addPoints', points);

    if (this.vectorLayer) {
      const features = points.map((point: number[]) => new Feature(new Point(point)));
      console.log('FEAUTRES', features);

      this.vectorLayer.getSource().clear();
      this.vectorLayer.getSource().addFeatures(features);
      this.vectorLayer.changed();
      this.updateMap();
      console.log('vectorLayer');
    } else {
      if (this.map) {
        const features = points.map((point: number[]) => new Feature(point));
        const vectorLayer = new VectorLayer({
          source: new VectorSource(features),
          style: pointStyle,
        });
        this.vectorLayer = vectorLayer;
        this.vectorLayer.changed();
        this.map.addLayer(this.vectorLayer);
        this.updateMap();
        console.log('NO vectorLayer WITH MAP');
      } else {
        console.log('NO map');
      }
    }
  }
  ngAfterViewInit(): void {
    const map = new Map({
      target: this.id,
      layers: [
        new TileLayer({
          source: new Stamen({
            layer: 'toner-lite', //'terrain',
          }),
        }),
      ],
      view: new View({
        projection: 'EPSG:4326',
        center: this.center,
        zoom: 4,
      }),
    });
    this.map = map;
    this.addPoints(this._data);
    setTimeout(() => {
      this.updateMap();
    }, 250);
  }
}

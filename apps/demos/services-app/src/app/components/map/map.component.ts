import {coerceArray} from '@angular/cdk/coercion';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  HostBinding,
  InjectionToken,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import 'ol/ol.css';
import {Feature} from 'ol';
import {createEmpty, extend, getWidth} from 'ol/extent';
import LineString from 'ol/geom/LineString';
import Point from 'ol/geom/Point';
import Polygon from 'ol/geom/Polygon';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import Map from 'ol/Map';
import Overlay from 'ol/Overlay';
import {fromLonLat} from 'ol/proj';
import Cluster from 'ol/source/Cluster';
import Stamen from 'ol/source/Stamen';
import VectorSource from 'ol/source/Vector';
import {Fill, Stroke, Style} from 'ol/style';
import CircleStyle from 'ol/style/Circle';
import Text from 'ol/style/Text';
import View from 'ol/View';

const MAP = new InjectionToken<MapComponent>('MapComponent');
const circleDistanceMultiplier = 1;
const circleFootSeparation = 28;
const circleStartAngle = Math.PI / 2;
const convexHullFill = new Fill({
  color: 'rgba(55, 89, 132, 0.3)',
});
const convexHullStroke = new Stroke({
  color: 'rgba(55, 89, 132, 1)',
  width: 1.5,
});

const outerCircleFill = new Fill({
  color: 'rgba(55, 89, 132, 0.3)',
});
const innerCircleFill = new Fill({
  color: 'rgba(55, 89, 132, 0.7)',
});

const textFill = new Fill({
  color: '#fff',
});
const textStroke = new Stroke({
  color: 'rgba(0, 0, 0, 0.6)',
  width: 3,
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

const cross = (a: number[], b: number[], o: number[]) =>
  (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);

/**
 * @param points An array of [X, Y] coordinates
 */
const convexHull = (points: any[]) => {
  points.sort((a: number[], b: number[]) => (a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]));

  const lower = [];
  // eslint-disable-next-line @typescript-eslint/prefer-for-of
  for (let i = 0; i < points.length; i++) {
    while (
      lower.length >= 2 &&
      cross(lower[lower.length - 2], lower[lower.length - 1], points[i]) <= 0
    ) {
      lower.pop();
    }
    lower.push(points[i]);
  }

  const upper = [];
  for (let i = points.length - 1; i >= 0; i--) {
    while (
      upper.length >= 2 &&
      cross(upper[upper.length - 2], upper[upper.length - 1], points[i]) <= 0
    ) {
      upper.pop();
    }
    upper.push(points[i]);
  }

  upper.pop();
  lower.pop();
  return lower.concat(upper);
};

@Component({
  selector: 'rng-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  providers: [{provide: MAP, useExisting: MapComponent}],
})
export class MapComponent implements AfterViewInit {
  public clickFeature!: Feature<any>;
  public clickResolution!: any;
  public hoverFeature!: Feature<any>;
  public overlay!: Overlay;
  /** Tooltip context for TemplateRef */
  public tooltipContext!: any;
  private map!: Map;
  private clusterHulls!: VectorLayer<any>;
  private clusters!: VectorLayer<any>;
  private clusterCircles!: VectorLayer<any>;

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

  @Input()
  set overlayClickTemplate(value) {
    this._overlayClickTemplate = value;
  }
  get overlayClickTemplate() {
    return this._overlayClickTemplate;
  }
  private _overlayClickTemplate!: TemplateRef<any>;

  @Output() featureSelected: EventEmitter<any> = new EventEmitter<any>();

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

  private addPoints(features: any) {
    const vectorSource = new VectorSource({features});
    const clusterSource = new Cluster({
      attributions: 'E-LARES',
      distance: 35,
      source: vectorSource,
    });
    if (this.clusterHulls && this.clusters && this.clusterCircles) {
      this.clusterHulls.getSource().clear();
      this.clusterHulls.setSource(clusterSource);
      this.clusterHulls.changed();
      this.clusters.getSource().clear();
      this.clusters.setSource(clusterSource);
      this.clusters.changed();
      this.clusterCircles.getSource().clear();
      this.clusterCircles.setSource(clusterSource);
      this.clusterCircles.changed();
      this.updateMap();
    } else {
      if (this.map) {
        // Layer displaying the convex hull of the hovered cluster.
        this.clusterHulls = new VectorLayer({
          source: clusterSource,
          style: this.clusterHullStyle as unknown as Style,
        });
        // Layer displaying the clusters and individual features.
        this.clusters = new VectorLayer({
          source: clusterSource,
          style: this.clusterStyle,
        });
        // Layer displaying the expanded view of overlapping cluster members.
        this.clusterCircles = new VectorLayer({
          source: clusterSource,
          style: this.clusterCircleStyle as unknown as Style,
        });
        this.clusterHulls.changed();
        this.clusters.changed();
        this.clusterCircles.changed();
        this.map.addLayer(this.clusterHulls);
        this.map.addLayer(this.clusters);
        this.map.addLayer(this.clusterCircles);
        this.updateMap();
      }
    }
  }

  ngAfterViewInit(): void {
    this.overlay = new Overlay({
      element: document.getElementById('overlayClick') as HTMLElement,
      autoPan: {
        animation: {
          duration: 250,
        },
      },
    });
    const baseLayer = new TileLayer({
      source: new Stamen({
        layer: 'toner-lite', //'terrain',
      }),
    });

    const map = new Map({
      target: this.id,
      layers: [baseLayer],
      overlays: [this.overlay],
      view: new View({
        projection: 'EPSG:3857',
        center: fromLonLat(this.center),
        zoom: 4,
      }),
    });
    this.map = map;
    this.addPoints(this._data);
    this.addMapOnClick();
    this.addMapOnHover();
    setTimeout(() => {
      this.updateMap();
    }, 250);
  }

  private addMapOnClick() {
    this.map.un('click', () => {});
    this.map.on('click', (event) => {
      this.overlay.setPosition(undefined);
      this.clusters.getFeatures(event.pixel).then((features: string | any[]) => {
        if (features.length > 0) {
          const clusterMembers = features[0].get('features');
          if (clusterMembers.length > 1) {
            // Calculate the extent of the cluster members.
            const extent = createEmpty();
            clusterMembers.forEach((feature: Feature<any>) =>
              extend(extent, feature.getGeometry().getExtent())
            );
            const view = this.map.getView();
            const resolution = this.map.getView().getResolution();
            if (
              view.getZoom() === view.getMaxZoom() ||
              (resolution && getWidth(extent) < resolution && getWidth(extent) < resolution)
            ) {
              // Show an expanded view of the cluster members.
              this.clickFeature = features[0];
              this.clickResolution = resolution;
              this.clusterCircles.setStyle(this.clusterCircleStyle as any);
            } else {
              // Zoom to the extent of the cluster members.
              view.fit(extent, {duration: 500, padding: [50, 50, 50, 50]});
            }
          } else {
            this.tooltipContext = {...(clusterMembers[0] as Feature<any>).getProperties()};
            const coordinate = event.coordinate;
            this.overlay.setPosition(coordinate);
            this.featureSelected.emit(clusterMembers[0]);
          }
        }
      });
    });
  }

  private addMapOnHover() {
    this.map.un('pointermove', () => {});
    this.map.on('pointermove', (event) => {
      this.clusters.getFeatures(event.pixel).then((features: Feature<any>[]) => {
        if (features[0] !== this.hoverFeature) {
          // Display the convex hull on hover.
          this.hoverFeature = features[0];
          this.clusterHulls.setStyle(this.clusterHullStyle as any);
          // Change the cursor style to indicate that the cluster is clickable.
          this.map.getTargetElement().style.cursor =
            this.hoverFeature && this.hoverFeature.get('features').length > 1 ? 'pointer' : '';
        }
      });
    });
  }

  /**
   * From
   * https://github.com/Leaflet/Leaflet.markercluster/blob/31360f2/src/MarkerCluster.Spiderfier.js#L55-L72
   * Arranges points in a circle around the cluster center, with a line pointing from the center to
   * each point.
   *
   * @param count Number of cluster members.
   * @param clusterCenter Center coordinate of the cluster.
   * @param resolution Current view resolution.
   * @return An array of coordinates representing the cluster members.
   */
  private generatePointsCircle(count: number, clusterCenter: number[], resolution: number) {
    const circumference = circleDistanceMultiplier * circleFootSeparation * (2 + count);
    let legLength = circumference / (Math.PI * 2); //radius from circumference
    const angleStep = (Math.PI * 2) / count;
    const res = [];
    let angle;
    legLength = Math.max(legLength, 35) * resolution; // Minimum distance to get outside the cluster icon.
    for (let i = 0; i < count; ++i) {
      // Clockwise, like spiral.
      angle = circleStartAngle + i * angleStep;
      res.push([
        clusterCenter[0] + legLength * Math.cos(angle),
        clusterCenter[1] + legLength * Math.sin(angle),
      ]);
    }
    return res;
  }

  /**
   * Single feature style, users for clusters with 1 feature and cluster circles.
   *
   * @param clusterMember A feature from a cluster.
   * @return An icon style for the cluster member's location.
   */
  private clusterMemberStyle(clusterMember: Feature<any>) {
    return new Style({
      geometry: clusterMember.getGeometry(),
      image: innerCircle,
    });
  }

  /**
   * Style for clusters with features that are too close to each other, activated on click.
   *
   * @param cluster A cluster with overlapping members.
   * @param resolution The current view resolution.
   * @return A style to render an expanded view of the cluster members.
   */
  private clusterCircleStyle = (
    cluster: Feature<any>,
    resolution: number
  ): any[] | undefined | any => {
    if (cluster !== this.clickFeature || resolution !== this.clickResolution) {
      return;
    }
    const clusterMembers = cluster.get('features');
    const centerCoordinates = cluster.getGeometry().getCoordinates();
    return this.generatePointsCircle(
      clusterMembers.length,
      cluster.getGeometry().getCoordinates(),
      resolution
    ).reduce((styles: any[], coordinates, i) => {
      const point = new Point(coordinates);
      const line = new LineString([centerCoordinates, coordinates]);
      styles.unshift(
        new Style({
          geometry: line,
          stroke: convexHullStroke,
        })
      );
      styles.push(
        this.clusterMemberStyle(
          new Feature({
            ...clusterMembers[i].getProperties(),
            geometry: point,
          })
        )
      );
      return styles;
    }, []);
  };

  /**
   * Style for convex hulls of clusters, activated on hover.
   *
   * @param cluster The cluster feature.
   * @return Polygon style for the convex hull of the cluster.
   */
  private clusterHullStyle = (cluster: Feature<any>) => {
    if (cluster !== this.hoverFeature) {
      return;
    }
    const originalFeatures = cluster.get('features');
    const points = originalFeatures.map((feature: Feature<any>) =>
      feature.getGeometry().getCoordinates()
    );
    return new Style({
      geometry: new Polygon([convexHull(points)]),
      fill: convexHullFill,
      stroke: convexHullStroke,
    });
  };

  private clusterStyle = (feature: any): any => {
    const size = feature.get('features').length;
    if (size > 1) {
      return [
        new Style({
          image: outerCircle,
        }),
        new Style({
          image: innerCircle,
          text: new Text({
            text: size.toString(),
            fill: textFill,
            stroke: textStroke,
          }) as Text,
        }),
      ];
    } else {
      const originalFeature = feature.get('features')[0];
      return this.clusterMemberStyle(originalFeature);
    }
  };
}

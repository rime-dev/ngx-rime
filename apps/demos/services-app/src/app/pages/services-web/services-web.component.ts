import {Component, OnInit} from '@angular/core';
import {DataService} from '@rng/data-access/base';
import {EntityState} from '@rng/data-access/base/models/base.model';
import {Observable} from 'rxjs';
import {Activity} from '../../models/activity.model';

@Component({
  selector: 'rng-services-web',
  templateUrl: './services-web.component.html',
  styleUrls: ['./services-web.component.scss'],
})
export class ServicesWebComponent implements OnInit {
  appName = 'E-LARES';
  logo = {
    src: 'assets/rng-logo.png',
    alt: 'E-LARES',
  };
  topRoutes = [];
  public activities$!: Observable<EntityState<Activity>[] | null>;
  constructor(private dataService: DataService) {}
  ngOnInit(): void {
    this.activities$ = this.dataService.select<Activity>('Activity').entities$;
    this.dataService.select<Activity>('Activity').getAll();
  }
}

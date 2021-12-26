import {Component} from '@angular/core';
import {DataService} from '@rng/data-access/base';
import {Observable} from 'rxjs';

@Component({
  selector: 'rng-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public tasks$: Observable<any>;

  constructor(private dataService: DataService) {
    this.dataService.select('Task').getAll();
    this.tasks$ = this.dataService.select('Task').entities$;
  }
}

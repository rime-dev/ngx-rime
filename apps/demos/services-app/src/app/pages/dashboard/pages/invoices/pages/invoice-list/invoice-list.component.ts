import {Component} from '@angular/core';
import {DataService} from '@rng/data-access/base';
import {Observable} from 'rxjs';

@Component({
  selector: 'rng-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss'],
})
export class InvoiceListComponent {
  public invoices$: Observable<any[]>;
  constructor(private dataService: DataService) {
    this.invoices$ = dataService.select('Invoice').entities$;
  }
}

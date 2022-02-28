import {Component, OnDestroy} from '@angular/core';
import {DataService} from '@rng/data-access/base';
import {EntityState} from '@rng/data-access/base/models/base.model';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {map, takeUntil, tap} from 'rxjs/operators';
import {Invoice} from '../../../../models/invoice.model';

@Component({
  selector: 'rng-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnDestroy {
  public earnings$: BehaviorSubject<number> = new BehaviorSubject(0);
  public percentageFromPreviousMonth$: BehaviorSubject<number> = new BehaviorSubject(0);
  public invoices$: Observable<EntityState<Invoice>[]>;

  private user$: Observable<any>;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private dataService: DataService) {
    this.user$ = dataService.select('User').entities$.pipe(
      map((users: any) => users[0]),
      takeUntil(this.destroy$)
    );
    this.user$.subscribe();

    this.invoices$ = dataService
      .select('Invoice')
      .entities$.pipe(
        tap({next: (invoices: any) => this.getEarningsFromInvoices(invoices)}),
        takeUntil(this.destroy$)
      );
    this.invoices$.subscribe();
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  private getEarningsFromInvoices(invoices: any[]) {
    const invoicesThisMonth = this.filterInvoicesInThisMonth(invoices);
    const invoicesPreviousMonth = this.filterInvoicesInPreviousMonth(invoices);
    const costThisMonth = invoicesThisMonth.map((invoice: any) => Number(invoice.data.cost));
    const costPreviousMonth = invoicesPreviousMonth.map((invoice: any) =>
      Number(invoice.data.cost)
    );
    const earningsThisMonth = costThisMonth.reduce((partialSum, a) => partialSum + a, 0);
    const earningsPreviousMonth = costPreviousMonth.reduce((partialSum, a) => partialSum + a, 0);
    const percentageFromPrevious =
      Number(
        (
          ((earningsThisMonth - earningsPreviousMonth) /
            (earningsThisMonth + earningsPreviousMonth)) *
          100
        ).toFixed()
      ) / 100;
    this.earnings$.next(earningsThisMonth);
    this.percentageFromPreviousMonth$.next(percentageFromPrevious);
  }
  private filterInvoicesInThisMonth(invoices: any[]) {
    const thisMonth = this.calculateThisMonth();
    const filtered = invoices.filter((invoice: any) => invoice.data.date.slice(0, 7) === thisMonth);
    return filtered;
  }
  private filterInvoicesInPreviousMonth(invoices: any[]) {
    const thisMonth = this.calculatePreviousMonth();
    const filtered = invoices.filter((invoice: any) => invoice.data.date.slice(0, 7) === thisMonth);
    return filtered;
  }
  private calculateThisMonth(): string {
    const year = new Date().getFullYear();
    const month0 = new Date().getMonth() + 1;
    const month = month0 < 10 ? '0' + month0 : month0;
    return `${year}-${month}`;
  }
  private calculatePreviousMonth(): string {
    const year = new Date().getFullYear();
    const month0 = new Date().getMonth();
    const month = month0 < 10 ? '0' + month0 : month0;
    return `${year}-${month}`;
  }
}

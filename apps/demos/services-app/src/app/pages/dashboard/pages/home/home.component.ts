import {Component, OnDestroy} from '@angular/core';
import {DataService} from '@rng/data-access/base';
import {EntityState} from '@rng/data-access/base/models/base.model';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {map, takeUntil, tap} from 'rxjs/operators';
import {Invoice} from '../../../../models/invoice.model';
import {User} from '../../../../models/user.model';

@Component({
  selector: 'rng-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnDestroy {
  public invoicesData$: BehaviorSubject<Record<string, string>[]> = new BehaviorSubject([{}]);
  public earnings$: BehaviorSubject<number> = new BehaviorSubject(0);
  public percentageFromPreviousMonth$: BehaviorSubject<number> = new BehaviorSubject(0);
  public invoices$: Observable<EntityState<Invoice>[]>;
  private user$: Observable<EntityState<User>>;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(dataService: DataService) {
    this.user$ = dataService.select<User>('User').entities$.pipe(
      map((users: EntityState<User>[]) => users[0]),
      takeUntil(this.destroy$)
    );
    this.user$.subscribe();

    this.invoices$ = dataService
      .select<Invoice>('Invoice')
      .entities$.pipe(
        tap({next: (invoices: EntityState<Invoice>[]) => this.getEarningsFromInvoices(invoices)}),
        takeUntil(this.destroy$)
      );
    this.invoices$.subscribe();
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  private getEarningsFromInvoices(invoices: EntityState<Invoice>[]) {
    invoices = invoices.sort(
      (a, b) => new Date(a.data.date).getTime() - new Date(b.data.date).getTime()
    );
    const invoiceData = invoices
      .filter((invoice: EntityState<Invoice>) =>
        invoice && invoice.data && invoice.data.cost && invoice.data.date ? true : false
      )
      .map((invoice: EntityState<Invoice>) => ({
        value: invoice.data.cost,
        date: invoice.data.date,
      }));
    this.invoicesData$.next(invoiceData);
    const invoicesThisMonth = this.filterInvoicesInThisMonth(invoices);
    const invoicesPreviousMonth = this.filterInvoicesInPreviousMonth(invoices);
    const costThisMonth = invoicesThisMonth.map((invoice) => Number(invoice.data.cost));
    const costPreviousMonth = invoicesPreviousMonth.map((invoice) => Number(invoice.data.cost));
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
  private filterInvoicesInThisMonth(invoices: EntityState<Invoice>[]) {
    const thisMonth = this.calculateThisMonth();
    const filtered = invoices.filter(
      (invoice) => invoice.data && invoice.data.date && invoice.data.date.slice(0, 7) === thisMonth
    );
    return filtered;
  }
  private filterInvoicesInPreviousMonth(invoices: EntityState<Invoice>[]) {
    const thisMonth = this.calculatePreviousMonth();
    const filtered = invoices.filter(
      (invoice) => invoice.data && invoice.data.date && invoice.data.date.slice(0, 7) === thisMonth
    );
    return filtered;
  }
  private calculateThisMonth(): string {
    const year = new Date().getFullYear();
    const month0 = new Date().getMonth() + 1;
    const month = month0 < 10 ? '0' + month0.toString() : month0;
    return `${year}-${month}`;
  }
  private calculatePreviousMonth(): string {
    const year = new Date().getFullYear();
    const month0 = new Date().getMonth();
    const month = month0 < 10 ? '0' + month0.toString() : month0;
    return `${year}-${month}`;
  }
}

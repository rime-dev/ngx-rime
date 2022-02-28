import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DataService} from '@rng/data-access/base';
import {EntityState} from '@rng/data-access/base/models/base.model';
import {Invoice} from 'apps/demos/services-app/src/app/models/invoice.model';
import {Observable, of, Subject} from 'rxjs';
import {map, takeUntil, tap} from 'rxjs/operators';

@Component({
  selector: 'rng-invoice-view',
  templateUrl: './invoice-view.component.html',
  styleUrls: ['./invoice-view.component.scss'],
})
export class InvoiceViewComponent implements OnInit, OnDestroy {
  public invoice$: Observable<EntityState<Invoice>> = of();
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      this.invoice$ = this.dataService
        .select('Invoice')
        .entities$.pipe(
          map(
            (invoices: EntityState<Invoice>[]) =>
              invoices.filter((invoice) => invoice.id === params.id)[0]
          )
        );
      this.dataService.select('Invoice').getByKey(params.id);
      this.invoice$
        .pipe(
          tap({
            next: (invoice: EntityState<Invoice>) => {
              if (!invoice) {
                this.router.navigate(['../../not-found'], {relativeTo: this.route});
              }
            },
          }),
          takeUntil(this.destroy$)
        )
        .subscribe();
    });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  viewDocument(document: any) {}
}

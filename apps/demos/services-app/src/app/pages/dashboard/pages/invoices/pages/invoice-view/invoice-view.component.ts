import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {DataService} from '@rng/data-access/base';
import {EntityState} from '@rng/data-access/base/models/base.model';
// eslint-disable-next-line max-len
import {RequestIfTrueDialogComponent} from 'apps/demos/services-app/src/app/components/request-if-true-dialog/request-if-true-dialog.component';
import {Invoice} from 'apps/demos/services-app/src/app/models/invoice.model';
import {Observable, of, Subject} from 'rxjs';
import {map, takeUntil, tap} from 'rxjs/operators';
import {IvoiceExistingDocumentDialogComponent} from './components/invoice-existing-document-dialog/invoice-existing-document-dialog.component';

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
    private dataService: DataService,
    private matDialog: MatDialog
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
  requestIfTrue(invoice: EntityState<Invoice>) {
    this.matDialog
      .open(RequestIfTrueDialogComponent, {
        minWidth: '33vw',
      })
      .afterClosed()
      .subscribe((request) => {
        if (request) {
          this.removeInvoice(invoice);
        }
      });
  }
  viewDocument(invoice: any) {
    if (invoice) {
      this.matDialog.open(IvoiceExistingDocumentDialogComponent, {
        data: invoice,
        width: '100vw',
        height: '100vh',
      });
    }
  }
  removeInvoice(invoice: EntityState<Invoice>) {
    if (invoice) {
      invoice = {...invoice};
      this.dataService.select('Invoice').delete(invoice);
      this.router.navigate(['../../invoice-list'], {relativeTo: this.route});
    }
  }
}

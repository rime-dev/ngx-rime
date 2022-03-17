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
import {InvoiceAddCostDialogComponent} from './components/invoice-add-cost-dialog/invoice-add-cost-dialog.component';
import {InvoiceAddDescriptionDialogComponent} from './components/invoice-add-description-dialog/invoice-add-description-dialog.component';
import {InvoiceAddTaxesDialogComponent} from './components/invoice-add-taxes-dialog/invoice-add-taxes-dialog.component';
import {InvoiceAddTitleDialogComponent} from './components/invoice-add-title-dialog/invoice-add-title-dialog.component';
// eslint-disable-next-line max-len
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
        .select<Invoice>('Invoice')
        .entities$.pipe(
          map(
            (invoices: EntityState<Invoice>[]) =>
              invoices.filter((invoice) => invoice.id === params.id)[0]
          )
        );
      this.dataService.select<Invoice>('Invoice').getByKey(params.id);
      this.invoice$
        .pipe(
          tap({
            next: (invoice: EntityState<Invoice>) => {
              if (!invoice) {
                void this.router.navigate(['../../not-found'], {relativeTo: this.route});
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
        data: {path: 'invoices', document: invoice.id, invoice},
        width: '100vw',
        height: '100vh',
      });
    }
  }
  changeTitle(invoice: any) {
    if (invoice) {
      this.matDialog
        .open(InvoiceAddTitleDialogComponent, {
          data: {invoice},
          minWidth: '33vw',
          minHeight: '33vh',
        })
        .afterClosed()
        .subscribe((data: any) => {
          if (data && data.title) {
            const data2 = {...invoice.data, title: data.title};
            const invoice2 = {...invoice, data: data2};
            this.dataService.select<Invoice>('Invoice').update(invoice2);
          }
        });
    }
  }
  changeDescription(invoice: any) {
    if (invoice) {
      this.matDialog
        .open(InvoiceAddDescriptionDialogComponent, {
          data: {invoice},
          minWidth: '33vw',
          minHeight: '33vh',
        })
        .afterClosed()
        .subscribe((data: any) => {
          if (data) {
            const data2 = {...invoice.data, description: data.description || ''};
            const invoice2 = {...invoice, data: data2};
            this.dataService.select<Invoice>('Invoice').update(invoice2);
          }
        });
    }
  }
  changeCost(invoice: any) {
    if (invoice) {
      this.matDialog
        .open(InvoiceAddCostDialogComponent, {
          data: {invoice},
          minWidth: '33vw',
          minHeight: '33vh',
        })
        .afterClosed()
        .subscribe((data: any) => {
          if (data) {
            const data2 = {...invoice.data, cost: data.cost};
            const invoice2 = {...invoice, data: data2};
            this.dataService.select<Invoice>('Invoice').update(invoice2);
          }
        });
    }
  }
  changeTaxes(invoice: any) {
    if (invoice) {
      this.matDialog
        .open(InvoiceAddTaxesDialogComponent, {
          data: {invoice},
          minWidth: '33vw',
          minHeight: '33vh',
        })
        .afterClosed()
        .subscribe((data: any) => {
          if (data) {
            const data2 = {...invoice.data, taxes: data.taxes};
            const invoice2 = {...invoice, data: data2};
            this.dataService.select<Invoice>('Invoice').update(invoice2);
          }
        });
    }
  }
  removeInvoice(invoice: EntityState<Invoice>) {
    if (invoice) {
      invoice = {...invoice};
      this.dataService.select<Invoice>('Invoice').delete(invoice.id);
      void this.router.navigate(['../../invoice-list'], {relativeTo: this.route});
    }
  }
}

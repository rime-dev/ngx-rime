import {Component, OnDestroy} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DataService} from '@rng/data-access/base';
import {Invoice} from 'apps/demos/services-app/src/app/models/invoice.model';
import {Observable, Subject} from 'rxjs';
import {InvoiceCreateDialogComponent} from './components/invoice-create-dialog/invoice-create-dialog.component';

@Component({
  selector: 'rng-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss'],
})
export class InvoiceListComponent implements OnDestroy {
  public invoices$: Observable<any[]>;
  public groups$: Observable<any[]>;

  private destroy$: Subject<void> = new Subject();

  constructor(private matDialog: MatDialog, private dataService: DataService) {
    this.invoices$ = dataService.select('Invoice').entities$;
    this.groups$ = this.dataService.select('Group').entities$;
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  addInvoice(group: string) {
    this.matDialog
      .open(InvoiceCreateDialogComponent, {
        data: {path: 'invoices', document: group},
        width: '100vw',
      })
      .afterClosed()
      .subscribe((invoice) => {
        this.addDocuments(group, invoice);
      });
  }

  private addDocuments(group: string, invoice: Partial<Invoice>) {
    if (invoice) {
      invoice = {...invoice, group, date: new Date().toISOString()};
      this.dataService.select('Invoice').add(invoice);
    }
  }
}

import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AuthService, User} from '@rng/data-access/auth';
import {DataService} from '@rng/data-access/base';
import {EntityState} from '@rng/data-access/base/models/base.model';
import {Group} from 'apps/demos/services-app/src/app/models/group.model';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {take, takeUntil, tap} from 'rxjs/operators';
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
        minWidth: 300,
      })
      .afterClosed()
      .subscribe((documentsURL) => {
        this.addDocuments(group, documentsURL);
      });
  }

  private addDocuments(group: string, documents: any[]) {
    if (documents && documents.length > 0) {
      const invoice = {
        title: documents[0].title,
        description: documents[0].description,
        cost: documents[0].cost,
        taxes: documents[0].taxes,
        url: documents[0].url,
        project: documents[0].project,
        group,
        date: new Date().toISOString(),
      };
      this.dataService.select('Invoice').add(invoice);
    }
  }
}

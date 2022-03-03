import {ComponentFixture, TestBed} from '@angular/core/testing';

import {IvoiceExistingDocumentDialogComponent} from './invoice-existing-document-dialog.component';

describe('IvoiceExistingDocumentDialogComponent', () => {
  let component: IvoiceExistingDocumentDialogComponent;
  let fixture: ComponentFixture<IvoiceExistingDocumentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IvoiceExistingDocumentDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IvoiceExistingDocumentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

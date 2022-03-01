import {ComponentFixture, TestBed} from '@angular/core/testing';

import {InvoiceCreateDialogComponent} from './invoice-create-dialog.component';

describe('InvoiceCreateDialogComponent', () => {
  let component: InvoiceCreateDialogComponent;
  let fixture: ComponentFixture<InvoiceCreateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InvoiceCreateDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

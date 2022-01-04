import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {InvoicesRoutingModule} from './invoices-routing.module';
import {InvoicesComponent} from './invoices.component';

@NgModule({
  declarations: [InvoicesComponent],
  imports: [CommonModule, InvoicesRoutingModule, MatButtonModule, MatCardModule, MatIconModule],
})
export class InvoicesModule {}

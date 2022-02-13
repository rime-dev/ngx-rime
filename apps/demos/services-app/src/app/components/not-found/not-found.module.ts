import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {RouterModule} from '@angular/router';
import {TranslocoModule} from '@ngneat/transloco';
import {NotFoundRoutingModule} from './not-found-routing.module';
import {NotFoundComponent} from './not-found.component';

@NgModule({
  declarations: [NotFoundComponent],
  exports: [NotFoundComponent],
  imports: [CommonModule, NotFoundRoutingModule, TranslocoModule, RouterModule, MatButtonModule],
})
export class NotFoundModule {}

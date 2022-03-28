import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {RouterModule} from '@angular/router';
import {TranslocoModule} from '@ngneat/transloco';
import {FooterComponent} from './footer.component';

@NgModule({
  declarations: [FooterComponent],
  exports: [FooterComponent],
  imports: [CommonModule, TranslocoModule, RouterModule, MatDividerModule, MatIconModule],
})
export class FooterModule {}

import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {TranslocoModule} from '@ngneat/transloco';
import {NoGroupRoutingModule} from './no-group-routing.module';
import {NoGroupComponent} from './no-group.component';

@NgModule({
  declarations: [NoGroupComponent],
  imports: [CommonModule, NoGroupRoutingModule, TranslocoModule],
})
export class NoGroupModule {}

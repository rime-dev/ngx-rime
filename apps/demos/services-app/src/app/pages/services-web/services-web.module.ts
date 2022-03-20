import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ServicesWebRoutingModule} from './services-web-routing.module';
import {ServicesWebComponent} from './services-web.component';

@NgModule({
  declarations: [ServicesWebComponent],
  imports: [CommonModule, ServicesWebRoutingModule],
})
export class ServicesWebModule {}

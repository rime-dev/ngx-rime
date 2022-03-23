import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {ShellModule} from '@rng/ui/shell';
import {ServicesWebRoutingModule} from './services-web-routing.module';
import {ServicesWebComponent} from './services-web.component';

@NgModule({
  declarations: [ServicesWebComponent],
  imports: [CommonModule, ServicesWebRoutingModule, ShellModule, MatButtonModule, MatIconModule],
})
export class ServicesWebModule {}

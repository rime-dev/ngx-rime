import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatRippleModule} from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {TranslocoModule} from '@ngneat/transloco';
import {ShellModule} from '@rng/ui/shell';
import {ServicesWebRoutingModule} from './services-web-routing.module';
import {ServicesWebComponent} from './services-web.component';

@NgModule({
  declarations: [ServicesWebComponent],
  imports: [
    CommonModule,
    ServicesWebRoutingModule,
    ShellModule,
    MatButtonModule,
    MatIconModule,
    MatRippleModule,
    MatCardModule,
    MatSelectModule,
    TranslocoModule,
  ],
})
export class ServicesWebModule {}

import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {ManagementRoutingModule} from './management-routing.module';
import {ManagementComponent} from './management.component';

@NgModule({
  declarations: [ManagementComponent],
  imports: [CommonModule, ManagementRoutingModule, MatButtonModule, MatCardModule, MatIconModule],
})
export class ManagementModule {}

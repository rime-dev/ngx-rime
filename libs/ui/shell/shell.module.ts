import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {ShellComponent} from './shell.component';

@NgModule({
  declarations: [ShellComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule, MatToolbarModule],
  exports: [ShellComponent],
})
export class ShellModule {}

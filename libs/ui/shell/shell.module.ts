import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {ShellComponent} from './shell.component';

@NgModule({
  declarations: [ShellComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule],
  exports: [ShellComponent],
})
export class ShellModule {}

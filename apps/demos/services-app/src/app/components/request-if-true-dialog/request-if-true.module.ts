import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {TranslocoModule} from '@ngneat/transloco';
import {RequestIfTrueDialogComponent} from './request-if-true-dialog.component';

@NgModule({
  declarations: [RequestIfTrueDialogComponent],
  exports: [RequestIfTrueDialogComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule, TranslocoModule, MatDialogModule],
})
export class RequestIfTrueModule {}

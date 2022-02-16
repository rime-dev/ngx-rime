import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {SafePipe} from '../../pipe/safe.pipe';
import {UploadTaskComponent} from '../upload-task/upload-task.component';

@NgModule({
  imports: [CommonModule, MatButtonModule, MatIconModule, MatProgressBarModule],
  declarations: [SafePipe, UploadTaskComponent],
  exports: [UploadTaskComponent],
})
export class UploadTaskModule {}

import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {UploadTaskComponent} from '../upload-task/upload-task.component';
import {SatinizeModule} from '@rng/util/satinize';
@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatListModule,
    SatinizeModule,
  ],
  declarations: [UploadTaskComponent],
  exports: [UploadTaskComponent],
})
export class UploadTaskModule {}

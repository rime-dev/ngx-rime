import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {SatinizeModule} from '@rng/util/satinize';
import {StorageUploadTaskComponent} from './storage-upload-task.component';
@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatListModule,
    SatinizeModule,
  ],
  declarations: [StorageUploadTaskComponent],
  exports: [StorageUploadTaskComponent],
})
export class StorageUploadTaskModule {}

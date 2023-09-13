import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {InjectionToken, ModuleWithProviders, NgModule} from '@angular/core';
import {StorageModule as FireStorageModule} from '@angular/fire/storage';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatProgressBarModule} from '@angular/material/progress-bar';

import {LangDefinition, Translation, TranslocoModule, TranslocoService} from '@ngneat/transloco';
import {RimeSatinizeModule} from '@ngx-rime/util/satinize';

import {RimeStorageUploadTaskComponent} from './components/storage-upload-task/storage-upload-task.component';
import {
  RimeStorageUploadTaskMockService,
  RimeStorageUploadTaskService,
} from './components/storage-upload-task/storage-upload-task.service';
import i18n from './components/storage-uploader/i18n/i18n';
import {RimeStorageUploaderComponent} from './components/storage-uploader/storage-uploader.component';
import {RimeDropzoneDirective} from './directives/dropzone.directive';

export const STORAGE_UPLOAD_TASK_BASE = new InjectionToken<RimeStorageUploadTaskBase>(
  'STORAGE_UPLOAD_TASK_BASE'
);

export interface RimeStorageUploadTaskBase {
  uploadDocument: (path: string, file: File) => void;
}
/**
 * Storage module to upload documents
 * Configure with `firebase`.
 */
@NgModule({
  imports: [
    CommonModule,
    TranslocoModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    HttpClientModule,
    FireStorageModule,
    MatListModule,
    RimeSatinizeModule,
  ],

  declarations: [
    RimeStorageUploaderComponent,
    RimeDropzoneDirective,
    RimeStorageUploadTaskComponent,
  ],
  exports: [RimeStorageUploaderComponent, RimeDropzoneDirective, RimeStorageUploadTaskComponent],
  providers: [RimeStorageUploadTaskService],
})
export class RimeStorageModule {
  constructor(translocoService: TranslocoService) {
    translocoService.getAvailableLangs().forEach((lang) => {
      const language: string = (lang as LangDefinition).id || (lang as string);
      const translation = (i18n as Record<string, Translation>)[language];
      translocoService.setTranslation(translation, 'rimeStorageUploader/' + language);
    });
  }
  static firebase(): ModuleWithProviders<RimeStorageModule> {
    return {
      ngModule: RimeStorageModule,
      providers: [],
    };
  }
}

/**
 * Storage mocked module to upload docs
 * Configure with fake `firebase`.
 */
@NgModule({
  imports: [RimeStorageModule],
  exports: [RimeStorageModule],
  providers: [{provide: RimeStorageUploadTaskService, useClass: RimeStorageUploadTaskMockService}],
})
export class RimeStorageMockModule {
  static firebase(): ModuleWithProviders<RimeStorageMockModule> {
    return {
      ngModule: RimeStorageMockModule,
      providers: [],
    };
  }
}

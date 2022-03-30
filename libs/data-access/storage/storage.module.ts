import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {InjectionToken, ModuleWithProviders, NgModule} from '@angular/core';
import {StorageModule as FireStorageModule} from '@angular/fire/storage';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {LangDefinition, Translation, TranslocoModule, TranslocoService} from '@ngneat/transloco';
import {SatinizeModule} from '@rng/util/satinize';
import {StorageUploadTaskComponent} from './components/storage-upload-task/storage-upload-task.component';
import {
  StorageUploadTaskMockService,
  StorageUploadTaskService,
} from './components/storage-upload-task/storage-upload-task.service';
import i18n from './components/storage-uploader/i18n/i18n';
import {StorageUploaderComponent} from './components/storage-uploader/storage-uploader.component';
import {DropzoneDirective} from './directives/dropzone.directive';

export const STORAGE_UPLOAD_TASK_BASE = new InjectionToken<StorageUploadTaskBase>(
  'STORAGE_UPLOAD_TASK_BASE'
);

export interface StorageUploadTaskBase {
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
    SatinizeModule,
  ],

  declarations: [StorageUploaderComponent, DropzoneDirective, StorageUploadTaskComponent],
  exports: [StorageUploaderComponent, DropzoneDirective, StorageUploadTaskComponent],
  providers: [StorageUploadTaskService],
})
export class StorageModule {
  constructor(translocoService: TranslocoService) {
    translocoService.getAvailableLangs().forEach((lang) => {
      const language: string = (lang as LangDefinition).id || (lang as string);
      const translation = (i18n as Record<string, Translation>)[language];
      translocoService.setTranslation(translation, 'rngStorageUploader/' + language);
    });
  }
  static firebase(): ModuleWithProviders<StorageModule> {
    return {
      ngModule: StorageModule,
      providers: [],
    };
  }
}

/**
 * Storage mocked module to upload docs
 * Configure with fake `firebase`.
 */
@NgModule({
  imports: [StorageModule],
  exports: [StorageModule],
  providers: [{provide: StorageUploadTaskService, useClass: StorageUploadTaskMockService}],
})
export class StorageMockModule {
  static firebase(): ModuleWithProviders<StorageMockModule> {
    return {
      ngModule: StorageMockModule,
      providers: [],
    };
  }
}

import {CommonModule} from '@angular/common';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {StorageModule as FireStorageModule} from '@angular/fire/storage';
import {LangDefinition, TranslocoModule, TranslocoService} from '@ngneat/transloco';
import {UploadTaskComponent} from './components/upload-task/upload-task.component';
import {UploaderComponent} from './components/uploader/uploader.component';
import {DropzoneDirective} from './directives/dropzone.directive';
import {StorageMockService} from './services/storage-mock.service';
import {StorageService} from './services/storage.service';
import i18n from './i18n/i18n';
/**
 * Storage module to upload documents
 * Configure with `firebase`.
 */
@NgModule({
  imports: [CommonModule, HttpClientModule, FireStorageModule, TranslocoModule],
  declarations: [UploaderComponent, UploadTaskComponent, DropzoneDirective],
  providers: [StorageService],
  exports: [UploaderComponent],
})
export class StorageModule {
  constructor(translocoService: TranslocoService) {
    translocoService.getAvailableLangs().forEach((lang) => {
      const language: string = (lang as LangDefinition).id || (lang as string);
      const translation = (i18n as any)[language];
      translocoService.setTranslation(translation, 'rngUploader/' + language);
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
  imports: [HttpClientModule, StorageModule],
  providers: [{provide: StorageService, useClass: StorageMockService}],
})
export class StorageMockModule {
  static firebase(): ModuleWithProviders<StorageMockModule> {
    return {
      ngModule: StorageMockModule,
      providers: [],
    };
  }
}

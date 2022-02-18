import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {StorageModule as FireStorageModule} from '@angular/fire/storage';
import {
  StorageUploadTask,
  StorageUploadTaskMock,
} from './components/storage-upload-task/storage-upload-task';
import {StorageUploaderModule} from './components/storage-uploader/storage-uploader.module';
/**
 * Storage module to upload documents
 * Configure with `firebase`.
 */
@NgModule({
  imports: [CommonModule, HttpClientModule, FireStorageModule, StorageUploaderModule],
  providers: [StorageUploadTask],
})
export class StorageModule {
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
  imports: [CommonModule, HttpClientModule, StorageUploaderModule],
  providers: [{provide: StorageUploadTask, useClass: StorageUploadTaskMock}],
})
export class StorageMockModule {
  static firebase(): ModuleWithProviders<StorageMockModule> {
    return {
      ngModule: StorageMockModule,
      providers: [],
    };
  }
}

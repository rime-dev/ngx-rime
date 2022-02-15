import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {StorageModule as FireStorageModule} from '@angular/fire/storage';
import {UploaderModule} from './components/uploader/uploader.module';
import {StorageMockService} from './services/storage-mock.service';
import {StorageService} from './services/storage.service';
/**
 * Storage module to upload documents
 * Configure with `firebase`.
 */
@NgModule({
  imports: [CommonModule, HttpClientModule, FireStorageModule, UploaderModule],
  providers: [StorageService],
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
  imports: [CommonModule, HttpClientModule, UploaderModule],
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

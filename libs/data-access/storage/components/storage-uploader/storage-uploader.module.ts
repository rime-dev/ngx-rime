import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {LangDefinition, TranslocoModule, TranslocoService} from '@ngneat/transloco';
import {DropzoneDirective} from '../../directives/dropzone.directive';
import {StorageUploadTaskModule} from '../storage-upload-task/storage-upload-task.module';
import i18n from './i18n/i18n';
import {StorageUploaderComponent} from './storage-uploader.component';

@NgModule({
  imports: [
    CommonModule,
    TranslocoModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    StorageUploadTaskModule,
  ],
  declarations: [StorageUploaderComponent, DropzoneDirective],
  exports: [StorageUploaderComponent, DropzoneDirective],
})
export class StorageUploaderModule {
  constructor(translocoService: TranslocoService) {
    translocoService.getAvailableLangs().forEach((lang) => {
      const language: string = (lang as LangDefinition).id || (lang as string);
      const translation = (i18n as any)[language];
      translocoService.setTranslation(translation, 'rngStorageUploader/' + language);
    });
  }
}

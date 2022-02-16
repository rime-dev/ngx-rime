import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {LangDefinition, TranslocoModule, TranslocoService} from '@ngneat/transloco';
import {DropzoneDirective} from '../../directives/dropzone.directive';
import {UploadTaskComponent} from '../upload-task/upload-task.component';
import i18n from './i18n/i18n';
import {UploaderComponent} from './uploader.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@NgModule({
  imports: [CommonModule, TranslocoModule, MatButtonModule, MatIconModule, MatProgressBarModule],
  declarations: [UploaderComponent, DropzoneDirective, UploadTaskComponent],
  exports: [UploaderComponent, DropzoneDirective],
})
export class UploaderModule {
  constructor(translocoService: TranslocoService) {
    translocoService.getAvailableLangs().forEach((lang) => {
      const language: string = (lang as LangDefinition).id || (lang as string);
      const translation = (i18n as any)[language];
      translocoService.setTranslation(translation, 'rngUploader/' + language);
    });
  }
}

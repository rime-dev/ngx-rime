import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {RouterModule} from '@angular/router';
import {LangDefinition, Translation, TranslocoModule, TranslocoService} from '@ngneat/transloco';
import {FooterComponent} from './footer.component';
import i18n from './i18n/i18n';

@NgModule({
  declarations: [FooterComponent],
  exports: [FooterComponent],
  imports: [CommonModule, TranslocoModule, RouterModule, MatDividerModule, MatIconModule],
})
export class FooterModule {
  constructor(translocoService: TranslocoService) {
    translocoService.getAvailableLangs().forEach((lang) => {
      const language: string = (lang as LangDefinition).id || (lang as string);
      const translation = (i18n as Record<string, Translation>)[language];
      translocoService.setTranslation(translation, 'footer/' + language);
    });
  }
}

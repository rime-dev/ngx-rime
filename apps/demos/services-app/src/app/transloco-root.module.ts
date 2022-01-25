import {HttpClient} from '@angular/common/http';
import {
  TRANSLOCO_LOADER,
  Translation,
  TranslocoLoader,
  TRANSLOCO_CONFIG,
  translocoConfig,
  TranslocoModule,
} from '@ngneat/transloco';
import {Injectable, NgModule} from '@angular/core';
import {environment} from '../environments/environment';

import {registerLocaleData} from '@angular/common';
import {DateFormatStyles, TranslocoLocaleModule} from '@ngneat/transloco-locale';
import localeEs from '@angular/common/locales/es';
import localeEn from '@angular/common/locales/en';

registerLocaleData(localeEs, 'es');
registerLocaleData(localeEn, 'en');

@Injectable({providedIn: 'root'})
export class TranslocoHttpLoader implements TranslocoLoader {
  constructor(private http: HttpClient) {}

  getTranslation(lang: string) {
    return this.http.get<Translation>(`/assets/i18n/${lang}.json`);
  }
}

const globalFormatConfig = {
  date: {
    dateStyle: 'long' as DateFormatStyles,
    timeStyle: 'long' as DateFormatStyles,
  },
};

const esESFormatConfig = {
  date: {
    timeStyle: 'medium' as DateFormatStyles,
  },
  currency: {
    minimumFractionDigits: 0,
  },
};

const localeConfig = {
  global: globalFormatConfig,
};

const langToLocaleMapping = {
  en: 'en-US',
  es: 'es-ES',
};

const defaultLocale = {
  es: 'es-ES',
};

const localeToCurrencyMapping = {
  'en-US': 'EUR',
  'es-EN': 'USD',
};

@NgModule({
  imports: [
    TranslocoLocaleModule.forRoot({
      defaultLocale: 'es',
      langToLocaleMapping: {
        en: 'en-US',
        es: 'es-ES',
      },
      defaultCurrency: 'EUR',
      localeToCurrencyMapping,
      localeConfig: {
        global: globalFormatConfig,
        localeBased: {
          'es-ES': esESFormatConfig,
        },
      },
    }),
  ],
  exports: [TranslocoModule],
  providers: [
    {
      provide: TRANSLOCO_CONFIG,
      useValue: translocoConfig({
        availableLangs: ['es', 'en'],
        defaultLang: 'es',
        reRenderOnLangChange: true,
        prodMode: environment.production,
      }),
    },
    {provide: TRANSLOCO_LOADER, useClass: TranslocoHttpLoader},
  ],
})
export class TranslocoRootModule {}

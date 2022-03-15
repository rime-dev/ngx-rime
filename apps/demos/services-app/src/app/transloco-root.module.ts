import {registerLocaleData} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import localeEn from '@angular/common/locales/en';
import localeEs from '@angular/common/locales/es';
import {Injectable, NgModule} from '@angular/core';
import {
  Translation,
  translocoConfig,
  TranslocoLoader,
  TranslocoModule,
  TRANSLOCO_CONFIG,
  TRANSLOCO_LOADER,
  TranslocoTestingModule,
  TranslocoTestingOptions,
  HashMap,
} from '@ngneat/transloco';

import {DateFormatStyles, TranslocoLocaleModule} from '@ngneat/transloco-locale';
import {environment} from '../environments/environment';
import en from '../assets/i18n/en.json';
import es from '../assets/i18n/es.json';

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
  },
};

const esESFormatConfig = {
  date: {
    dateStyle: 'medium' as DateFormatStyles,
  },
  currency: {
    minimumFractionDigits: 0 as number,
  },
};

const localeToCurrencyMapping = {
  'en-US': 'EUR',
  'es-EN': 'USD',
};

const translocoConfiguration = {
  availableLangs: ['es', 'en'],
  defaultLang: 'es',
  reRenderOnLangChange: true,
  fallbackLang: 'es',
  prodMode: environment.production,
};
const translocoLangs: HashMap<Translation> = {en: en as Translation, es: es as Translation};
@NgModule({
  imports: [
    TranslocoLocaleModule.forRoot({
      defaultLocale: 'es-ES',
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
      useValue: translocoConfig(translocoConfiguration),
    },
    {provide: TRANSLOCO_LOADER, useClass: TranslocoHttpLoader},
  ],
})
export class TranslocoRootModule {}

export function getTranslocoModule(options: TranslocoTestingOptions = {}) {
  return TranslocoTestingModule.forRoot({
    langs: translocoLangs,
    translocoConfig: translocoConfiguration,
    preloadLangs: true,
    ...options,
  });
}

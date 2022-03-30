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
  getBrowserLang,
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
const availableLangs = ['es', 'en'];
const availableLocales = ['es-ES', 'en-US'];
const defaultLang = 'es';

const defaultLangFactory = (availableLangsInput: string[], defaultLangInput: string) => {
  let activeLang = defaultLangInput;
  const browserLang = getBrowserLang();
  if (browserLang && availableLangsInput.includes(browserLang) && browserLang !== activeLang) {
    activeLang = browserLang;
  }
  return activeLang;
};
const defaultLocaleFactory = (availableLangsInput: string[], defaultLangInput: string) => {
  let activeLang = defaultLangInput;
  const browserLang = navigator.language;
  if (browserLang && availableLangsInput.includes(browserLang) && browserLang !== activeLang) {
    activeLang = browserLang;
  }
  return activeLang;
};
const defaultCurrencyFactory = (availableLangsInput: string[]) => {
  const userLang = navigator.language;
  if (availableLangsInput.includes(userLang) && userLang === 'en-US') {
    return 'USD';
  } else {
    return 'EUR';
  }
};
const translocoConfiguration = {
  availableLangs: availableLangs,
  defaultLang: defaultLangFactory(availableLangs, defaultLang),
  reRenderOnLangChange: true,
  fallbackLang: defaultLangFactory(availableLangs, defaultLang),
  prodMode: environment.production,
};
const translocoLangs: HashMap<Translation> = {en: en as Translation, es: es as Translation};

@NgModule({
  imports: [
    TranslocoLocaleModule.forRoot({
      defaultLocale: defaultLocaleFactory(availableLocales, defaultLang),
      langToLocaleMapping: {
        en: 'en-US',
        es: 'es-ES',
      },
      defaultCurrency: defaultCurrencyFactory(availableLocales),
      localeToCurrencyMapping,
      localeConfig: {
        global: globalFormatConfig,
        localeBased: {
          'es-ES': esESFormatConfig,
          'en-US': esESFormatConfig,
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

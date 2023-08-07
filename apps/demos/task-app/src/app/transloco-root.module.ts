import {registerLocaleData} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import localeEn from '@angular/common/locales/en';
import localeEs from '@angular/common/locales/es';
import {APP_INITIALIZER, Injectable, isDevMode, NgModule} from '@angular/core';
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
  TranslocoService,
  provideTranslocoTranspiler,
  FunctionalTranspiler,
  TRANSLOCO_MISSING_HANDLER,
  TranslocoConfig,
  TranslocoMissingHandler, provideTransloco,
} from '@ngneat/transloco';

import {environment} from '../environments/environment';
import en from '../assets/i18n/en.json';
import es from '../assets/i18n/es.json';
import {MAT_DATE_LOCALE} from '@angular/material/core';
import {DateFormatStyles, provideTranslocoLocale, TranslocoLocaleModule} from "@ngneat/transloco-locale";

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

const myAppInitialization = (translocoService: TranslocoService) => () =>
  translocoService.load(defaultLang).toPromise();
@Injectable({ providedIn: 'root' })

@NgModule({
  imports: [
    TranslocoLocaleModule,
  ],
  exports: [TranslocoModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: myAppInitialization,
      deps: [TranslocoService],
    },
    {provide: MAT_DATE_LOCALE, useValue: defaultLocaleFactory(availableLocales, defaultLang)},
    provideTransloco({
      config: translocoConfiguration,
      loader: TranslocoHttpLoader
    }),
    provideTranslocoLocale({
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

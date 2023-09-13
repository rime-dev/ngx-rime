import {HttpClientModule} from '@angular/common/http';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {AngularFireModule, FIREBASE_OPTIONS} from '@angular/fire/compat';
import {AngularFireAuthModule} from '@angular/fire/compat/auth';
import {AngularFirestoreModule, ENABLE_PERSISTENCE} from '@angular/fire/compat/firestore';

import {
  DefaultDataServiceFactory,
  EntityDataModule,
  ENTITY_METADATA_TOKEN,
  PLURAL_NAMES_TOKEN,
} from '@ngrx/data';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

import {ENTITY_CONFIG} from './constants/base.constant';
import {FirebaseConfig} from './models/base.model';
import {RimeDataService} from './services/data/data.service';
import {RimeDataTestingService} from './services/data/data.testing.service';
import {RimeFireDataMockServiceFactory} from './services/fire-data/fire-data.mock.service';
import {RimeFireDataServiceFactory} from './services/fire-data/fire-data.service';

const firebaseConfigFactory = (firebaseConfig: FirebaseConfig) => {
  const firebaseOptions = firebaseConfig.options;
  const firebaseEntityConfig = firebaseConfig.entityConfig;
  return [
    {
      provide: FIREBASE_OPTIONS,
      useValue: firebaseOptions,
    },
    {provide: ENABLE_PERSISTENCE, useValue: firebaseEntityConfig.enablePersistence},
    {
      provide: ENTITY_CONFIG,
      useValue: firebaseEntityConfig,
    },
    {
      provide: ENTITY_METADATA_TOKEN,
      multi: true,
      useValue: firebaseEntityConfig.entityMetadata ? firebaseEntityConfig.entityMetadata : [],
    },
    {
      provide: PLURAL_NAMES_TOKEN,
      multi: true,
      useValue: firebaseEntityConfig.pluralNames ? firebaseEntityConfig.pluralNames : {},
    },
  ];
};

/**
 * entity-data main module includes Firebase data services
 * Configure with `firebase`.
 */
@NgModule({
  imports: [
    HttpClientModule,
    AngularFireModule.initializeApp({}),
    AngularFirestoreModule.enablePersistence(),
    StoreModule.forRoot({}),
    EffectsModule.forRoot(),
    EntityDataModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
    AngularFireAuthModule,
    AngularFirestoreModule,
  ],
  providers: [{provide: DefaultDataServiceFactory, useClass: RimeFireDataServiceFactory}],
})
export class RimeBaseModule {
  static firebase(firebaseConfig: FirebaseConfig): ModuleWithProviders<RimeBaseModule> {
    return {
      ngModule: RimeBaseModule,
      providers: firebaseConfigFactory(firebaseConfig),
    };
  }
}

/**
 * entity-data main module includes Firebase data services mocked
 * Configure with fake `firebase`.
 */
@NgModule({
  imports: [
    HttpClientModule,
    AngularFireModule.initializeApp({}),
    AngularFirestoreModule.enablePersistence(),
    StoreModule.forRoot({}),
    EffectsModule.forRoot(),
    EntityDataModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
    AngularFireAuthModule,
    AngularFirestoreModule,
  ],
  providers: [{provide: DefaultDataServiceFactory, useClass: RimeFireDataMockServiceFactory}],
})
export class RimeBaseMockModule {
  static firebase(firebaseConfig: FirebaseConfig): ModuleWithProviders<RimeBaseMockModule> {
    return {
      ngModule: RimeBaseMockModule,
      providers: firebaseConfigFactory(firebaseConfig),
    };
  }
}

/**
 * entity-data main module includes Firebase data services mocked
 * Configure with fake `firebase`.
 */
@NgModule({
  imports: [
    HttpClientModule,
    AngularFireModule.initializeApp({}),
    AngularFirestoreModule.enablePersistence(),
    StoreModule.forRoot({}),
    EffectsModule.forRoot(),
    EntityDataModule.forRoot({}),
  ],
  providers: [{provide: RimeDataService, useClass: RimeDataTestingService}],
})
export class RimeBaseTestingModule {
  static firebase(firebaseConfig: FirebaseConfig): ModuleWithProviders<RimeBaseTestingModule> {
    return {
      ngModule: RimeBaseTestingModule,
      providers: firebaseConfigFactory(firebaseConfig),
    };
  }
}

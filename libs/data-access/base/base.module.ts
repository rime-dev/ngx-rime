import {HttpClientModule} from '@angular/common/http';
import {InjectionToken, ModuleWithProviders, NgModule} from '@angular/core';
import {FirebaseOptions} from '@angular/fire/app';
import {AngularFireModule, FIREBASE_OPTIONS} from '@angular/fire/compat';
import {AngularFireAuthModule} from '@angular/fire/compat/auth';
import {AngularFirestoreModule} from '@angular/fire/compat/firestore';
import {
  DefaultDataServiceFactory,
  EntityDataModule,
  EntityMetadataMap,
  ENTITY_METADATA_TOKEN,
  PLURAL_NAMES_TOKEN,
} from '@ngrx/data';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {FireDataServiceFactory} from './services/fire-data.service';

export const ENTITY_NAME = new InjectionToken<string>('entityName');

export interface StateEntityConfig {
  entityMetadata: EntityMetadataMap;
  pluralNames: any;
}
export interface FirebaseConfig {
  options: FirebaseOptions;
  entityConfig: StateEntityConfig;
}

export const ENTITY_CONFIG = new InjectionToken<StateEntityConfig>('entityConfig');

@NgModule({
  imports: [
    HttpClientModule,
    AngularFireModule.initializeApp({}),
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
  providers: [{provide: DefaultDataServiceFactory, useClass: FireDataServiceFactory}],
})
export class BaseModule {
  static firebase(firebaseConfig: FirebaseConfig): ModuleWithProviders<BaseModule> {
    const firebaseOptions = firebaseConfig.options;
    const firebaseEntityConfig = firebaseConfig.entityConfig;
    return {
      ngModule: BaseModule,
      providers: [
        {
          provide: FIREBASE_OPTIONS,
          useValue: firebaseOptions,
        },
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
        // ScreenTrackingService,
        // UserTrackingService,
        // AngularFireModule.initializeApp(firebaseOptions)
        // AngularFireDatabaseModule,
        // AngularFireAnalyticsModule,
        // AngularFireMessagingModule,
        // AngularFireAuthModule,
      ],
    };
  }
}

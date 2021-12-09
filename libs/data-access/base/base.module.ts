import {HttpClientModule} from '@angular/common/http';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {FirebaseOptions} from '@angular/fire/app';
import {AngularFireModule, FIREBASE_OPTIONS} from '@angular/fire/compat';
import {AngularFireAuthModule} from '@angular/fire/compat/auth';
import {AngularFirestoreModule} from '@angular/fire/compat/firestore';
import {
  DefaultDataServiceConfig,
  DefaultDataServiceFactory,
  EntityDataModule,
  EntityMetadataMap,
} from '@ngrx/data';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {ENTITY_NAME, FireDataServiceFactory} from './services/fire-data.service';
import {UserService} from './services/user.service';
interface FirebaseConfig {
  options: FirebaseOptions;
}

const entityMetadata: EntityMetadataMap = {
  State: {},
  House: {},
  Client: {},
  tasks: {},
};
const pluralNames = {
  State: 'States',
  House: 'Houses',
  Client: 'Clients',
  tasks: 'taskss',
};
export class State {}
export const entityConfig = {
  entityMetadata,
  pluralNames,
};
const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: '',
  timeout: 0, // request timeout
};

@NgModule({
  imports: [
    HttpClientModule,
    AngularFireModule.initializeApp({}),
    StoreModule.forRoot({}),
    EffectsModule.forRoot(),
    EntityDataModule.forRoot(entityConfig),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      // logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
    AngularFireAuthModule,
    AngularFirestoreModule,
  ],
  providers: [
    UserService,
    {provide: DefaultDataServiceConfig, useValue: defaultDataServiceConfig},
    {provide: DefaultDataServiceFactory, useClass: FireDataServiceFactory},
  ],
})
export class BaseModule {
  static firebase(firebaseConfig: FirebaseConfig): ModuleWithProviders<BaseModule> {
    const firebaseOptions = firebaseConfig.options;
    return {
      ngModule: BaseModule,
      providers: [
        {
          provide: FIREBASE_OPTIONS,
          useValue: firebaseOptions,
        },
        {
          provide: ENTITY_NAME,
          useValue: 'store',
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

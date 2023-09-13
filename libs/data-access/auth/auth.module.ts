import {CommonModule} from '@angular/common';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {AngularFireAuthModule} from '@angular/fire/compat/auth';
import {AngularFirestoreModule} from '@angular/fire/compat/firestore';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {Router, RouterModule, Routes} from '@angular/router';

import {LangDefinition, Translation, TranslocoModule, TranslocoService} from '@ngneat/transloco';

import {RimeForgotPasswordComponent} from './components/forgot-password/forgot-password.component';
import {RimeSignInComponent} from './components/sign-in/sing-in.component';
import {RimeSignUpComponent} from './components/sign-up/sing-up.component';
import {RimeVerifyEmailComponent} from './components/verify-email/verify-email.component';
import i18n from './i18n/i18n';
import {RIME_AUTH_CONFIG} from './models/auth.token';
import {RimeAuthTestingService} from './services/auth.mock.service';
import {RimeAuthService} from './services/auth.service';

const routes: Routes = [
  {path: 'sign-in', component: RimeSignInComponent},
  {path: 'register-user', component: RimeSignUpComponent},
  {path: 'forgot-password', component: RimeForgotPasswordComponent},
  {path: 'verify-email-address', component: RimeVerifyEmailComponent},
];
const routes2: Routes = [
  {path: 'sign-in', component: RimeSignInComponent},
  {path: 'forgot-password', component: RimeForgotPasswordComponent},
  {path: 'verify-email-address', component: RimeVerifyEmailComponent},
];
export function initAuthRouter(router: Router, authConfig: RimeAuthConfig) {
  if (authConfig.disableRegister) {
    router.config.unshift(...routes2);
  } else {
    router.config.unshift(...routes);
  }
  return () => Promise.resolve();
}

@NgModule({
  declarations: [
    RimeSignInComponent,
    RimeSignUpComponent,
    RimeForgotPasswordComponent,
    RimeVerifyEmailComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    TranslocoModule,
    MatCardModule,
    RouterModule,
  ],
  exports: [
    RimeSignInComponent,
    RimeSignUpComponent,
    RimeForgotPasswordComponent,
    RimeVerifyEmailComponent,
  ],
})
export class RimeAuthComponentsModule {
  constructor(translocoService: TranslocoService) {
    translocoService.getAvailableLangs().forEach((lang) => {
      const language: string = (lang as LangDefinition).id || (lang as string);
      const translation = (i18n as Record<string, Translation>)[language];
      translocoService.setTranslation(translation, 'rimeAuth/' + language);
    });
  }
}

export interface RimeAuthConfig {
  disableRegister?: boolean;
}

@NgModule({
  imports: [CommonModule, RimeAuthComponentsModule, AngularFireAuthModule, AngularFirestoreModule],
  providers: [
    RimeAuthService,
    {
      provide: APP_INITIALIZER,
      useFactory: initAuthRouter,
      deps: [Router, RIME_AUTH_CONFIG],
      multi: true,
    },
  ],
})
export class RimeAuthModule {}

@NgModule({
  imports: [CommonModule, RimeAuthComponentsModule],
  providers: [
    {
      provide: RimeAuthService,
      useClass: RimeAuthTestingService,
    },
  ],
})
export class RimeAuthTestingModule {}

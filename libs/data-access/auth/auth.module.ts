import {CommonModule} from '@angular/common';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {AngularFireAuthModule} from '@angular/fire/compat/auth';
import {AngularFirestoreModule} from '@angular/fire/compat/firestore';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {Router, RouterModule, Routes} from '@angular/router';
import {LangDefinition, Translation, TranslocoModule, TranslocoService} from '@ngneat/transloco';
import {ForgotPasswordComponent} from './components/forgot-password/forgot-password.component';
import {SignInComponent} from './components/sign-in/sing-in.component';
import {SignUpComponent} from './components/sign-up/sing-up.component';
import {VerifyEmailComponent} from './components/verify-email/verify-email.component';
import i18n from './i18n/i18n';
import {AuthTestingService} from './services/auth.mock.service';
import {AuthService} from './services/auth.service';
const routes: Routes = [
  {path: 'sign-in', component: SignInComponent},
  {path: 'register-user', component: SignUpComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'verify-email-address', component: VerifyEmailComponent},
];
// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function initAuthRouter(router: Router) {
  router.config.unshift(...routes);
  return () => Promise.resolve();
}

@NgModule({
  declarations: [SignInComponent, SignUpComponent, ForgotPasswordComponent, VerifyEmailComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    RouterModule,
    TranslocoModule,
    MatCardModule,
  ],
  exports: [SignInComponent, SignUpComponent, ForgotPasswordComponent, VerifyEmailComponent],
})
export class AuthComponentsModule {
  constructor(translocoService: TranslocoService) {
    translocoService.getAvailableLangs().forEach((lang) => {
      const language: string = (lang as LangDefinition).id || (lang as string);
      const translation = (i18n as Record<string, Translation>)[language];
      translocoService.setTranslation(translation, 'rngAuth/' + language);
    });
  }
}

@NgModule({
  imports: [CommonModule, AuthComponentsModule, AngularFireAuthModule, AngularFirestoreModule],
  providers: [
    AuthService,
    {
      provide: APP_INITIALIZER,
      useFactory: initAuthRouter,
      deps: [Router],
      multi: true,
    },
  ],
})
export class AuthModule {}

@NgModule({
  imports: [CommonModule, AuthComponentsModule],
  providers: [
    {
      provide: AuthService,
      useClass: AuthTestingService,
    },
  ],
})
export class AuthTestingModule {}

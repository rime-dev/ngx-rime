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
import {Router, Routes} from '@angular/router';
import {ForgotPasswordComponent} from './components/forgot-password/forgot-password.component';
import {SignInComponent} from './components/sign-in/sing-in.component';
import {SignUpComponent} from './components/sign-up/sing-up.component';
import {VerifyEmailComponent} from './components/verify-email/verify-email.component';
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
    AngularFireAuthModule,
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
  ],
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
  ],
  providers: [
    {
      provide: AuthService,
      useClass: AuthTestingService,
    },
  ],
})
export class AuthTestingModule {}

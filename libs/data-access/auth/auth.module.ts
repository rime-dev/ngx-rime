import {NgModule} from '@angular/core';
import {AngularFireAuthModule} from '@angular/fire/compat/auth';
import {AngularFirestoreModule} from '@angular/fire/compat/firestore';
import {AuthService} from './services/auth.service';
import {Routes, RouterModule} from '@angular/router';
import {signInComponent} from './components/sign-in/sing-in.component';
const routes: Routes = [
  {path: 'sign-in', component: signInComponent},
  {path: 'register-user', component: 'SignUpComponent' as unknown as undefined},
  {path: 'forgot-password', component: 'ForgotPasswordComponent' as unknown as undefined},
  {path: 'verify-email-address', component: 'VerifyEmailComponent' as unknown as undefined},
];
@NgModule({
  declarations: [signInComponent],
  imports: [AngularFireAuthModule, AngularFirestoreModule, RouterModule.forRoot(routes)],
  providers: [AuthService],
})
export class AuthModule {}

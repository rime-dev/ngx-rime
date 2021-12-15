import {NgModule} from '@angular/core';
import {AngularFireAuthModule} from '@angular/fire/compat/auth';
import {AngularFirestoreModule} from '@angular/fire/compat/firestore';
import {AuthService} from './services/auth.service';
import {Routes, RouterModule} from '@angular/router';
import {signInComponent} from './components/sign-in/sing-in.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
const routes: Routes = [
  {path: 'sign-in', component: signInComponent},
  {path: 'register-user', component: 'SignUpComponent' as unknown as undefined},
  {path: 'forgot-password', component: 'ForgotPasswordComponent' as unknown as undefined},
  {path: 'verify-email-address', component: 'VerifyEmailComponent' as unknown as undefined},
];
@NgModule({
  declarations: [signInComponent],
  imports: [
    AngularFireAuthModule,
    AngularFirestoreModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
  ],
  providers: [AuthService],
})
export class AuthModule {}

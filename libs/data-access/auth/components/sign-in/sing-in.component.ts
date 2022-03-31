import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'rime-sign-in',
  templateUrl: './sign-in.component.html',
})
export class SignInComponent {
  form: FormGroup;
  hide: boolean;
  constructor(private authService: AuthService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    this.hide = true;
  }
  submit(): void {
    if (this.form.invalid) {
      return;
    }
    const email = this.form.controls.email.value as string;
    const password = this.form.controls.password.value as string;
    void this.authService.signIn(email, password);
  }

  loginWithGoogle(): void {
    void this.authService.googleAuth();
  }
}

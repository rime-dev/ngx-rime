import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'rng-sign-in',
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
    this.authService.signIn(this.form.controls.email.value, this.form.controls.password.value);
  }

  loginWithGoogle(): void {
    this.authService.googleAuth();
  }
}

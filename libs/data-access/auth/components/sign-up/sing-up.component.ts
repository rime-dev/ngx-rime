import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'rime-sign-up',
  templateUrl: './sign-up.component.html',
})
export class SignUpComponent {
  form: FormGroup;
  constructor(private authService: AuthService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  submit(): void {
    if (this.form.invalid) {
      return;
    }
    this.authService.signUp(this.form.controls.email.value, this.form.controls.password.value);
  }

  googleAuth(): void {
    this.authService.googleAuth();
  }
}

import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RimeAuthService} from '../../services/auth.service';

@Component({
  selector: 'rime-sign-up',
  templateUrl: './sign-up.component.html',
})
export class RimeSignUpComponent {
  form: FormGroup;
  constructor(private rimeAuthService: RimeAuthService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  submit(): void {
    if (this.form.invalid) {
      return;
    }
    this.rimeAuthService.signUp(this.form.controls.email.value, this.form.controls.password.value);
  }

  googleAuth(): void {
    this.rimeAuthService.googleAuth();
  }
}

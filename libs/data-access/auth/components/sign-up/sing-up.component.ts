import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RimeAuthConfig} from '../../auth.module';
import {RimeAuthService} from '../../services/auth.service';
import {RIME_AUTH_CONFIG} from '../../models/auth.token';

@Component({
  selector: 'rime-sign-up',
  styles: ['::ng-deep { .mdc-notched-outline__notch { border-right: none; }}'],
  templateUrl: './sign-up.component.html',
})
export class RimeSignUpComponent {
  form: FormGroup;
  constructor(
    @Inject(RIME_AUTH_CONFIG) public rimeAuthConfig: RimeAuthConfig,
    private rimeAuthService: RimeAuthService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  submit(): void {
    if (this.form.invalid || this.rimeAuthConfig.disableRegister) {
      return;
    }
    const user = String(this.form.controls.email.value);
    const password = String(this.form.controls.password.value);
    void this.rimeAuthService.signUp(user, password);
  }

  googleAuth(): void {
    void this.rimeAuthService.googleAuth();
  }
}

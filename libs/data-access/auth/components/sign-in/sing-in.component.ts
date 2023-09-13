/* eslint-disable @typescript-eslint/unbound-method */

import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {RimeAuthConfig} from '../../auth.module';
import {RIME_AUTH_CONFIG} from '../../models/auth.token';
import {RimeAuthService} from '../../services/auth.service';

@Component({
  selector: 'rime-sign-in',
  styles: ['::ng-deep { .mdc-notched-outline__notch { border-right: none; }}'],
  templateUrl: './sign-in.component.html',
})
export class RimeSignInComponent {
  form: FormGroup;
  hide: boolean;
  constructor(
    @Inject(RIME_AUTH_CONFIG) public rimeAuthConfig: RimeAuthConfig,
    private rimeAuthService: RimeAuthService,
    private formBuilder: FormBuilder
  ) {
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
    void this.rimeAuthService.signIn(email, password);
  }

  loginWithGoogle(): void {
    void this.rimeAuthService.googleAuth();
  }
}

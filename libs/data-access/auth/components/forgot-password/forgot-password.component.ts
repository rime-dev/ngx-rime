/* eslint-disable @typescript-eslint/unbound-method */

import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {RimeAuthService} from '../../services/auth.service';

@Component({
  selector: 'rime-forgot-password',
  styles: ['::ng-deep { .mdc-notched-outline__notch { border-right: none; }}'],
  templateUrl: './forgot-password.component.html',
})
export class RimeForgotPasswordComponent {
  form: FormGroup;

  constructor(private rimeAuthService: RimeAuthService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  submit(): void {
    if (this.form.invalid) {
      return;
    }
    void this.rimeAuthService.forgotPassword(this.form.controls.email.value);
  }
}

import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../../models/auth.model';
import {RimeAuthService} from '../../services/auth.service';

@Component({
  selector: 'rime-verify-email',
  templateUrl: './verify-email.component.html',
})
export class RimeVerifyEmailComponent {
  public user$: Observable<User | null>;
  constructor(private rimeAuthService: RimeAuthService) {
    this.user$ = this.rimeAuthService.user$;
  }

  sendVerificationMail() {
    this.rimeAuthService.sendVerificationMail();
  }
}

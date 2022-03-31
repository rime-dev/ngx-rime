import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../../models/auth.model';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'ngx-rime-verify-email',
  templateUrl: './verify-email.component.html',
})
export class VerifyEmailComponent {
  public user$: Observable<User | null>;
  constructor(private authService: AuthService) {
    this.user$ = this.authService.user$;
  }

  sendVerificationMail() {
    this.authService.sendVerificationMail();
  }
}

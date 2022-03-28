import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {RouterModule} from '@angular/router';
import {TranslocoModule} from '@ngneat/transloco';
import {ShellModule} from '@rng/ui/shell';
import {UserAccountPopupModule} from '@rng/ui/user-account-popup';
import {ServicesWebRoutingModule} from './services-web-routing.module';
import {ServicesWebComponent} from './services-web.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {FooterModule} from '../../components/footer/footer.module';
import {ThemeSwitcherModule} from '../../components/theme-switcher/theme-switcher.module';

@NgModule({
  declarations: [ServicesWebComponent],
  imports: [
    CommonModule,
    ServicesWebRoutingModule,
    ShellModule,
    MatButtonModule,
    MatIconModule,
    MatRippleModule,
    MatCardModule,
    MatSelectModule,
    TranslocoModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    UserAccountPopupModule,
    RouterModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    FooterModule,
    ThemeSwitcherModule,
  ],
})
export class ServicesWebModule {}

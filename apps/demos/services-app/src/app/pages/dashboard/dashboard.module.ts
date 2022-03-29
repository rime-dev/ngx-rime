import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatToolbarModule} from '@angular/material/toolbar';
import {TranslocoModule} from '@ngneat/transloco';
import {AuthModule} from '@rng/data-access/auth';
import {ShellModule} from '@rng/ui/shell';
import {UserAccountPopupModule} from '@rng/ui/user-account-popup';
import {SearchInputModule} from '../../components/search-input/search-input.module';
import {ThemeSwitcherModule} from '../../components/theme-switcher/theme-switcher.module';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard.component';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ShellModule,
    UserAccountPopupModule,
    MatSnackBarModule,
    AuthModule,
    SearchInputModule,
    ThemeSwitcherModule,
    TranslocoModule,
  ],
})
export class DashboardModule {}

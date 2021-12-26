import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {ShellModule} from '@rng/ui/shell';
import {UserAccountPopupModule} from '@rng/ui/user-account-popup';
import {environment} from '../environments/environment';
import {AppRoutingModule} from './app-routing.module';
import {BaseModule} from '@rng/data-access/base';
import {AuthModule} from '@rng/data-access/auth';
import {CommonModule} from '@angular/common';

const firebaseConfig = {
  options: environment.firebaseOptions,
  entityConfig: environment.firebaseEntityConfig,
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    ShellModule,
    UserAccountPopupModule,
    AuthModule,
    BaseModule.firebase(firebaseConfig),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

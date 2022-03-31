import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {ShellModule} from '@rime-dev/ui/shell';
import {UserAccountPopupModule} from '@rime-dev/ui/user-account-popup';
import {environment} from '../environments/environment';
import {AppRoutingModule} from './app-routing.module';
import {BaseModule} from '@rime-dev/data-access/base';
import {AuthModule} from '@rime-dev/data-access/auth';
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

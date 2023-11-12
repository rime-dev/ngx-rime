import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material/dialog';
import {MatToolbarModule} from '@angular/material/toolbar';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {RimeAuthConfig, RimeAuthModule, RIME_AUTH_CONFIG} from '@ngx-rime/data-access/auth';
import {RimeBaseModule} from '@ngx-rime/data-access/base';
import {RimeShellModule} from '@ngx-rime/ui/shell';
import {RimeUserAccountPopupModule} from '@ngx-rime/ui/user-account-popup';

import {environment} from '../environments/environment';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TranslocoRootModule} from './transloco-root.module';

const firebaseConfig = {
  options: environment.firebaseOptions,
  entityConfig: environment.firebaseEntityConfig,
};
const authConfig: RimeAuthConfig = {
  disableRegister: true,
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RimeBaseModule.firebase(firebaseConfig),
    RimeAuthModule,
    RimeShellModule,
    TranslocoRootModule,
    MatButtonModule,
    MatToolbarModule,
    RimeUserAccountPopupModule,
  ],
  providers: [
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: {
        minWidth: window.screen.availWidth > 640 ? '40vw' : '95vw',
        minHeight: window.screen.availWidth > 640 ? '40vh' : '95vh',
        width: window.screen.availWidth > 640 ? '40vw' : '95vw',
        height: window.screen.availWidth > 640 ? '40vh' : '95vh',
        hasBackdrop: true,
        panelClass: 'mat-dialog-override',
      },
    },
    {
      provide: RIME_AUTH_CONFIG,
      useValue: authConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

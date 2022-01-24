import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthModule} from '@rng/data-access/auth';
import {BaseMockModule} from '@rng/data-access/base';
import {environment} from '../environments/environment';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

const firebaseConfig = {
  options: environment.firebaseOptions,
  entityConfig: environment.firebaseEntityConfig,
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    // BaseModule.firebase(firebaseConfig),
    BaseMockModule.firebase(firebaseConfig),
    AuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

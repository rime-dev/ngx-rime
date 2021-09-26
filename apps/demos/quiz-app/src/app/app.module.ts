import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppComponent} from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [CommonModule, BrowserModule, AppRoutingModule, BrowserAnimationsModule],
  bootstrap: [AppComponent],
})
export class AppModule {}

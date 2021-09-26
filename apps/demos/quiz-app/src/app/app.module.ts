import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {Mock} from '@rng/util/mock';
import questions from '../assets/questions.json';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppComponent} from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [CommonModule, BrowserModule, AppRoutingModule, BrowserAnimationsModule],
  providers: [...[Mock.provider(questions)]],
  bootstrap: [AppComponent],
})
export class AppModule {}

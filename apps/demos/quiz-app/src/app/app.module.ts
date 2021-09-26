import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {Mock} from '@rng/util/mock';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import questions from '../assets/questions.json';
@NgModule({
  declarations: [AppComponent],
  imports: [CommonModule, BrowserModule, AppRoutingModule],
  providers: [Mock.provider(questions)],
  bootstrap: [AppComponent],
})
export class AppModule {}

import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {QuizModule} from '@rng/ui/quiz';
import {Mock} from '@rng/util/mock';
import questions from '../assets/questions.json';
import {AppComponent} from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [CommonModule, HttpClientModule, QuizModule],
  providers: [Mock.provider(questions)],
  bootstrap: [AppComponent],
})
export class AppModule {}

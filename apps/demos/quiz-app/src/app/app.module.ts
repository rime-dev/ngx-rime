import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {Question, QuizModule} from '@rng/ui/quiz';
import {AppComponent} from './app.component';
import {Mock} from '@rng/util/mock';
import {HttpClientModule} from '@angular/common/http';

const questions: Question[] = [
  {
    title: 'Question 1?',
    options: [
      {
        text: 'Option A',
        state: true,
      },
      {
        text: 'Option B',
        state: false,
      },
      {
        text: 'Option C',
        state: false,
      },
    ],
  },
  {
    title: 'Question 2?',
    options: [
      {
        text: 'Option A',
        state: false,
      },
      {
        text: 'Option B',
        state: true,
      },
      {
        text: 'Option C',
        state: false,
      },
    ],
  },
];
@NgModule({
  declarations: [AppComponent],
  imports: [CommonModule, HttpClientModule, QuizModule],
  providers: [Mock.provider(questions)],
  bootstrap: [AppComponent],
})
export class AppModule {}

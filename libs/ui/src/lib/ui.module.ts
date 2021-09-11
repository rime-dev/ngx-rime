import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {QuizModule} from './quiz/quiz.module';

@NgModule({
  imports: [CommonModule, QuizModule],
  exports: [QuizModule],
})
export class UiModule {}

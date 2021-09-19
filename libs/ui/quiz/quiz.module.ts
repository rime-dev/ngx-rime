import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {QuizOptionComponent} from './components/quiz-option/quiz-option.component';
import {QuizQuestionComponent} from './components/quiz-question/quiz-question.component';
import {QuizComponent} from './quiz.component';

@NgModule({
  declarations: [QuizComponent, QuizOptionComponent, QuizQuestionComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
  ],
  exports: [QuizComponent],
})
export class QuizModule {}

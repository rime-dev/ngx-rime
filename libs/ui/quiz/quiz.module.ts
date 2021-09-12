import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {QuizComponent} from './quiz.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatButtonModule} from '@angular/material/button';
import {QuizOptionComponent} from './components/quiz-option/quiz-option.component';
import {QuizQuestionComponent} from './components/quiz-question/quiz-question.component';
@NgModule({
  declarations: [QuizComponent, QuizOptionComponent, QuizQuestionComponent],
  imports: [CommonModule, MatProgressBarModule, MatButtonModule],
  exports: [QuizComponent, QuizOptionComponent, QuizQuestionComponent],
})
export class QuizModule {}

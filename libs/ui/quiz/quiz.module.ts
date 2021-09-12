import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {QuizComponent} from './quiz.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {QuizOptionComponent} from './components/quiz-option/quiz-option.component';
import {QuizQuestionComponent} from './components/quiz-question/quiz-question.component';
@NgModule({
  declarations: [QuizComponent, QuizOptionComponent, QuizQuestionComponent],
  imports: [CommonModule, MatProgressBarModule, MatButtonModule, MatIconModule, MatTooltipModule],
  exports: [QuizComponent, QuizOptionComponent, QuizQuestionComponent],
})
export class QuizModule {}

import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatChipsModule} from '@angular/material/chips';
import {MATERIAL_SANITY_CHECKS} from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatTooltipModule} from '@angular/material/tooltip';

import {RimeQuizOptionComponent} from './components/quiz-option/quiz-option.component';
import {RimeQuizQuestionComponent} from './components/quiz-question/quiz-question.component';
import {RimeQuizComponent} from './quiz.component';
import {RimeQuizService} from './services/quiz.service';

@NgModule({
  declarations: [RimeQuizComponent, RimeQuizOptionComponent, RimeQuizQuestionComponent],
  imports: [
    CommonModule,
    MatProgressBarModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatChipsModule,
  ],
  exports: [RimeQuizComponent],
  providers: [{provide: MATERIAL_SANITY_CHECKS, useValue: false}, RimeQuizService],
})
export class RimeQuizModule {}

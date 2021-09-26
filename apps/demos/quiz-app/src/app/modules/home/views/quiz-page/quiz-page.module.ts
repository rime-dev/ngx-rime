import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {QuizModule} from '@rng/ui/quiz';
import {QuizPageComponent} from './quiz-page.component';

@NgModule({
  declarations: [QuizPageComponent],
  imports: [CommonModule, HttpClientModule, QuizModule],
})
export class QuizPageModule {}

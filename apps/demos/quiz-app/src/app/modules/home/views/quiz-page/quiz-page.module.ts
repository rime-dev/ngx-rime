import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {QuizModule} from '@rng/ui/quiz';
import {Mock} from '@rng/util/mock';
import {QuizPageRoutingModule} from './quiz-page-routing.module';
import {QuizPageComponent} from './quiz-page.component';
import questions from '../../../../../assets/questions.json';

@NgModule({
  declarations: [QuizPageComponent],
  imports: [CommonModule, HttpClientModule, QuizModule, QuizPageRoutingModule],
  providers: [Mock.provider(questions)],
})
export class QuizPageModule {}
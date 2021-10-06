import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {QuizModule} from '@rng/ui/quiz';
import {Mock} from '@rng/data-access/mock';
import {QuizPageRoutingModule} from './quiz-page-routing.module';
import {QuizPageComponent} from './quiz-page.component';
import {angular_questions} from 'apps/demos/quiz-app/src/assets/questions';

@NgModule({
  declarations: [QuizPageComponent],
  imports: [CommonModule, HttpClientModule, QuizModule, QuizPageRoutingModule],
  providers: [Mock.provider(angular_questions)],
})
export class QuizPageModule {}

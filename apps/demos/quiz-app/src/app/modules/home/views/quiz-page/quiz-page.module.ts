import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {RimeQuizModule} from '@ngx-rime/ui/quiz';
import {RimeMock} from '@ngx-rime/data-access/mock';
import {QuizPageRoutingModule} from './quiz-page-routing.module';
import {QuizPageComponent} from './quiz-page.component';
import questions_angular from 'apps/demos/quiz-app/src/assets/questions_angular.json';

@NgModule({
  declarations: [QuizPageComponent],
  imports: [CommonModule, HttpClientModule, RimeQuizModule, QuizPageRoutingModule],
  providers: [RimeMock.provider(questions_angular)],
})
export class QuizPageModule {}

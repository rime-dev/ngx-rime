import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {QuizModule} from '@ngx-rime/ui/quiz';
import {Mock} from '@ngx-rime/data-access/mock';
import {QuizPageRoutingModule} from './quiz-page-routing.module';
import {QuizPageComponent} from './quiz-page.component';
import questions_angular from 'apps/demos/quiz-app/src/assets/questions_angular.json';

@NgModule({
  declarations: [QuizPageComponent],
  imports: [CommonModule, HttpClientModule, QuizModule, QuizPageRoutingModule],
  providers: [Mock.provider(questions_angular)],
})
export class QuizPageModule {}

import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {QuizModule} from '@rng/ui/quiz';
import {QuizPageRoutingModule} from './quiz-page-routing.module';
import {QuizPageComponent} from './quiz-page.component';

@NgModule({
  declarations: [QuizPageComponent],
  imports: [CommonModule, HttpClientModule, QuizModule, QuizPageRoutingModule],
})
export class QuizPageModule {}

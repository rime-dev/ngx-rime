import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {QuizModule} from '@rng/ui/quiz';
import {QuizPageComponent} from './quiz-page.component';

@NgModule({
  declarations: [QuizPageComponent],
  imports: [HttpClientModule, QuizModule],
})
export class QuizPageModule {}

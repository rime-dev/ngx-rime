import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {QuizModule} from '@rng/ui/quiz';
import {AppComponent} from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [CommonModule, QuizModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

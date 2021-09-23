import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {QuizModule} from '@rng/ui/quiz';
import {AppComponent} from './app.component';
import {Mock} from '@rng/util/mock';
const users: any[] = [];
@NgModule({
  declarations: [AppComponent],
  imports: [CommonModule, QuizModule],
  providers: [Mock.provider(users)],
  bootstrap: [AppComponent],
})
export class AppModule {}

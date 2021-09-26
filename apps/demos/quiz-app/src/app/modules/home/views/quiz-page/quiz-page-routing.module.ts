import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {QuizPageComponent} from './quiz-page.component';

const routes: Routes = [{path: '', component: QuizPageComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuizPageRoutingModule {}

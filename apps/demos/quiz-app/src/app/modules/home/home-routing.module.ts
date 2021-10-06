import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: 'quiz-page',
    loadChildren: () => import('./views/quiz-page/quiz-page.module').then((m) => m.QuizPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}

import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'rng-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public allQuiz: any[] = [
    {
      title: 'ANGULAR',
      subtitle: 'Javascript',
      // eslint-disable-next-line @typescript-eslint/quotes
      description: "The modern web developer's platform",
      image: 'https://angular.io/assets/images/logos/angular/angular.svg',
    },
  ];
  constructor(private router: Router, private route: ActivatedRoute) {}

  handleSelectedQuiz(quiz: any): void {
    this.router.navigate(['quiz-page', quiz.title], {relativeTo: this.route});
  }
}

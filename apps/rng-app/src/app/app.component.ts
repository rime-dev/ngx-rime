import {Component} from '@angular/core';
import {Question} from '@rng/ui/quiz';

@Component({
  selector: 'rng-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'rng-app';
  questions: Question[] = [
    {
      title: 'Question 1?',
      options: [
        {
          text: 'Option A',
          state: true,
        },
        {
          text: 'Option B',
          state: false,
        },
        {
          text: 'Option C',
          state: false,
        },
      ],
    },
    {
      title: 'Question 2?',
      options: [
        {
          text: 'Option A',
          state: false,
        },
        {
          text: 'Option B',
          state: true,
        },
        {
          text: 'Option C',
          state: false,
        },
      ],
    },
  ];
  constructor() {}

  onFinalized(event: boolean): void {
    console.log(event);
  }
}

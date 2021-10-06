import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Question} from '@rng/ui/quiz';
import {Subject} from 'rxjs';
import {takeUntil, tap} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'rng-quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.scss'],
})
export class QuizPageComponent implements OnInit, OnDestroy {
  questions: Question[] = [];
  private destroy$: Subject<void> = new Subject<void>();
  constructor(private httpClient: HttpClient, private router: Router) {}

  onFinalized(event: boolean): void {
    console.log(event);
  }
  onClosed(event: any) {
    this.router.navigate(['/']);
  }
  ngOnInit(): void {
    this.httpClient
      .get('questions')
      .pipe(tap({next: (value: any) => (this.questions = value)}), takeUntil(this.destroy$))
      .subscribe(console.log);
  }
  ngOnDestroy(): void {
    this.destroy$.complete();
  }
}

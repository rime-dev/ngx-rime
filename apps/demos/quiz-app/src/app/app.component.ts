import {HttpClient} from '@angular/common/http';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Question} from '@rng/ui/quiz';
import {Subject} from 'rxjs';
import {takeUntil, tap} from 'rxjs/operators';

@Component({
  selector: 'rng-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'quiz-app';
  questions: Question[] = [];
  private destroy$: Subject<void> = new Subject<void>();
  constructor(private httpClient: HttpClient) {}

  onFinalized(event: boolean): void {
    console.log(event);
  }
  ngOnInit(): void {
    this.httpClient
      .get('questions')
      .pipe(tap({next: (value: any) => (this.questions = value)}), takeUntil(this.destroy$))
      .subscribe();
  }
  ngOnDestroy(): void {
    this.destroy$.complete();
  }
}

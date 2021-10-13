import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Question} from '@rng/ui/quiz';
import {Subject} from 'rxjs';
import {filter, map, takeUntil, tap} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'rng-quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.scss'],
})
export class QuizPageComponent implements OnInit, OnDestroy {
  questions: Question[] = [];
  public quiz: string | null = null;
  private destroy$: Subject<void> = new Subject<void>();
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  onFinalized(event: boolean): void {
    console.log(event);
  }
  onClosed(event: any) {
    this.router.navigate(['/']);
  }
  ngOnInit(): void {
    this.quiz = this.activatedRoute.snapshot.paramMap.get('id');
    this.httpClient
      .get('questions')
      .pipe(
        filter((value: any) => Object.keys(value)[0] === this.quiz),
        map((value: any) => value[this.quiz as string]),
        tap({next: (value: any) => (this.questions = value)}),
        takeUntil(this.destroy$)
      )
      .subscribe(console.log);
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

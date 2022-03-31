import {coerceNumberProperty} from '@angular/cdk/coercion';
import {HttpClient} from '@angular/common/http';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Question, QuizMode} from '@ngx-rime/ui/quiz';
import {Subject} from 'rxjs';
import {map, takeUntil, tap} from 'rxjs/operators';

@Component({
  selector: 'ngx-rime-quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.scss'],
})
export class QuizPageComponent implements OnInit, OnDestroy {
  questions: Question[] = [];
  public quiz: string | null = null;
  public quizMode: QuizMode = 'exam';
  public difficulty = 0;
  public tags = 'random';
  private destroy$: Subject<void> = new Subject<void>();
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  onFinalized(event: boolean): void {}
  onClosed(event: any) {
    void this.router.navigate(['/']);
  }
  private checkQuestions(questions: Question[]): Question[] {
    if (this.tags && this.tags !== 'random') {
      questions = questions.filter((question: Question) =>
        question.tags.some((tag: string) => tag === this.tags)
      );
    }
    if (this.difficulty !== 0) {
      questions = questions.filter((question: Question) => question.level === this.difficulty);
    } else if (this.difficulty === 0) {
      const easy = questions.filter((question: Question) => question.level === 1).slice(0, 15);
      const medium = questions.filter((question: Question) => question.level === 2).slice(0, 10);
      const hard = questions.filter((question: Question) => question.level === 3).slice(0, 5);
      questions = [...easy, ...medium, ...hard];
    }
    const arr = questions
      .map((a) => ({sort: Math.random(), value: a}))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value)
      .slice(0, 30);
    return arr;
  }
  ngOnInit(): void {
    this.quiz = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.quiz) {
      this.difficulty = coerceNumberProperty(
        this.activatedRoute.snapshot.queryParamMap.get('difficulty') as string
      );
      this.tags = this.activatedRoute.snapshot.queryParamMap.get('tags') as string;
      const question = `questions_${this.quiz.toLowerCase()}`;
      this.httpClient
        .get<Question[]>(question)
        .pipe(
          // TODO: remove filter when back is made
          map((questions: Question[]) => this.checkQuestions(questions)),
          tap({next: (value: any) => (this.questions = value)}),
          takeUntil(this.destroy$)
        )
        .subscribe();
    }
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

import {
  Component,
  EventEmitter,
  Input,
  NgZone,
  OnDestroy,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import {from, Subject} from 'rxjs';
import {delay, finalize, map, takeUntil} from 'rxjs/operators';
import {Question, QuestionOption} from '../../models/quiz.model';
import {QuizOptionComponent} from '../quiz-option/quiz-option.component';
@Component({
  selector: 'rng-quiz-question',
  templateUrl: './quiz-question.component.html',
  styleUrls: ['./quiz-question.component.scss'],
})
export class QuizQuestionComponent implements OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();

  @Input()
  get question(): Question {
    return this._question;
  }
  set question(value: Question) {
    this._question = new Question(value);
  }
  private _question: Question = {
    title: '',
    options: [],
    type: 'single',
    tags: [],
    level: 1,
  };

  @Input()
  get index(): number {
    return this._index;
  }
  set index(value: number) {
    this._index = value;
  }
  private _index = 0;

  @Output() selected: EventEmitter<Question> = new EventEmitter<Question>();

  // Query all child elements
  @ViewChildren(QuizOptionComponent) options!: QueryList<QuizOptionComponent>;

  constructor(private ngZone: NgZone) {}

  onSelectOption(event: number) {
    this.ngZone.runOutsideAngular(() =>
      from(this.question.options)
        .pipe(
          map((option: QuestionOption) =>
            option.index === event && option ? (option.response = true) : (option.response = false)
          ),
          delay(1000),
          finalize(() =>
            this.ngZone.runTask(() => this.selected.next({...this.question, index: this.index}))
          ),
          delay(1000),
          finalize(() => this.ngZone.runTask(() => (this.question.dirty = true))),
          takeUntil(this.destroy$)
        )
        .subscribe()
    );
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
  }
}

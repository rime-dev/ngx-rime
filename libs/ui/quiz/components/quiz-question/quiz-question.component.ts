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
import {Question, QuestionOption, QuizMode} from '../../models/quiz.model';
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
    this._question = new Question({...value, index: this.index});
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

  /**
   * Defines the quiz mode
   */
  @Input()
  get mode(): QuizMode {
    return this._mode;
  }
  set mode(value: QuizMode) {
    this._mode = value;
  }
  private _mode: QuizMode = 'exam';

  @Output() selected: EventEmitter<Question> = new EventEmitter<Question>();

  // Query all child elements
  @ViewChildren(QuizOptionComponent) options!: QueryList<QuizOptionComponent>;

  constructor(private ngZone: NgZone) {}

  private onResponseOption(option: QuestionOption, event: number): QuestionOption {
    if (option.index === event && option) {
      option.response = true;
      this.question = {...this.question, response: option.index, index: this.index, dirty: true};
    } else {
      option.response = false;
    }
    return option;
  }
  onSelectOption(event: number) {
    if (this.mode !== 'exam') {
      return;
    }
    this.ngZone.runOutsideAngular(() =>
      from(this.question.options)
        .pipe(
          map((option: QuestionOption) => this.onResponseOption(option, event)),
          delay(1000),
          finalize(() => this.ngZone.runTask(() => this.selected.next(this.question))),
          takeUntil(this.destroy$)
        )
        .subscribe()
    );
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
  }
}

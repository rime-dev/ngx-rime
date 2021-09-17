import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import {from, of, Subject, timer} from 'rxjs';
import {debounce, debounceTime, delay, finalize, map, takeUntil} from 'rxjs/operators';
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
    this._question = value;
  }
  private _question!: Question;

  @Input()
  get index(): number {
    return this._index;
  }
  set index(value: number) {
    this._index = value;
  }
  private _index!: number;

  @Output() selected: EventEmitter<Question> = new EventEmitter<Question>();

  // Query all child elements
  @ViewChildren(QuizOptionComponent) options!: QueryList<QuizOptionComponent>;

  onSelectOption(event: QuestionOption) {
    from(this.question.options)
      .pipe(
        map((option: QuestionOption) =>
          option.text === event.text ? (option.response = true) : (option.response = false)
        ),
        delay(500),
        finalize(() => this.selected.next({...this.question, index: this.index})),
        delay(500),
        finalize(() => (this.question.dirty = true)),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
  }
}

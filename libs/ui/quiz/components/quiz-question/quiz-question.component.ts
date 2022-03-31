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
import {delay, finalize, map, takeUntil, tap} from 'rxjs/operators';
import {Question, QuestionOption} from '../../models/quiz.model';
import {QuizService} from '../../services/quiz.service';
import {QuizOptionComponent} from '../quiz-option/quiz-option.component';
@Component({
  selector: 'ngx-rime-quiz-question',
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

  @Output() selected: EventEmitter<Question> = new EventEmitter<Question>();

  // Query all child elements
  @ViewChildren(QuizOptionComponent) options!: QueryList<QuizOptionComponent>;

  constructor(private ngZone: NgZone, private quizService: QuizService) {}

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
    if (this.quizService.getMode() !== 'exam') {
      return;
    }
    this.ngZone.runOutsideAngular(() =>
      from(this.question.options)
        .pipe(
          tap((option: QuestionOption) => (option.parentQuestion = this.question)),
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

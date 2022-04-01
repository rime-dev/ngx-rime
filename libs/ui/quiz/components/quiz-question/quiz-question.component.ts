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
import {RimeQuestion, RimeQuestionOption} from '../../models/quiz.model';
import {RimeQuizService} from '../../services/quiz.service';
import {RimeQuizOptionComponent} from '../quiz-option/quiz-option.component';
@Component({
  selector: 'rime-quiz-question',
  templateUrl: './quiz-question.component.html',
  styleUrls: ['./quiz-question.component.scss'],
})
export class RimeQuizQuestionComponent implements OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();

  @Input()
  get question(): RimeQuestion {
    return this._question;
  }
  set question(value: RimeQuestion) {
    this._question = new RimeQuestion({...value, index: this.index});
  }
  private _question: RimeQuestion = {
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

  @Output() selected: EventEmitter<RimeQuestion> = new EventEmitter<RimeQuestion>();

  // Query all child elements
  @ViewChildren(RimeQuizOptionComponent) options!: QueryList<RimeQuizOptionComponent>;

  constructor(private ngZone: NgZone, private rimeQuizService: RimeQuizService) {}

  private onResponseOption(option: RimeQuestionOption, event: number): RimeQuestionOption {
    if (option.index === event && option) {
      option.response = true;
      this.question = {...this.question, response: option.index, index: this.index, dirty: true};
    } else {
      option.response = false;
    }
    return option;
  }
  onSelectOption(event: number) {
    if (this.rimeQuizService.getMode() !== 'exam') {
      return;
    }
    this.ngZone.runOutsideAngular(() =>
      from(this.question.options)
        .pipe(
          tap((option: RimeQuestionOption) => (option.parentQuestion = this.question)),
          map((option: RimeQuestionOption) => this.onResponseOption(option, event)),
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

import {
  Component,
  EventEmitter,
  forwardRef,
  HostBinding,
  HostListener,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {Question, QuestionOption, QuizMode} from '../../models/quiz.model';
import {QuizComponent} from '../../quiz.component';
import {QuizQuestionComponent} from '../quiz-question/quiz-question.component';

@Component({
  selector: 'rng-quiz-option',
  templateUrl: './quiz-option.component.html',
  styleUrls: ['./quiz-option.component.scss'],
})
export class QuizOptionComponent implements OnInit {
  public mode: QuizMode = 'exam';
  public solution = false;

  @Input()
  get option(): QuestionOption {
    return this._option;
  }
  set option(value: QuestionOption) {
    this._option = value;
  }
  private _option!: QuestionOption;

  @Input()
  get index(): number {
    return this._index;
  }
  set index(value: number) {
    this._index = value;
  }
  private _index = 0;

  @HostBinding('option-selected') get valid() {
    if (this.option) {
      return this.option.response;
    } else {
      return;
    }
  }

  @Output() selected: EventEmitter<QuestionOption> = new EventEmitter<QuestionOption>();

  @HostListener('click', ['$event'])
  _handleClick(event: Event) {
    event.preventDefault();
    this.selectOption();
  }
  @HostListener('keydown.space', ['$event'])
  @HostListener('keydown.enter', ['$event'])
  _handleKeydown(event: Event) {
    event.preventDefault();
    this.selectOption();
  }

  constructor(
    @Inject(forwardRef(() => QuizComponent))
    private _quizComponent: QuizComponent,
    @Inject(forwardRef(() => QuizQuestionComponent))
    private _quizQuestionComponent: QuizQuestionComponent
  ) {
    this.mode = this._quizComponent.mode;
  }

  selectOption() {
    this.selected.next({...this.option, index: this.index, response: true});
  }
  private checkSingleQuestion() {
    if ((this.option.index as number) + 1 === this._quizQuestionComponent.question.answer) {
      this.solution = true;
    }
  }
  private checkBooleanQuestion() {
    if (this.option.text === this._quizQuestionComponent.question.answer) {
      this.solution = true;
    }
  }
  ngOnInit() {
    if (this.mode === 'solution') {
      switch (this._quizQuestionComponent.question.type) {
        case 'single':
          this.checkSingleQuestion();
          break;
        case 'boolean':
          this.checkBooleanQuestion();
          break;
        default:
          break;
      }
    }
  }
}

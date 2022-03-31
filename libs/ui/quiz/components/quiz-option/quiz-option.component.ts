import {
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {Question, QuestionOption, QuizMode} from '../../models/quiz.model';
import {QuizService} from '../../services/quiz.service';

@Component({
  selector: 'rime-quiz-option',
  templateUrl: './quiz-option.component.html',
  styleUrls: ['./quiz-option.component.scss'],
})
export class QuizOptionComponent implements OnInit {
  public solution = false;
  public mode: QuizMode;

  @Input() parentQuestion!: Question;

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

  constructor(private quizService: QuizService) {
    this.mode = this.quizService.getMode();
  }

  selectOption() {
    this.selected.next({...this.option, index: this.index, response: true});
  }
  private checkSingleQuestion() {
    if (!this.parentQuestion) {
      return;
    }
    if ((this.option.index as number) + 1 === this.parentQuestion.answer) {
      this.solution = true;
    }
  }
  private checkBooleanQuestion() {
    if (!this.parentQuestion) {
      return;
    }
    if (this.option.text === this.parentQuestion.answer) {
      this.solution = true;
    }
  }
  ngOnInit() {
    if (!this.parentQuestion) {
      return;
    }
    if (this.mode === 'solution') {
      switch (this.parentQuestion.type) {
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

import {FocusMonitor} from '@angular/cdk/a11y';
import {coerceArray, coerceBooleanProperty} from '@angular/cdk/coercion';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import {RimeQuizQuestionComponent} from './components/quiz-question/quiz-question.component';
import {RimeQuestion, RimeQuizMode} from './models/quiz.model';
import {RimeQuizService} from './services/quiz.service';

@Component({
  selector: 'rime-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class RimeQuizComponent implements AfterViewInit, OnDestroy {
  public progress = 0;
  public currentIndex = 0;
  public canBeFinalized = false;
  /**
   * Defines the visibility of MatProgressBar
   */
  @Input()
  get showProgressBar(): boolean {
    return this._showProgressBar;
  }
  set showProgressBar(value: boolean) {
    this._showProgressBar = coerceBooleanProperty(value);
  }
  private _showProgressBar = true;

  /**
   * Defines the questions
   */
  @Input()
  get questions(): RimeQuestion[] {
    return this._questions;
  }
  set questions(value: RimeQuestion[]) {
    this._questions = coerceArray(value);
    this.quizService.setQuestions(value);
  }
  private _questions: RimeQuestion[] = [];

  /**
   * Defines the quiz mode
   */
  @Input()
  get mode(): RimeQuizMode {
    return this.internalMode;
  }
  set mode(value: RimeQuizMode) {
    this.internalMode = value;
    this.quizService.setMode(value);
  }
  private internalMode: RimeQuizMode = 'exam';

  /**
   * Closed emitter behaviour
   */
  @Output() closed: EventEmitter<boolean> = new EventEmitter<boolean>();

  /**
   * Finalized emitter behaviour
   */
  @Output() finalized: EventEmitter<boolean> = new EventEmitter<boolean>();

  // Query all child elements
  @ViewChildren(RimeQuizQuestionComponent) questionsComponent!: QueryList<RimeQuizQuestionComponent>;

  @HostBinding('attr.tabIndex') tabIndex = 1;

  @HostListener('keydown.1', ['$event'])
  _handleKeydownDigit1(event: Event) {
    event.preventDefault();
    if (this.mode !== 'exam') {
      return;
    }
    this.questionsComponent.first.onSelectOption(0);
    this.restoreFocus();
  }

  @HostListener('keydown.2', ['$event'])
  _handleKeydownDigit2(event: Event) {
    event.preventDefault();
    if (this.mode !== 'exam') {
      return;
    }
    this.questionsComponent.first.onSelectOption(1);
    this.restoreFocus();
  }

  @HostListener('keydown.3', ['$event'])
  _handleKeydownDigit3(event: Event) {
    event.preventDefault();
    if (this.mode !== 'exam') {
      return;
    }
    this.questionsComponent.first.onSelectOption(2);
    this.restoreFocus();
  }

  @HostListener('keydown.ArrowLeft', ['$event'])
  _handleKeydownLeft(event: Event) {
    event.preventDefault();
    this.previousQuestion();
  }

  @HostListener('keydown.ArrowRight', ['$event'])
  _handleKeydownRight(event: Event) {
    event.preventDefault();
    this.nextQuestion();
  }
  @HostListener('keydown.ArrowUp', ['$event'])
  @HostListener('keydown.ArrowDown', ['$event'])
  _handleKeydownUpDown(event: Event) {
    event.preventDefault();
  }

  constructor(
    private focusMonitor: FocusMonitor,
    private elementRef: ElementRef<HTMLElement>,
    private quizService: RimeQuizService
  ) {}

  ngAfterViewInit(): void {
    this.focusMonitor.monitor(this.elementRef);
    this.restoreFocus();
  }
  ngOnDestroy(): void {
    this.focusMonitor.stopMonitoring(this.elementRef);
  }
  private updateQuestion(question: RimeQuestion) {
    this.questions = this.questions.map((question0: RimeQuestion, i: number) => {
      if (i === question.index) {
        return question;
      }
      return question0;
    });
    this.quizService.setQuestions(this.questions);
  }
  onSelectQuestion(question: RimeQuestion): void {
    if (question.dirty) {
      const totalIndex = this.questions.length;
      if ((question.index as number) < totalIndex - 1) {
        const currentIndex = (question.index as number) + 1;
        this.currentIndex = currentIndex;
        if (this.progress < 100) {
          const currentProgress = (currentIndex * 100) / totalIndex;
          this.progress = currentProgress;
        }
      } else if ((question.index as number) === totalIndex - 1) {
        this.progress = 100;
      }

      this.updateQuestion(question);

      if (this.checkIfCanBeFinlized()) {
        this.canBeFinalized = true;
      }
    }
  }

  previousQuestion(): void {
    if (this.currentIndex > 0) {
      this.currentIndex = this.currentIndex - 1;
    }
    this.restoreFocus();
  }

  nextQuestion(): void {
    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex = this.currentIndex + 1;
    }
    this.restoreFocus();
  }

  restoreFocus() {
    this.focusMonitor.focusVia(this.elementRef, 'program');
    this.elementRef.nativeElement.focus();
  }

  closeQuiz(): void {
    this.closed.next(true);
  }

  finaliceQuiz(): void {
    this.finalized.next(true);
  }

  private checkIfCanBeFinlized(): boolean {
    return this.questions.every(
      (question: RimeQuestion) => question.response || question.response === 0
    );
  }
}

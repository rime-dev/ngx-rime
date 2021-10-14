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
import {from} from 'rxjs';
import {QuizOptionComponent} from './components/quiz-option/quiz-option.component';
import {QuizQuestionComponent} from './components/quiz-question/quiz-question.component';
import {Question, QuestionOption} from './models/quiz.model';

@Component({
  selector: 'rng-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements AfterViewInit, OnDestroy {
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
  get questions(): Question[] {
    return this._questions;
  }
  set questions(value: Question[]) {
    this._questions = coerceArray(value);
  }
  private _questions: Question[] = [];

  /**
   * Closed emitter behaviour
   */
  @Output() closed: EventEmitter<boolean> = new EventEmitter<boolean>();

  /**
   * Finalized emitter behaviour
   */
  @Output() finalized: EventEmitter<boolean> = new EventEmitter<boolean>();

  // Query all child elements
  @ViewChildren(QuizOptionComponent) options!: QueryList<QuizOptionComponent>;
  @ViewChildren(QuizQuestionComponent) questionsComponent!: QueryList<QuizQuestionComponent>;

  @HostBinding('attr.tabIndex') tabIndex = 1;

  @HostListener('keydown.1', ['$event'])
  _handleKeydownDigit1(event: Event) {
    event.preventDefault();
    this.questionsComponent.first.onSelectOption(0);
    this.restoreFocus();
  }

  @HostListener('keydown.2', ['$event'])
  _handleKeydownDigit2(event: Event) {
    event.preventDefault();
    this.questionsComponent.first.onSelectOption(1);
    this.restoreFocus();
  }

  @HostListener('keydown.3', ['$event'])
  _handleKeydownDigit3(event: Event) {
    event.preventDefault();
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

  constructor(private focusMonitor: FocusMonitor, private elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    this.focusMonitor.monitor(this.elementRef);
    this.restoreFocus();
  }
  ngOnDestroy(): void {
    this.focusMonitor.stopMonitoring(this.elementRef);
  }
  private updateQuestion(question: Question) {
    this.questions = this.questions.map((question0: Question, i: number) => {
      if (i === question.index) {
        return question;
      }
      return question0;
    });
  }
  onSelectQuestion(question: Question): void {
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
      if (this.checkIfCanBeFinlized()) {
        this.canBeFinalized = true;
      }
      this.updateQuestion(question);
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
    return this.questions.every((question: Question) => question.response) as boolean;
  }
}

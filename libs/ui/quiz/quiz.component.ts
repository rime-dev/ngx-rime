import {FocusMonitor} from '@angular/cdk/a11y';
import {coerceArray, coerceBooleanProperty} from '@angular/cdk/coercion';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
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
  get questions(): any[] {
    return this._questions;
  }
  set questions(value: any[]) {
    this._questions = coerceArray(value);
  }
  private _questions!: any[];

  /**
   * Closed emitter behaviour
   */
  @Output() closed: EventEmitter<boolean> = new EventEmitter<boolean>();

  /**
   * Finalized emitter behaviour
   */
  @Output() finalized: EventEmitter<boolean> = new EventEmitter<boolean>();

  @HostListener('keydown.ArrowLeft', ['$event'])
  _handleKeydownLeft(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    console.log(event);

    this.previousQuestion();
  }

  @HostListener('keydown.ArrowRight', ['$event'])
  _handleKeydownRight(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.nextQuestion();
  }

  constructor(private _focusMonitor: FocusMonitor, private _elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    this._focusMonitor.monitor(this._elementRef, true);
  }

  ngOnDestroy(): void {
    this._focusMonitor.stopMonitoring(this._elementRef);
  }

  onSelectQuestion(event: Question): void {
    const totalIndex = this.questions.length;
    if ((event.index as number) < totalIndex - 1) {
      const currentIndex = (event.index as number) + 1;
      this.currentIndex = currentIndex;
      if (this.progress < 100) {
        const currentProgress = (currentIndex * 100) / totalIndex;
        this.progress = currentProgress;
      }
    } else if ((event.index as number) === totalIndex - 1) {
      this.progress = 100;
    }
    if (this.checkIfCanBeFinlized()) {
      this.canBeFinalized = true;
    }
  }

  previousQuestion(): void {
    if (this.currentIndex > 0) {
      this.currentIndex = this.currentIndex - 1;
    }
  }

  nextQuestion(): void {
    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex = this.currentIndex + 1;
    }
  }

  closeQuiz(): void {
    this.closed.next(true);
  }

  finaliceQuiz(): void {
    this.finalized.next(true);
  }

  private checkIfCanBeFinlized(): boolean {
    return this.questions.every((question: Question) =>
      question.options.some((option: QuestionOption) => option.response)
    ) as boolean;
  }
}

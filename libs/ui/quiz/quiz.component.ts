import {coerceArray, coerceBooleanProperty} from '@angular/cdk/coercion';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Question} from './models/quiz.model';

@Component({
  selector: 'rng-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent {
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

  @Output() finalized: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {}

  onSelectQuestion(event: Question): void {
    const totalIndex = this.questions.length;
    if ((event.index as number) < totalIndex - 1) {
      const currentIndex = (event.index as number) + 1;
      const currentProgress = (currentIndex * 100) / totalIndex;
      this.currentIndex = currentIndex;
      this.progress = currentProgress;
    } else if ((event.index as number) === totalIndex - 1) {
      this.progress = 100;
      this.canBeFinalized = true;
    }
    console.log('Question', this.currentIndex);
    console.log('totalIndex', this.questions.length);
  }

  previousQuestion(): void {}

  nextQuestion(): void {}

  finaliceQuiz(): void {
    this.finalized.next(true);
  }
}

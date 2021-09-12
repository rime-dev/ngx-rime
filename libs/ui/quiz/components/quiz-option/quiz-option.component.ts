import {FocusMonitor} from '@angular/cdk/a11y';
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
import {QuestionOption} from '../../models/quiz.model';

@Component({
  selector: 'rng-quiz-option',
  templateUrl: './quiz-option.component.html',
  styleUrls: ['./quiz-option.component.scss'],
})
export class QuizOptionComponent implements AfterViewInit, OnDestroy {
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
  private _index!: number;

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

  constructor(private _focusMonitor: FocusMonitor, private _elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    this._focusMonitor.monitor(this._elementRef, true);
  }

  selectOption() {
    this.selected.next({...this.option, index: this.index, response: true});
  }

  ngOnDestroy(): void {
    this._focusMonitor.stopMonitoring(this._elementRef);
  }
}

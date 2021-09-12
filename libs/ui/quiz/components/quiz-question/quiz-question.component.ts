import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Question, QuestionOption} from '../../models/quiz.model';

@Component({
  selector: 'rng-quiz-question',
  templateUrl: './quiz-question.component.html',
  styleUrls: ['./quiz-question.component.scss'],
})
export class QuizQuestionComponent {
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

  onSelectOption(event: QuestionOption) {
    this.question.options.forEach((option: QuestionOption) =>
      option.text === event.text ? (option.response = true) : (option.response = false)
    );
    this.selected.next({...this.question, index: this.index});
  }
}

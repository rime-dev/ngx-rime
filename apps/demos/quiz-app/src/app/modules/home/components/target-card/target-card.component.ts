import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'ngx-rime-target-card',
  templateUrl: './target-card.component.html',
  styleUrls: ['./target-card.component.scss'],
})
export class TargetCardComponent {
  @Input() quiz: any;
  @Output() selected: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  selectedQuiz(quiz: any): void {
    this.selected.emit(quiz);
  }
}

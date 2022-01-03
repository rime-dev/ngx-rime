import {ComponentFixture, TestBed} from '@angular/core/testing';
import {QuizComponent} from '../../quiz.component';
import {QuizModule} from '../../quiz.module';
import {QuizQuestionComponent} from '../quiz-question/quiz-question.component';

import {QuizOptionComponent} from './quiz-option.component';

describe('QuizOptionComponent', () => {
  let component: QuizOptionComponent;
  let fixture: ComponentFixture<QuizOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuizOptionComponent],
      imports: [QuizModule],
      providers: [QuizComponent, QuizQuestionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import {ComponentFixture, TestBed} from '@angular/core/testing';
import {QuizModule} from '../../quiz.module';
import {QuizOptionComponent} from '../quiz-option/quiz-option.component';
import {QuizQuestionComponent} from '../quiz-question/quiz-question.component';

describe('QuizQuestionComponent', () => {
  let component: QuizQuestionComponent;
  let fixture: ComponentFixture<QuizQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuizQuestionComponent],
      imports: [QuizModule],
      providers: [QuizOptionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RimeQuizModule} from '../../quiz.module';
import {RimeQuizQuestionComponent} from '../quiz-question/quiz-question.component';

describe('RimeQuizQuestionComponent', () => {
  let component: RimeQuizQuestionComponent;
  let fixture: ComponentFixture<RimeQuizQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RimeQuizQuestionComponent],
      imports: [RimeQuizModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RimeQuizQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

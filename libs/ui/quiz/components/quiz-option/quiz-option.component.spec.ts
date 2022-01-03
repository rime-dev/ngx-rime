import {ComponentFixture, TestBed} from '@angular/core/testing';
import {QuizModule} from '../../quiz.module';
import {QuizOptionComponent} from './quiz-option.component';

describe('QuizOptionComponent', () => {
  let component: QuizOptionComponent;
  let fixture: ComponentFixture<QuizOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuizOptionComponent],
      imports: [QuizModule],
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

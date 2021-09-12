import {ComponentFixture, TestBed} from '@angular/core/testing';

import {QuizOptionComponent} from './quiz-option.component';

describe('QuizOptionComponent', () => {
  let component: QuizOptionComponent;
  let fixture: ComponentFixture<QuizOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuizOptionComponent],
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

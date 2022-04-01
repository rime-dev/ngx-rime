import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RimeQuizModule} from '../../quiz.module';
import {RimeQuizOptionComponent} from './quiz-option.component';

describe('RimeQuizOptionComponent', () => {
  let component: RimeQuizOptionComponent;
  let fixture: ComponentFixture<RimeQuizOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RimeQuizOptionComponent],
      imports: [RimeQuizModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RimeQuizOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

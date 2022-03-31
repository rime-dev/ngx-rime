import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RimeQuizComponent} from './quiz.component';
import {RimeQuizModule} from './quiz.module';

describe('RimeQuizComponent', () => {
  let component: RimeQuizComponent;
  let fixture: ComponentFixture<RimeQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RimeQuizComponent],
      imports: [RimeQuizModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RimeQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

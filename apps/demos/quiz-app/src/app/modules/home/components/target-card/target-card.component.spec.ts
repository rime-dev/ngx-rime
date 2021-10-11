import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TargetCardComponent} from './target-card.component';

describe('TargetCardComponent', () => {
  let component: TargetCardComponent;
  let fixture: ComponentFixture<TargetCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TargetCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

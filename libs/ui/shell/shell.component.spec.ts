import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RimeShellComponent} from './shell.component';
import {RimeShellModule} from './shell.module';
describe('RimeShellComponent', () => {
  let component: RimeShellComponent;
  let fixture: ComponentFixture<RimeShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RimeShellComponent],
      imports: [RimeShellModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RimeShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

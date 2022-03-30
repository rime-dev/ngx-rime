import {Component} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {RngAutofocusDirective} from './autofocus.directive';
import {RngAutofocusModule} from './autofocus.module';
@Component({
  template: ` <input rngAutofocus /> `,
})
class AutofocusInputComponent {}

describe('RngAutofocusDirective', () => {
  it('should create an instance', () => {});
});

describe('RngAutofocusDirective in component', () => {
  beforeEach(() => {
    void TestBed.configureTestingModule({
      declarations: [AutofocusInputComponent],
      imports: [RngAutofocusModule],
    }).compileComponents();
  });

  xit('should create an instance', () => {
    const fixture = TestBed.createComponent(AutofocusInputComponent);
    fixture.detectChanges();
    jest.spyOn(fixture.nativeElement as HTMLElement, 'focus');
    expect((fixture.nativeElement as HTMLElement).focus).not.toHaveBeenCalled();
    const element = fixture.debugElement.query(By.directive(RngAutofocusDirective));
    fixture.detectChanges();
    jest.spyOn(element.nativeElement as HTMLElement, 'focus');
    expect((element.nativeElement as HTMLElement).focus).toHaveBeenCalled();
  });
});

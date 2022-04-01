import {Component} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {RimeAutofocusDirective} from './autofocus.directive';
import {RimeAutofocusModule} from './autofocus.module';
@Component({
  template: ` <input ngx-rimeAutofocus /> `,
})
class AutofocusInputComponent {}

describe('RimeAutofocusDirective', () => {
  it('should create an instance', () => {});
});

describe('RimeAutofocusDirective in component', () => {
  beforeEach(() => {
    void TestBed.configureTestingModule({
      declarations: [AutofocusInputComponent],
      imports: [RimeAutofocusModule],
    }).compileComponents();
  });

  xit('should create an instance', () => {
    const fixture = TestBed.createComponent(AutofocusInputComponent);
    fixture.detectChanges();
    jest.spyOn(fixture.nativeElement as HTMLElement, 'focus');
    expect((fixture.nativeElement as HTMLElement).focus).not.toHaveBeenCalled();
    const element = fixture.debugElement.query(By.directive(RimeAutofocusDirective));
    fixture.detectChanges();
    jest.spyOn(element.nativeElement as HTMLElement, 'focus');
    expect((element.nativeElement as HTMLElement).focus).toHaveBeenCalled();
  });
});

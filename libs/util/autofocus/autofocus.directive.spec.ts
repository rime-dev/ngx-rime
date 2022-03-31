import {Component} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {NgxRimeAutofocusDirective} from './autofocus.directive';
import {NgxRimeAutofocusModule} from './autofocus.module';
@Component({
  template: ` <input ngx-rimeAutofocus /> `,
})
class AutofocusInputComponent {}

describe('NgxRimeAutofocusDirective', () => {
  it('should create an instance', () => {});
});

describe('NgxRimeAutofocusDirective in component', () => {
  beforeEach(() => {
    void TestBed.configureTestingModule({
      declarations: [AutofocusInputComponent],
      imports: [NgxRimeAutofocusModule],
    }).compileComponents();
  });

  xit('should create an instance', () => {
    const fixture = TestBed.createComponent(AutofocusInputComponent);
    fixture.detectChanges();
    jest.spyOn(fixture.nativeElement as HTMLElement, 'focus');
    expect((fixture.nativeElement as HTMLElement).focus).not.toHaveBeenCalled();
    const element = fixture.debugElement.query(By.directive(NgxRimeAutofocusDirective));
    fixture.detectChanges();
    jest.spyOn(element.nativeElement as HTMLElement, 'focus');
    expect((element.nativeElement as HTMLElement).focus).toHaveBeenCalled();
  });
});

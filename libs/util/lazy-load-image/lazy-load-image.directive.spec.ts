import {Component} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {RimeLazyLoadImageDirective} from './lazy-load-image.directive';
import {LazyLoadImageModule} from './lazy-load-image.module';

@Component({
  template: `
    <img rimeLazyLoadImage src="https://github.com/rime-dev/ngx-rime/blob/main/images/ngx-rime-logo.png" />
  `,
})
class LazyLoadImageComponent {}

describe('RimeLazyLoadImageDirective', () => {
  it('should create an instance', () => {
    const element = document.createElement('img');
    element.src = 'https://github.com/rime-dev/ngx-rime/blob/main/images/ngx-rime-logo.png';
    const directive = new RimeLazyLoadImageDirective(element as never);
    expect(directive).toBeTruthy();
  });
});

describe('RimeLazyLoadImageDirective in component', () => {
  beforeEach(() => {
    void TestBed.configureTestingModule({
      declarations: [LazyLoadImageComponent],
      imports: [LazyLoadImageModule],
    }).compileComponents();
  });

  it('should create an instance', () => {
    const fixture = TestBed.createComponent(LazyLoadImageComponent);
    const element = fixture.debugElement.query(By.directive(RimeLazyLoadImageDirective));
    expect((fixture.nativeElement as HTMLElement).getAttribute('src')).not.toBe(
      'https://github.com/rime-dev/ngx-rime/blob/main/images/ngx-rime-logo.png'
    );
    fixture.detectChanges();
    expect(element.attributes.src).toBe(
      'https://github.com/rime-dev/ngx-rime/blob/main/images/ngx-rime-logo.png'
    );
  });
});

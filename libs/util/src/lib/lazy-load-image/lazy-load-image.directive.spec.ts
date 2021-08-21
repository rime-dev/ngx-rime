import {Component} from '@angular/core';
import {LazyLoadImageModule} from './lazy-load-image.module';
import {TestBed} from '@angular/core/testing';
import {LazyLoadImageDirective} from './lazy-load-image.directive';
import {By} from '@angular/platform-browser';

@Component({
  template: `
    <img rngLazyLoadImage src="https://github.com/rime-dev/rng/blob/main/images/rng-logo.png" />
  `,
})
class LazyLoadImageComponent {}

describe('LazyLoadImageDirective', () => {
  it('should create an instance', () => {
    const element = document.createElement('img');
    element.src = 'https://github.com/rime-dev/rng/blob/main/images/rng-logo.png';
    const directive = new LazyLoadImageDirective(element as any);
    expect(directive).toBeTruthy();
  });
});

describe('LazyLoadImageDirective in component', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LazyLoadImageComponent],
      imports: [LazyLoadImageModule],
    }).compileComponents();
  });

  it('should create an instance', () => {
    const fixture = TestBed.createComponent(LazyLoadImageComponent);
    const element = fixture.debugElement.query(By.directive(LazyLoadImageDirective));
    expect(fixture.nativeElement.getAttribute('src')).not.toBe(
      'https://github.com/rime-dev/rng/blob/main/images/rng-logo.png'
    );
    fixture.detectChanges();
    expect(element.attributes.src).toBe(
      'https://github.com/rime-dev/rng/blob/main/images/rng-logo.png'
    );
  });
});

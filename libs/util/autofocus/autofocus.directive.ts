import {AfterViewInit, Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[rngAutofocus]',
})
export class RngAutofocusDirective implements AfterViewInit {
  constructor(private host: ElementRef<HTMLElement>) {}

  ngAfterViewInit() {
    this.host.nativeElement.focus();
  }
}

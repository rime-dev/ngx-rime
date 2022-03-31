import {AfterViewInit, Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[rimeAutofocus]',
})
export class RimeAutofocusDirective implements AfterViewInit {
  constructor(private host: ElementRef<HTMLElement>) {}

  ngAfterViewInit() {
    this.host.nativeElement.focus();
  }
}

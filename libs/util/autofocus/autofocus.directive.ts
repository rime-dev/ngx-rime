import {AfterViewInit, Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[ngx-rime-autofocus]',
})
export class NgxRimeAutofocusDirective implements AfterViewInit {
  constructor(private host: ElementRef<HTMLElement>) {}

  ngAfterViewInit() {
    this.host.nativeElement.focus();
  }
}

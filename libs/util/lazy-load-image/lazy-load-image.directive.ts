import {AfterViewInit, Directive, ElementRef, HostBinding, Input} from '@angular/core';
import {timer} from 'rxjs';
import {take} from 'rxjs/operators';

@Directive({
  selector: 'img[rimeLazyLoadImage]',
})
export class RimeLazyLoadImageDirective implements AfterViewInit {
  @HostBinding('attr.src') srcAttr!: string;

  @Input() src!: string;

  constructor(private el: ElementRef<HTMLElement>) {
    this.srcAttr =
      'data:image/gif;base64,R0lGODlhAQABAPAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';
  }

  /**
   * After view init life cycle
   */
  ngAfterViewInit(): void {
    /** Async timer to avoid NG0100: Expression has changed after it was checked */
    timer(0)
      .pipe(take(1))
      .subscribe(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        this.canLazyLoad() ? this.lazyLoadImage() : this.loadImage();
      });
  }

  /**
   * Whether or not it is possible to use intersectionobserver
   */
  private canLazyLoad(): boolean {
    return window && 'IntersectionObserver' in window;
  }

  /**
   * Observes the native element to load the image source
   */
  private lazyLoadImage(): void {
    const obs = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
      entries.forEach(({isIntersecting}) => {
        if (isIntersecting) {
          this.loadImage();
          obs.unobserve(this.el.nativeElement);
        }
      });
    });
    obs.observe(this.el.nativeElement);
  }

  /**
   * Attends to assign the image source to the source attribute for the element
   */
  private loadImage(): void {
    this.srcAttr = this.src;
  }
}

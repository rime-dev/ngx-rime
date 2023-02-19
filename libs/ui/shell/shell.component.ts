import {BooleanInput} from '@angular/cdk/coercion';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostListener,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {MatDrawerMode, MatSidenav} from '@angular/material/sidenav';
import {MatToolbar} from '@angular/material/toolbar';
import {Subject} from 'rxjs';
import {debounceTime, takeUntil, tap} from 'rxjs/operators';

export interface RimeShellLogo {
  src: string;
  alt?: string;
  route?: string;
}
export type RimeToolbarColor = 'primary' | 'accent';
export interface RimeRoutes {
  path?: string;
  icon?: string;
  text?: string;
  children?: RimeRoutes[];
  opened?: boolean;
  divider?: boolean;
}
@Component({
  selector: 'rime-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RimeShellComponent implements OnInit, AfterContentInit, OnDestroy {
  static ngAcceptInputType_elevation: BooleanInput;

  public sidenavOpened = false;
  public fixedSidenavOpened = true;
  public sidenavMode: MatDrawerMode = 'side';
  public hasBackdrop = false;
  public isMobile = false;
  public onScroll$: Subject<Event> = new Subject<Event>();
  private destroy$: Subject<void> = new Subject<void>();

  /**
   * Sets an elevation
   */
  @Input()
  set elevation(value: boolean) {
    this._elevation = value;
    this._changeDetectorRef.detectChanges();
  }
  get elevation(): boolean {
    return this._elevation;
  }
  private _elevation = true;

  /**
   * Sets a sticky header
   */
  @Input()
  set sticky(value: boolean) {
    this._sticky = value;
    this._changeDetectorRef.detectChanges();
  }
  get sticky(): boolean {
    return this._sticky;
  }
  private _sticky = true;

  /**
   * Defines the URL to render the main image
   */
  @Input()
  set logo(value: RimeShellLogo) {
    this._logo = value;
    this._changeDetectorRef.detectChanges();
  }
  get logo(): RimeShellLogo {
    return this._logo;
  }
  private _logo!: RimeShellLogo;

  /**
   * Defines the application name
   */
  @Input()
  set appName(value: string) {
    this._appName = value;
    this._changeDetectorRef.detectChanges();
  }
  get appName(): string {
    return this._appName;
  }
  private _appName = '';

  /**
   * Defines the routes in the top navigation bar
   */
  @Input()
  set topRoutes(value: RimeRoutes[]) {
    this._topRoutes = value;
    this._changeDetectorRef.detectChanges();
  }
  get topRoutes(): RimeRoutes[] {
    return this._topRoutes;
  }
  private _topRoutes!: RimeRoutes[];
  /**
   * Defines the routes in the side navigation bar
   */
  @Input()
  set sideRoutes(value: RimeRoutes[] | null) {
    this._sideRoutes = value;
    this._changeDetectorRef.detectChanges();
  }
  get sideRoutes(): RimeRoutes[] | null {
    return this._sideRoutes;
  }
  private _sideRoutes!: RimeRoutes[] | null;
  /**
   * Shell layout has sidenav
   */
  @Input()
  set hasSidenav(value: boolean) {
    this._hasSidenav = value;
    this._changeDetectorRef.detectChanges();
  }
  get hasSidenav(): boolean {
    return this._hasSidenav;
  }
  private _hasSidenav = false;

  /**
   * Defines the color of the toolbar
   */
  @Input()
  set toolbarColor(value: RimeToolbarColor) {
    this._toolbarColor = value;
    this._changeDetectorRef.detectChanges();
  }
  get toolbarColor(): RimeToolbarColor {
    return this._toolbarColor;
  }
  private _toolbarColor!: RimeToolbarColor;

  @Input() scrolled: Record<string, unknown> = {};
  @Output() scrolledChange: EventEmitter<Record<string, unknown>> = new EventEmitter<
    Record<string, unknown>
  >();
  @ViewChild('sidenav') sidenav!: MatSidenav;
  @ViewChild('rimeToolbar') rimeToolbar!: MatToolbar;

  @HostListener('window:resize')
  onResize() {
    this.ngZone.runOutsideAngular(() => {
      if (window.innerWidth >= 1024) {
        this.sidenavMode = 'side';
        this.sidenavOpened = true;
        this.hasBackdrop = false;
        this.fixedSidenavOpened = true;
        this.isMobile = false;
      } else if (window.innerWidth >= 768) {
        this.sidenavMode = 'side';
        this.sidenavOpened = true;
        this.hasBackdrop = false;
        this.fixedSidenavOpened = false;
        this.isMobile = false;
      } else {
        this.sidenavMode = 'over';
        this.sidenavOpened = false;
        this.hasBackdrop = true;
        this.fixedSidenavOpened = true;
        this.isMobile = true;
      }
      this.updateSidenav();
    });
  }

  constructor(private _changeDetectorRef: ChangeDetectorRef, private ngZone: NgZone) {}

  onScroll(event: Event): void {
    const tasrget = event.target as HTMLElement;
    const onScrollEvent = {
      target: tasrget,
      isScrolled: false,
    };
    if (
      tasrget.scrollTop > (this.rimeToolbar._elementRef.nativeElement as HTMLElement)?.offsetHeight
    ) {
      onScrollEvent.isScrolled = true;
    }
    this.scrolled = onScrollEvent;
    this.scrolledChange.emit(onScrollEvent);
  }
  onClickItem() {
    if (this.sidenavMode === 'over') {
      this.sidenavOpened = false;
    }
  }
  updateSidenav(): void {
    setTimeout(() => {
      if (this.sidenav && this.sidenav._container) {
        this._changeDetectorRef.detectChanges();
        this.sidenav._container.updateContentMargins();
      }
    }, 0);
  }
  toggleFixedSidenav() {
    this.ngZone.runOutsideAngular(() => {
      this.fixedSidenavOpened = !this.fixedSidenavOpened;
      this.updateSidenav();
    });
  }
  ngOnInit(): void {
    this.onResize();
  }
  ngAfterContentInit(): void {
    this.updateSidenav();
    this.onScroll$
      .pipe(
        debounceTime(250),
        tap({next: (event: Event) => this.onScroll(event)}),
        takeUntil(this.destroy$)
      )
      .subscribe();
    setTimeout(() => {
      if (this.sidenav && !this.sidenav._container?._contentMargins.left) {
        this.updateSidenav();
      }
    }, 500);
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

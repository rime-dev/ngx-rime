import {CdkConnectedOverlay} from '@angular/cdk/overlay';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {Subject} from 'rxjs';
import {debounceTime, first, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'rng-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
})
export class SearchInputComponent implements AfterViewInit {
  public isFocused = false;
  private destroy$: Subject<void> = new Subject<void>();
  @ViewChild(CdkConnectedOverlay) cdkConnectedOverlay!: CdkConnectedOverlay;
  constructor() {}
  onFocus(): void {
    this.isFocused = true;
  }
  onBlur(): void {
    this.isFocused = false;
  }
  ngAfterViewInit() {
    this.cdkConnectedOverlay.positionChange
      .pipe(debounceTime(100), takeUntil(this.destroy$))
      .subscribe(() => {
        this.cdkConnectedOverlay.overlayRef.updatePosition();
      });
  }
}

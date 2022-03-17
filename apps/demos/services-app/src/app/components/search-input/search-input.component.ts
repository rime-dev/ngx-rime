import {CdkConnectedOverlay} from '@angular/cdk/overlay';
import {AfterViewInit, Component, NgZone, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {DataService} from '@rng/data-access/base';
import {EntityState} from '@rng/data-access/base/models/base.model';
import {combineLatest, Observable, of, Subject} from 'rxjs';
import {debounceTime, delay, filter, first, map, startWith, takeUntil, tap} from 'rxjs/operators';
import {Project} from '../../models/project.model';

@Component({
  selector: 'rng-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
})
export class SearchInputComponent implements AfterViewInit {
  public isFocused = false;
  public isOverlayOpened = false;
  public recentSearches: any[] = [];
  public searchForm: FormGroup;
  public projectsSearched$: Observable<EntityState<Project>[]> = of([]);
  private destroy$: Subject<void> = new Subject<void>();
  public windowScreenWidth = window.screen.width;
  @ViewChild(CdkConnectedOverlay) cdkConnectedOverlay!: CdkConnectedOverlay;
  constructor(
    private ngZone: NgZone,
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private router: Router
  ) {
    this.searchForm = this.formBuilder.group({
      searchInput: [''],
    });
  }
  onFocus(event: Event): void {
    of(event)
      .pipe(
        tap({
          next: () => {
            this.ngZone.runOutsideAngular(() => {
              this.isFocused = true;
            });
          },
        }),
        delay(100),
        tap({
          next: () => {
            this.ngZone.runOutsideAngular(() => {
              this.isOverlayOpened = true;
            });
          },
        }),
        first()
      )
      .subscribe();
  }
  onBlur(event: Event): void {
    of(event)
      .pipe(
        delay(200),
        tap({
          next: () => {
            this.ngZone.runOutsideAngular(() => {
              this.isOverlayOpened = false;
            });
          },
        }),
        delay(0),
        tap({
          next: () => {
            this.ngZone.runOutsideAngular(() => {
              this.isFocused = false;
            });
          },
        }),
        first()
      )
      .subscribe();
  }
  goToItem(id: string) {
    this.clearSearch();
    void this.router.navigate(['../dashboard/projects/project-view', id]);
  }
  clearSearch() {
    this.searchForm.controls.searchInput.setValue('');
  }
  ngAfterViewInit() {
    this.projectsSearched$ = combineLatest([
      this.searchForm.controls.searchInput.valueChanges.pipe(startWith('')),
      this.dataService.select<Project>('Project').entities$,
    ]).pipe(
      debounceTime(150),
      map((combine) =>
        combine[1].filter((project) =>
          combine[0].length > 0
            ? project.data.title.toLowerCase().includes(combine[0].toLowerCase())
            : true
        )
      ),
      takeUntil(this.destroy$)
    );
    this.cdkConnectedOverlay.positionChange
      .pipe(debounceTime(100), takeUntil(this.destroy$))
      .subscribe(() => {
        this.cdkConnectedOverlay.overlayRef.updatePosition();
      });
  }
}

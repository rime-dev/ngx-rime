import {Injectable} from '@angular/core';
import {AngularFireStorageReference, AngularFireUploadTask} from '@angular/fire/compat/storage';
import {DomSanitizer} from '@angular/platform-browser';
import {asyncScheduler, BehaviorSubject, interval, of} from 'rxjs';
import {
  debounceTime,
  delay,
  filter,
  map,
  switchMap,
  take,
  takeUntil,
  tap,
  throttleTime,
} from 'rxjs/operators';

@Injectable()
export class StorageMockService {
  public percentage$: BehaviorSubject<number | undefined> = new BehaviorSubject<number | undefined>(
    undefined
  );
  public downloadURL$: BehaviorSubject<string | undefined> = new BehaviorSubject<
    string | undefined
  >(undefined);
  public task!: AngularFireUploadTask;
  public reference!: AngularFireStorageReference;

  constructor(private domSanitizer: DomSanitizer) {
    this.percentage$ = new BehaviorSubject<number | undefined>(undefined);
    this.downloadURL$ = new BehaviorSubject<string | undefined>(undefined);
  }

  getDownloadURLFromReference() {
    return this.reference
      .getDownloadURL()
      .pipe(take(1), tap({next: (downloadURL: string) => this.downloadURL$.next(downloadURL)}));
  }
  uploadDocument(path: string, file: File) {
    const percentageFake = interval(50).pipe(
      take(101),
      throttleTime(10, asyncScheduler, {trailing: true})
    );
    const result = window.URL.createObjectURL(file);
    const satinizedResult = this.domSanitizer.bypassSecurityTrustUrl(result);
    this.reference = {
      getDownloadURL: () => of(satinizedResult),
    } as AngularFireStorageReference;
    this.task = {
      percentageChanges: () => percentageFake,
    } as AngularFireUploadTask;
    this.task.percentageChanges().subscribe((v) => {
      this.percentage$.next(v);
    });
    return of(satinizedResult);
  }
}

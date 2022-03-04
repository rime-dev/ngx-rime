import {Injectable} from '@angular/core';
import {AngularFireStorageReference, AngularFireUploadTask} from '@angular/fire/compat/storage';
import {asyncScheduler, BehaviorSubject, interval, of, Subject} from 'rxjs';
import {finalize, take, tap, throttleTime} from 'rxjs/operators';

@Injectable()
export class StorageMockService {
  public percentage$: BehaviorSubject<number | undefined>;
  public downloadURL$: BehaviorSubject<string | undefined>;
  public task: AngularFireUploadTask | undefined;
  public reference: AngularFireStorageReference | undefined;
  constructor() {
    this.percentage$ = new BehaviorSubject<number | undefined>(undefined);
    this.downloadURL$ = new BehaviorSubject<string | undefined>(undefined);
  }

  restartBehavior() {
    this.percentage$.next(undefined);
    this.downloadURL$.next(undefined);
    this.task = undefined;
    this.reference = undefined;
  }
  getDownloadURLFromReference() {
    return this.reference
      ?.getDownloadURL()
      .pipe(take(1), tap({next: (downloadURL: string) => this.downloadURL$.next(downloadURL)}));
  }

  private isFileImage(file: File) {
    return file && file.type.split('/')[0] === 'image';
  }

  uploadDocument(path: string, file: File) {
    const result$ = new Subject();

    const percentageFake = interval(25).pipe(
      take(101),
      throttleTime(10, asyncScheduler, {trailing: true})
    );

    this.reference = {
      getDownloadURL: () => of(window.URL.createObjectURL(file)),
    } as AngularFireStorageReference;

    this.task = {
      percentageChanges: () => percentageFake,
    } as AngularFireUploadTask;

    this.task
      .percentageChanges()
      .pipe(
        tap({next: (v) => this.percentage$.next(v)}),
        finalize(() => {
          result$.next(window.URL.createObjectURL(file));
          result$.complete();
        })
      )
      .subscribe();

    return result$.asObservable();
  }
  deleteDocument(path: string) {
    const result$ = new Subject();
    return result$.asObservable();
  }
}

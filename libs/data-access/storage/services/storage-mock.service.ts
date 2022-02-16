import {Injectable} from '@angular/core';
import {AngularFireStorageReference, AngularFireUploadTask} from '@angular/fire/compat/storage';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {asyncScheduler, BehaviorSubject, interval, of, ReplaySubject, Subject} from 'rxjs';
import {finalize, take, tap, throttleTime} from 'rxjs/operators';

@Injectable()
export class StorageMockService {
  public percentage$: BehaviorSubject<number | undefined>;
  public downloadURL$: BehaviorSubject<string | undefined>;
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

  private isFileImage(file: File) {
    return file && file.type.split('/')[0] === 'image';
  }
  private satinizeImage(file: File) {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(file));
  }

  uploadDocument(path: string, file: File) {
    const result$ = new Subject();

    const percentageFake = interval(25).pipe(
      take(101),
      throttleTime(10, asyncScheduler, {trailing: true})
    );

    const satinizedResult = this.satinizeImage(file);

    this.reference = {
      getDownloadURL: () => of(satinizedResult),
    } as AngularFireStorageReference;

    this.task = {
      percentageChanges: () => percentageFake,
    } as AngularFireUploadTask;

    this.task
      .percentageChanges()
      .pipe(
        tap({next: (v) => this.percentage$.next(v)}),
        finalize(() => {
          result$.next(satinizedResult);
          result$.complete();
        })
      )
      .subscribe();

    return result$.asObservable();
  }
}

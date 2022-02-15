import {Injectable} from '@angular/core';
import {AngularFireStorageReference, AngularFireUploadTask} from '@angular/fire/compat/storage';
import {BehaviorSubject, of} from 'rxjs';
import {take, takeUntil, tap} from 'rxjs/operators';

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

  constructor() {
    this.percentage$ = new BehaviorSubject<number | undefined>(undefined);
    this.downloadURL$ = new BehaviorSubject<string | undefined>(undefined);
  }

  getDownloadURLFromReference() {
    return this.reference
      .getDownloadURL()
      .pipe(take(1), tap({next: (downloadURL: string) => this.downloadURL$.next(downloadURL)}));
  }
  uploadDocument(path: string, file: File) {
    this.reference = {
      getDownloadURL: () => of(file.text()),
    } as AngularFireStorageReference;
    this.task = {
      percentageChanges: () => of(100),
    } as AngularFireUploadTask;
    this.task
      .percentageChanges()
      .pipe(takeUntil(this.downloadURL$.asObservable()))
      .subscribe(this.percentage$.next);
    return of(file.text());
  }
}

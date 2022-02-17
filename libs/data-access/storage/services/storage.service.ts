import {Injectable} from '@angular/core';
import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask,
} from '@angular/fire/compat/storage';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {BehaviorSubject} from 'rxjs';
import {take, takeUntil, tap} from 'rxjs/operators';
@Injectable()
export class StorageService {
  public percentage$: BehaviorSubject<number | undefined>;
  public downloadURL$: BehaviorSubject<string | undefined>;

  public task: AngularFireUploadTask | undefined;
  public reference: AngularFireStorageReference | undefined;

  constructor(private angularFireStorage: AngularFireStorage) {
    this.percentage$ = new BehaviorSubject<number | undefined>(undefined);
    this.downloadURL$ = new BehaviorSubject<string | undefined>(undefined);
  }
  restartBehavior() {
    this.percentage$.next(undefined);
    this.downloadURL$.next(undefined);
    this.task = undefined;
    this.reference = undefined;
  }
  private isFileImage(file: File) {
    return file && file.type.split('/')[0] === 'image';
  }

  getDownloadURLFromReference() {
    return this.reference
      ?.getDownloadURL()
      .pipe(take(1), tap({next: (downloadURL: string) => this.downloadURL$.next(downloadURL)}));
  }
  uploadDocument(path: string, file: File) {
    this.reference = this.angularFireStorage.ref(path);
    this.task = this.angularFireStorage.upload(path, file);
    this.task
      .percentageChanges()
      .pipe(takeUntil(this.downloadURL$.asObservable()))
      .subscribe(this.percentage$.next);
    return this.task.snapshotChanges();
  }
}

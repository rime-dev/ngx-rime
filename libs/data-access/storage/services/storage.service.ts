import {Injectable} from '@angular/core';
import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask,
} from '@angular/fire/compat/storage';
import {BehaviorSubject} from 'rxjs';
import {take, takeUntil, tap} from 'rxjs/operators';
@Injectable()
export class StorageService {
  public percentage$: BehaviorSubject<number | undefined> = new BehaviorSubject<number | undefined>(
    undefined
  );
  public downloadURL$: BehaviorSubject<string | undefined> = new BehaviorSubject<
    string | undefined
  >(undefined);
  public task!: AngularFireUploadTask;
  public reference!: AngularFireStorageReference;

  constructor(private angularFireStorage: AngularFireStorage) {
    this.percentage$ = new BehaviorSubject<number | undefined>(undefined);
    this.downloadURL$ = new BehaviorSubject<string | undefined>(undefined);
  }

  getDownloadURLFromReference() {
    return this.reference
      .getDownloadURL()
      .pipe(take(1), tap({next: (downloadURL: string) => this.downloadURL$.next(downloadURL)}));
  }
  uploadDocument(document: string, path: string, file: File) {
    this.reference = this.angularFireStorage.ref(path + '/' + document);
    this.task = this.angularFireStorage.upload(path + '/' + document, file);
    this.task
      .percentageChanges()
      .pipe(takeUntil(this.downloadURL$.asObservable()))
      .subscribe(this.percentage$.next);
    return this.task.snapshotChanges();
  }
}

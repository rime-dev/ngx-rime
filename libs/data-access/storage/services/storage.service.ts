import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/compat/storage';
import {Observable, of} from 'rxjs';
import {finalize, tap} from 'rxjs/operators';
@Injectable()
export class StorageService {
  public percentage$: Observable<number | undefined>;
  public downloadURL$: Observable<string | undefined>;
  public task!: AngularFireUploadTask;
  constructor(
    private angularFireStorage: AngularFireStorage,
    private angularFirestore: AngularFirestore
  ) {
    this.percentage$ = of(undefined);
    this.downloadURL$ = of(undefined);
  }
  updateDocumentOfCollection(path: string, downloadURL: string | undefined) {
    this.angularFirestore.collection(path).add({downloadURL, path});
  }
  uploadDocument(path: string, file: File) {
    const reference = this.angularFireStorage.ref(path);
    this.task = this.angularFireStorage.upload(path, file);
    this.percentage$ = this.task.percentageChanges();
    return this.task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL$ = reference.getDownloadURL();
        this.downloadURL$.pipe(
          tap({
            next: (downloadURL: string | undefined) =>
              this.updateDocumentOfCollection(path, downloadURL),
          })
        );
      })
    );
  }
}

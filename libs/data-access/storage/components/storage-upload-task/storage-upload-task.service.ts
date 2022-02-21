import {Injectable} from '@angular/core';
import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask,
} from '@angular/fire/compat/storage';
import firebase from 'firebase/compat';
import {Observable, Subject} from 'rxjs';
import {MockStorageReference} from './firebase-reference-mock';

@Injectable()
export class StorageUploadTaskService {
  constructor(private angularFireStorage: AngularFireStorage) {}
  ref(path: string) {
    return this.angularFireStorage.ref(path);
  }
  upload(path: string, file: File) {
    return this.angularFireStorage.upload(path, file);
  }
}

export abstract class StorageMock {
  private static dataURL: string;

  static setURL(value: string) {
    this.dataURL = value;
  }
  static getURL(): string {
    return this.dataURL;
  }
}

@Injectable()
export class StorageUploadTaskMockService extends StorageMock implements AngularFireStorage {
  storage!: any;
  private path!: any;
  private file!: any;

  ref(path: string): AngularFireStorageReference {
    this.path = path;
    const reference = new MockStorageReference(StorageUploadTaskMockService, path, undefined);
    return reference as unknown as AngularFireStorageReference;
  }
  refFromURL(path: string): AngularFireStorageReference {
    throw new Error('Method not implemented.');
  }

  upload(
    path: string,
    data: any,
    metadata?: firebase.storage.UploadMetadata
  ): AngularFireUploadTask {
    this.file = data;
    const angularFireUploadTaskMock = new AngularFireUploadTaskMock(
      path,
      this.file,
      StorageUploadTaskMockService
    );
    return angularFireUploadTaskMock;
  }
}

class AngularFireUploadTaskMock implements AngularFireUploadTask {
  task!: firebase.storage.UploadTask;
  path!: string;
  data: any;
  metadata: any;
  public reader!: FileReader;
  public percentageSubject!: Subject<number>;
  constructor(path: string, data: any, metadata?: any) {
    this.path = path;
    this.data = data;
    this.metadata = metadata;
    this.percentageSubject = new Subject();
    let url: string;
    const reader = new FileReader();
    reader.readAsDataURL(data);
    this.reader = reader;
    reader.onprogress = (event) => {
      const loaded = event.loaded;
      const total = event.total;
      const percentage = Number(((loaded * 100) / total).toFixed());
      this.percentageSubject.next(percentage);
    };
    reader.onload = () => {
      url = String(reader.result);
      this.metadata.setURL(url);
      this.percentageSubject.complete();
    };
  }

  snapshotChanges(): Observable<firebase.storage.UploadTaskSnapshot | any | undefined> {
    return this.percentageSubject.asObservable();
  }
  percentageChanges(): Observable<number | undefined> {
    return this.percentageSubject.asObservable();
  }
  pause(): boolean {
    return false;
  }
  cancel(): boolean {
    this.reader.abort();
    return true;
  }
  resume(): boolean {
    return false;
  }
  then(
    onFulfilled?: ((a: firebase.storage.UploadTaskSnapshot) => any) | null,
    onRejected?: ((a: Error) => any) | null
  ): Promise<any> {
    return new Promise(undefined as any);
  }
  catch(onRejected: (a: Error) => any): Promise<any> {
    return new Promise(undefined as any);
  }
}

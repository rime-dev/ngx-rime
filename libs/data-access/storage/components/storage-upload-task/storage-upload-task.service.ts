/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {Injectable} from '@angular/core';
import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask,
} from '@angular/fire/compat/storage';
import {UploadTask} from '@angular/fire/compat/storage/interfaces';
import {Observable, of, Subject} from 'rxjs';

import firebase from 'firebase/compat';

import {RimeMockStorageReference} from './firebase-reference-mock';

export abstract class RimeStorageMock {
  private static dataURL: string;

  static setURL(value: string) {
    this.dataURL = value;
  }
  static getURL(): string {
    return this.dataURL;
  }
}
@Injectable()
export class RimeStorageUploadTaskService {
  constructor(private angularFireStorage: AngularFireStorage) {}
  ref(path: string) {
    return this.angularFireStorage.ref(path);
  }
  upload(path: string, file: File) {
    return this.angularFireStorage.upload(path, file);
  }
  delete(path: string) {
    return this.angularFireStorage.refFromURL(path).delete();
  }
}

@Injectable()
export class RimeStorageUploadTaskMockService
  extends RimeStorageMock
  implements AngularFireStorage
{
  storage!: never;
  private path!: string;
  private file!: Blob;

  ref(path: string): AngularFireStorageReference {
    this.path = path;
    const reference = new RimeMockStorageReference(
      RimeStorageUploadTaskMockService,
      path,
      undefined
    );
    return reference as unknown as AngularFireStorageReference;
  }
  refFromURL(path: string): AngularFireStorageReference {
    this.path = path;
    const reference = new RimeMockStorageReference(
      RimeStorageUploadTaskMockService,
      path,
      undefined
    );
    return reference as unknown as AngularFireStorageReference;
  }
  upload(
    path: string,
    data: Blob,
    metadata?: firebase.storage.UploadMetadata
  ): AngularFireUploadTask {
    this.file = data;
    const angularFireUploadTaskMock = new AngularFireUploadTaskMock(
      path,
      this.file,
      RimeStorageUploadTaskMockService
    );
    return angularFireUploadTaskMock as AngularFireUploadTask;
  }
  delete(path: string) {
    return of(path);
  }
}

class AngularFireUploadTaskMock implements AngularFireUploadTask {
  task!: UploadTask;
  path!: string;
  data: Blob;
  metadata?: typeof RimeStorageUploadTaskMockService;
  public reader!: FileReader;
  public percentageSubject!: Subject<number>;
  constructor(path: string, data: Blob, metadata?: typeof RimeStorageUploadTaskMockService) {
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
      this.metadata?.setURL(url);
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
    onFulfilled?: ((a: any) => any) | null,
    onRejected?: ((a: Error) => any) | null
  ): Promise<any> {
    return new Promise(undefined as any);
  }
  catch(onRejected: (a: Error) => any): Promise<any> {
    return new Promise(undefined as any);
  }
}

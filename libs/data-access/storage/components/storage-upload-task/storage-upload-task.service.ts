import {Injectable} from '@angular/core';
import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask,
} from '@angular/fire/compat/storage';
import firebase from 'firebase/compat';
import {asyncScheduler, interval, Observable, of} from 'rxjs';
import {take, throttleTime, windowCount} from 'rxjs/operators';
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

@Injectable()
export class StorageMock {
  dataURL!: string;
  constructor() {}
  setURL(value: string) {
    this.dataURL = value;
  }
  getURL(): string {
    return this.dataURL;
  }
}

@Injectable()
export class StorageUploadTaskMockService implements AngularFireStorage {
  storage!: any;
  private path!: any;
  private file!: any;
  constructor(private storageBase: StorageMock) {}

  ref(path: string): AngularFireStorageReference {
    this.path = path;
    const reference = new MockStorageReference(this.storageBase, path, undefined);
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
    // const url = window.URL.createObjectURL(data as Blob);

    //     this.storageBase.setURL(url);
    return new AngularFireUploadTaskMock(path, this.file, this.storageBase);
  }
}

class AngularFireUploadTaskMock implements AngularFireUploadTask {
  task!: firebase.storage.UploadTask;
  path!: string;
  data: any;
  metadata: any;
  public interval$ = interval(25).pipe(
    take(101),
    throttleTime(10, asyncScheduler, {trailing: true})
  );
  constructor(path: string, data: any, metadata?: any) {
    this.path = path;
    this.data = data;
    this.metadata = metadata;
    let url: string;
    setTimeout(() => {
      const reader = new FileReader();
      reader.readAsDataURL(data);
      reader.onload = () => {
        console.log(reader.result);
        url = reader.result as string;
        this.metadata.setURL(url as string);
      };
    }, 0);
  }

  snapshotChanges(): Observable<firebase.storage.UploadTaskSnapshot | any | undefined> {
    return this.interval$;
  }
  percentageChanges(): Observable<number | undefined> {
    return this.interval$;
  }
  pause(): boolean {
    return false;
  }
  cancel(): boolean {
    return false;
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

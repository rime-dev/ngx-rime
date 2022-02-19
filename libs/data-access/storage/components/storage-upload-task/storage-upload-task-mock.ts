import {Directive, EventEmitter, Input, Output} from '@angular/core';
import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask,
  fromTask,
} from '@angular/fire/compat/storage';
import firebase from 'firebase/compat';
import {StringFormat, UploadMetadata} from 'firebase/storage';
import {Observable, of} from 'rxjs';
import {finalize, map} from 'rxjs/operators';

export class angularFireStorage implements AngularFireStorage {
  storage!: firebase.storage.Storage;
  constructor() {
    console.log('angular firestore mock');
  }
  ref(path: string): AngularFireStorageReference {
    return {
      getDownloadURL: () => of(path),
    } as AngularFireStorageReference;
  }
  refFromURL(path: string): AngularFireStorageReference {
    throw new Error('Method not implemented.');
  }
  upload(
    path: string,
    data: any,
    metadata?: firebase.storage.UploadMetadata
  ): AngularFireUploadTask {
    console.log('fffffffffff');

    const ref = createStorageRef(this.ref(path));
    return ref.put(data, metadata);
  }
}

/**
 * Create an AngularFireUploadTask from a regular UploadTask from the Storage SDK.
 * This method creates an observable of the upload and returns on object that provides
 * multiple methods for controlling and monitoring the file upload.
 */
// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function createUploadTask(task: any): AngularFireUploadTask {
  const inner$ = fromTask(task);
  return {
    task,
    then: task.then.bind(task),
    catch: task.catch.bind(task),
    pause: task.pause.bind(task),
    cancel: task.cancel.bind(task),
    resume: task.resume.bind(task),
    snapshotChanges: () => inner$,
    percentageChanges: () =>
      inner$.pipe(map((s: any) => (s.bytesTransferred / s.totalBytes) * 100)),
  };
}

/**
 * Create an AngularFire wrapped Storage Reference. This object
 * creates observable methods from promise based methods.
 */
// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function createStorageRef(ref: any): any {
  return {
    getDownloadURL: () => of(undefined),
    getMetadata: () => of(undefined),
    delete: () => of(undefined),
    child: (path: string) => of(path) as any,
    updateMetadata: (_meta: any) => of(undefined),
    put: (data: any, metadata?: UploadMetadata) => {
      const task = ref.put(data, metadata);
      return createUploadTask(task);
    },
    putString: (_data: string, _format?: StringFormat, _metadata?: UploadMetadata) =>
      of(undefined) as any,
    listAll: () => of(undefined) as any,
  };
}

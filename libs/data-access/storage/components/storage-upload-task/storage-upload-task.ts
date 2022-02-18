import {Directive, EventEmitter, Input, Output} from '@angular/core';
import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask,
  fromTask,
} from '@angular/fire/compat/storage';
import {StringFormat, UploadMetadata} from 'firebase/storage';
import {Observable, of} from 'rxjs';
import {finalize, map} from 'rxjs/operators';

@Directive()
export class StorageUploadTask {
  public task: AngularFireUploadTask | undefined;
  public reference: AngularFireStorageReference | undefined;
  public snapshot$!: Observable<any>;
  public percentage$!: Observable<number | undefined>;
  public isCompleted: boolean;
  @Input() file: File | undefined;
  @Output() finalize: EventEmitter<any> = new EventEmitter<any>();

  constructor(protected angularFireStorage: AngularFireStorage) {
    this.percentage$ = of(0);
    this.isCompleted = false;
  }

  uploadDocument(path: string, file: File): void {
    this.reference = this.angularFireStorage.ref(path); // Reference to storage bucket
    this.task = this.angularFireStorage.upload(path, file); // The main task
    this.percentage$ = this.task.percentageChanges(); // Progress monitoring
    this.snapshot$ = this.task.snapshotChanges().pipe(
      finalize(() => {
        this.reference
          ?.getDownloadURL()
          .toPromise()
          .then((downloadURL) => {
            console.log(downloadURL);
            this.isCompleted = true;
            const document = {
              title: this.file?.name,
              url: downloadURL,
              format: this.file?.type,
            };
            this.finalize.emit(document);
          });
      })
    );
  }
}

@Directive()
export class StorageUploadTaskMock {
  public task: AngularFireUploadTask | undefined;
  public reference: AngularFireStorageReference | undefined;
  public snapshot$!: Observable<any>;
  public percentage$!: Observable<number | undefined>;
  public isCompleted: boolean;
  @Input() file: File | undefined;
  @Output() finalize: EventEmitter<any> = new EventEmitter<any>();

  constructor(protected angularFireStorage: AngularFireStorage) {
    this.percentage$ = of(0);
    this.isCompleted = false;
  }
  public ref(path: string) {
    return {
      getDownloadURL: () => of(path),
    };
  }
  public upload(path: string, data: any, metadata?: UploadMetadata) {
    const ref = createStorageRef(this.reference);
    return ref.put(data, metadata);
  }
  uploadDocument(path: string, file: File): void {
    console.log('MOCK');

    this.reference = this.ref(path) as AngularFireStorageReference; // Reference to storage bucket
    this.task = this.upload(path, file); // The main task
    if (this.task) {
      this.percentage$ = this.task.percentageChanges(); // Progress monitoring
      this.snapshot$ = this.task.snapshotChanges().pipe(
        finalize(() => {
          this.reference
            ?.getDownloadURL()
            .toPromise()
            .then((downloadURL) => {
              console.log(downloadURL);
              this.isCompleted = true;
              const document = {
                title: this.file?.name,
                url: downloadURL,
                format: this.file?.type,
              };
              this.finalize.emit(document);
            });
        })
      );
    }
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

import {
  Component,
  EventEmitter,
  InjectionToken,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask,
} from '@angular/fire/compat/storage';
import {SafeUrl} from '@angular/platform-browser';
import {Observable, of, Subject} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {StorageUploadTaskService} from './storage-upload-task.service';

const STORAGE_UPLOADER_TOKEN = new InjectionToken<StorageUploadTaskComponent>(
  'StorageUploadTaskComponent'
);

@Component({
  selector: 'rng-storage-upload-task',
  templateUrl: './storage-upload-task.component.html',
  styleUrls: ['./storage-upload-task.component.scss'],
  providers: [{provide: STORAGE_UPLOADER_TOKEN, useExisting: StorageUploadTaskComponent}],
})
export class StorageUploadTaskComponent implements OnInit, OnDestroy {
  public satinizedFile$!: Observable<string | SafeUrl | undefined>;
  public satinizedFileSubject: Subject<string | SafeUrl | undefined>;

  public documentUploadedSubject!: Subject<string | undefined>;
  public documentUploaded$!: Observable<string | undefined>;

  private destroy$: Subject<void> = new Subject<void>();

  public task: AngularFireUploadTask | undefined;
  public reference: AngularFireStorageReference | undefined;
  public snapshot$!: Observable<any>;
  public percentage$!: Observable<number | undefined>;
  public isCompleted: boolean;
  @Input() file: File | undefined;
  @Output() finalize: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  get path(): string | undefined {
    return this.internalPath;
  }
  set path(value: string | undefined) {
    this.internalPath = value;
  }
  private internalPath: string | undefined;

  @Input()
  get document(): string | undefined {
    return this.internalDocument;
  }
  set document(value: string | undefined) {
    this.internalDocument = value;
  }
  private internalDocument: string | undefined;

  constructor(private storageUploadService: StorageUploadTaskService) {
    this.documentUploadedSubject = new Subject();
    this.documentUploaded$ = this.documentUploadedSubject.asObservable();
    this.percentage$ = of(0);
    this.isCompleted = false;
    this.satinizedFileSubject = new Subject<string | SafeUrl | undefined>();
    this.satinizedFile$ = this.satinizedFileSubject.asObservable();
  }

  private isFileImage(file: File) {
    return file && file.type.split('/')[0] === 'image';
  }

  ngOnInit() {
    this.startUpload();
  }

  pause() {
    if (!this.task) {
      return;
    }
    this.task.pause();
  }
  resume() {
    if (!this.task) {
      return;
    }
    this.task.resume();
  }
  cancel() {
    if (!this.task) {
      return;
    }
    this.task.cancel();
  }

  startUpload() {
    if (this.file && this.path && this.document) {
      setTimeout(() => {
        // Emits async
        const reader = new FileReader(); // no arguments
        reader.readAsDataURL(this.file as Blob);
        reader.onload = () => {
          const url = reader.result as string;
          this.satinizedFileSubject.next(url);
        };
        this.satinizedFileSubject.next(window.URL.createObjectURL(this.file as Blob));
      }, 0);
      const path = `${this.path}/${this.document}/${Date.now()}_${this.file.name}`;
      this.uploadDocument(path, this.file);
    }
  }
  uploadDocument(path: string, file: File): void {
    this.reference = this.storageUploadService.ref(path); // Reference to storage bucket
    this.task = this.storageUploadService.upload(path, file); // The main task
    this.percentage$ = this.task.percentageChanges(); // Progress monitoring
    this.snapshot$ = this.task.snapshotChanges().pipe(
      finalize(() => {
        this.reference
          ?.getDownloadURL()
          .toPromise()
          .then((downloadURL) => {
            this.isCompleted = true;
            const document = {
              title: file.name,
              url: downloadURL,
              format: file.type,
            };
            this.finalize.emit(document);
          });
      })
    );
  }

  isActive(snapshot: any) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

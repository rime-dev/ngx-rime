import {
  Component,
  EventEmitter,
  InjectionToken,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {AngularFireStorageReference, AngularFireUploadTask} from '@angular/fire/compat/storage';
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
  public objectURL!: string;
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
        const icon = this._checkIconFromComplexFileTypes(this.file as File);
        this.satinizedFileSubject.next(icon);
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
              icon: this._checkIconFromComplexFileTypes(file),
            };
            this.satinizedFileSubject.complete();
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

  private _checkIconFromComplexFileTypes(file: File): string {
    const pdfFormatDocument = /(pdf)$/gi;
    const textFormatDocument =
      /(txt|doc|docx|odt|rtf|tex|text|wpd|ppt|pptx|pps|odp|key|ods|xls|xlsm|xlsx)$/i;
    const imageFormatDocument = /(jpe?g|png|gif|bmp)$/i;
    const compressedFormatDocument = /(7z|arj|deb|pkg|rar|rpm|tar|z|zip|gif)$/gi;
    if (imageFormatDocument.exec(file.name)) {
      return 'image';
    } else if (pdfFormatDocument.exec(file.name)) {
      return 'picture_as_pdf';
    } else if (textFormatDocument.exec(file.name)) {
      return 'article';
    } else if (compressedFormatDocument.exec(file.name)) {
      return 'folder_zip';
    }
    return 'insert_drive_file';
  }
}

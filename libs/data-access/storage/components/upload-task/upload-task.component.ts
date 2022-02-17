import {
  Component,
  EventEmitter,
  InjectionToken,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {SafeUrl} from '@angular/platform-browser';
import {Observable, Subject} from 'rxjs';
import {finalize, takeUntil} from 'rxjs/operators';
import {StorageService} from '../../services/storage.service';

const UPLOADER_TOKEN = new InjectionToken<UploadTaskComponent>('UploadTaskComponent');

@Component({
  selector: 'rng-upload-task',
  templateUrl: './upload-task.component.html',
  styleUrls: ['./upload-task.component.scss'],
  providers: [{provide: UPLOADER_TOKEN, useExisting: UploadTaskComponent}],
})
export class UploadTaskComponent implements OnInit, OnDestroy {
  public percentage$!: Observable<number | undefined>;
  public downloadURL$!: Observable<string | undefined>;
  public satinizedFile$!: Observable<string | SafeUrl | undefined>;
  public satinizedFileSubject: Subject<string | SafeUrl | undefined>;

  public snapshot$!: Observable<any>;
  public isCompleted: boolean;
  private destroy$: Subject<void> = new Subject<void>();

  @Input() file: File | undefined;

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

  @Output() finalize: EventEmitter<string> = new EventEmitter<string>();

  constructor(private storageService: StorageService) {
    // Progress monitoring
    this.percentage$ = this.storageService.percentage$.asObservable();
    // Download URL
    this.downloadURL$ = this.storageService.downloadURL$.asObservable();
    // Satinized file
    this.satinizedFileSubject = new Subject<string | SafeUrl | undefined>();

    this.satinizedFile$ = this.satinizedFileSubject.asObservable();
    this.isCompleted = false;
  }

  ngOnInit() {
    this.startUpload();
  }

  pause() {
    if (!this.storageService.task) {
      return;
    }
    this.storageService.task.pause();
  }
  resume() {
    if (!this.storageService.task) {
      return;
    }
    this.storageService.task.resume();
  }
  cancel() {
    if (!this.storageService.task) {
      return;
    }
    this.storageService.task.cancel();
  }

  startUpload() {
    if (this.file && this.path && this.document) {
      setTimeout(() => {
        // Emits async
        this.satinizedFileSubject.next(window.URL.createObjectURL(this.file as Blob));
      }, 0);
      const path = `${this.path}/${this.document}/${Date.now()}_${this.file.name}`;
      this.snapshot$ = this.storageService.uploadDocument(path, this.file).pipe(
        finalize(() => {
          this.storageService
            .getDownloadURLFromReference()
            ?.toPromise()
            .then(() => {
              this.isCompleted = true;
              console.log(this.storageService.downloadURL$.getValue());

              this.finalize.emit(this.storageService.downloadURL$.getValue());
            });
        }),
        takeUntil(this.destroy$)
      );
      this.snapshot$.subscribe();
    }
  }

  isActive(snapshot: any) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

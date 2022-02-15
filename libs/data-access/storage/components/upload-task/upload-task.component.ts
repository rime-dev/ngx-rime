import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {finalize, takeUntil} from 'rxjs/operators';
import {StorageService} from '../../services/storage.service';

@Component({
  selector: 'rng-upload-task',
  templateUrl: './upload-task.component.html',
  styleUrls: ['./upload-task.component.scss'],
})
export class UploadTaskComponent implements OnInit, OnDestroy {
  public percentage$!: Observable<number | undefined>;
  public downloadURL$!: Observable<string | undefined>;
  public snapshot$!: Observable<any>;

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
  }

  ngOnInit() {
    this.startUpload();
  }

  pause() {
    this.storageService.task.pause();
  }
  resume() {
    this.storageService.task.resume();
  }
  cancel() {
    this.storageService.task.cancel();
  }
  startUpload() {
    if (this.file && this.path && this.document) {
      const path = `${this.path}/${this.document}/${Date.now()}_${this.file.name}`;
      this.snapshot$ = this.storageService.uploadDocument(path, this.file).pipe(
        finalize(() => {
          this.storageService
            .getDownloadURLFromReference()
            .toPromise()
            .then(() => {
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

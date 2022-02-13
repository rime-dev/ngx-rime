import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {StorageService} from '../../services/storage.service';

@Component({
  selector: 'rng-upload-task',
  templateUrl: './upload-task.component.html',
  styleUrls: ['./upload-task.component.scss'],
  providers: [StorageService, AngularFirestore],
})
export class UploadTaskComponent implements OnInit, OnDestroy {
  public percentage$!: Observable<number | undefined>;
  public downloadURL$!: Observable<string | undefined>;
  public snapshot$!: Observable<any>;

  private destroy$: Subject<void> = new Subject<void>();
  @Input() file: File | undefined;
  @Input() path: string | undefined;

  constructor(private storageService: StorageService) {
    // Progress monitoring
    this.percentage$ = this.storageService.percentage$;
    // Download URL
    this.downloadURL$ = this.storageService.downloadURL$;
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
    if (this.file && this.path) {
      const path = `${this.path}/${Date.now()}_${this.file.name}`;
      this.snapshot$ = this.storageService
        .uploadDocument(path, this.file)
        .pipe(takeUntil(this.destroy$));
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

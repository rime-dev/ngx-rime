import {Component, ElementRef, EventEmitter, Inject, Input, Output, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {from} from 'rxjs';
import {finalize, take, tap} from 'rxjs/operators';

@Component({
  selector: 'rng-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss'],
})
export class UploaderComponent {
  public isHovering: boolean;
  public files: File[];
  public uploadedFiles: string[];

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

  @Output() finalize: EventEmitter<any> = new EventEmitter<any>();

  /** Hidden Input file */
  @ViewChild('file', {static: false}) file!: ElementRef<HTMLInputElement>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.isHovering = false;
    this.files = [];
    this.uploadedFiles = [];
    this.path = '';
    this.document = '';
    if (this.data && this.data.path) {
      this.path = this.data.path;
    }
    if (this.data && this.data.document) {
      this.document = this.data.document;
    }
  }
  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  onDrop(files: FileList) {
    this.files = [];
    for (let i = 0; i < files.length; i++) {
      this.files.push(files.item(i) as File);
    }
  }

  onClick() {
    this.file.nativeElement.click();
  }
  onChange($event: Event) {
    this.files = [];
    const files: File[] = [];
    const target = $event.target as HTMLInputElement;
    const fileList = target.files;
    if (fileList) {
      from(fileList)
        .pipe(
          tap({next: (file: File) => files.push(file)}),
          take(fileList.length),
          finalize(() => {
            this.files = [...files];
          })
        )
        .subscribe();
    }
  }
  onFinalize(uploadedFile: string) {
    if (!this.uploadedFiles.includes(uploadedFile)) {
      if (this.uploadedFiles.length < this.files.length) {
        this.uploadedFiles.push(uploadedFile);
      }
      if (this.uploadedFiles.length === this.files.length) {
        this.finalize.emit(this.uploadedFiles);
      }
    }
  }
}

import {Component, ElementRef, EventEmitter, Inject, Input, Output, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

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
    for (let i = 0; i < files.length; i++) {
      this.files.push(files.item(i) as File);
    }
  }

  onClick() {
    this.file.nativeElement.click();
  }
  onChange($event: Event) {
    const target = $event.target as HTMLInputElement;
    const fileList = target.files;
    if (fileList) {
      for (let i = 0; i < fileList.length; i++) {
        this.files.push(fileList.item(i) as File);
      }
    }
  }
  onFinalize(uploadedFile: string) {
    if (!this.uploadedFiles.includes(uploadedFile)) {
      this.uploadedFiles.push(uploadedFile);
      if (this.uploadedFiles.length === this.files.length) {
        this.finalize.emit(this.uploadedFiles);
      }
    }
  }
}

import {Component, ElementRef, Input, ViewChild} from '@angular/core';

@Component({
  selector: 'rng-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss'],
})
export class UploaderComponent {
  public isHovering: boolean;
  public files: File[];
  @Input() path: string;
  /** Hidden Input file */
  @ViewChild('file', {static: false}) file!: ElementRef<HTMLInputElement>;
  constructor() {
    this.isHovering = false;
    this.files = [];
    this.path = '';
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
        console.log(fileList.item(i) as File);

        this.files.push(fileList.item(i) as File);
      }
    }
  }
}

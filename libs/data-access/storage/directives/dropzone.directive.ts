import {Directive, HostListener, Output, EventEmitter} from '@angular/core';

@Directive({
  selector: '[rimeDropzone]',
})
export class RimeDropzoneDirective {
  @Output() dropped = new EventEmitter<FileList>();
  @Output() hovered = new EventEmitter<boolean>();

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer) {
      this.dropped.emit(event.dataTransfer.files);
      this.hovered.emit(false);
    }
  }

  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.hovered.emit(true);
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.hovered.emit(false);
  }
}

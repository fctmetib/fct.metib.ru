import {Directive, EventEmitter, HostBinding, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[mibDrop]'
})
export class DropDirective {

  @Output() fileDropped = new EventEmitter<{files: File[]}>()

  @HostBinding('class.dragging') public fileOver: boolean = false;

  @HostListener('drop', ['$event'])
  private onDrop(event: any) {
    event.preventDefault()
    event.stopPropagation()
    this.fileOver = false;
    if (event.dataTransfer) {
      const files: File[] = Array.from(event.dataTransfer.files)
      if (files.length > 0) {
        this.fileDropped.emit({files});
      }
    }
  }

  @HostListener('dragover', ['$event'])
  private onDragOver(event: any) {
    event.preventDefault()
    event.stopPropagation()
    this.fileOver = true;
  }

  @HostListener('dragleave', ['$event'])
  private onDragLeave(event: any) {
    event.preventDefault()
    event.stopPropagation()
    this.fileOver = false;
  }
}

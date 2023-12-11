import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {FileDnd} from './interfaces/drop-box.interface';
import {DropDirective} from './directives/drop.directive';

@Component({
  selector: 'mib-dnd',
  templateUrl: './mib-drag-and-drop.component.html',
  styleUrls: ['./mib-drag-and-drop.component.scss'],
})
export class MibDragAndDropComponent {
  @ViewChild(DropDirective) dropDirective: DropDirective
  @ViewChild('loader') loader!: ElementRef;
  @Input() headline: string = 'Прикрепите документ'
  @Input() loading: boolean = false;
  @Input() accept: string[] = [];
  @Input() multiple: boolean = false;
  @Output() onLoad = new EventEmitter<void>();
  @Output() onChange = new EventEmitter<FileDnd>();

  public onChangeFile() {
    const files: File[] = Array.from(this.loader.nativeElement.files);
    this.formatFiles(files);
  }

  public openFileManager() {
    if (!this.loading) {
      this.loader.nativeElement.click();
      this.loader.nativeElement.value = '';
    }
  }

  private formatFiles(files: File[]) {
    this.onLoad.emit();

    files.forEach((file: File) => {
      if (!this.accept.includes(file.type)) return console.warn(this.accept, 'Поддерживаются, но передан', file.type);

      const reader = new FileReader();
      reader.onload = () => {
        const value = {file, url: reader.result};
        this.onChange.emit(value);
      };
      reader.readAsDataURL(file);
    });
  }

  public onDrop(data: { files: File[] }) {
    if (!this.loading) {
      this.formatFiles(data.files);
    }
  }
}

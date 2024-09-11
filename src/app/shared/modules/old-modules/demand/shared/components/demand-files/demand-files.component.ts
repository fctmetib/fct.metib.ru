import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import {FileMode} from '../../../../../../types/file/file-model.interface';

@Component({
  selector: 'app-demand-files',
  templateUrl: './demand-files.component.html',
  styleUrls: ['./demand-files.component.scss']
})
export class DemandFilesComponent implements OnInit, OnDestroy {
  @Input()
  public currentDemandFiles: FileMode[] = [];

  @Output()
  removeFile: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit() {
  }

  ngOnDestroy(): void {
  }

  remove(file: FileMode) {
    this.removeFile.emit(file);
  }
}

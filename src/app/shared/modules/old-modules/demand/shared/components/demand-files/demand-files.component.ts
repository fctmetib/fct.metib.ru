import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import {FileModeInterface} from '../../../../../../types/file/file-model.interface';

@Component({
  selector: 'app-demand-files',
  templateUrl: './demand-files.component.html',
  styleUrls: ['./demand-files.component.scss']
})
export class DemandFilesComponent implements OnInit, OnDestroy {
  @Input()
  public currentDemandFiles: FileModeInterface[] = [];

  @Output()
  removeFile: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit() {
  }

  ngOnDestroy(): void {
  }

  remove(file: FileModeInterface) {
    this.removeFile.emit(file);
  }
}

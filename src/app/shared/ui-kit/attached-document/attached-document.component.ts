import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FileMode } from '../../types/file/file-model.interface';
import { BehaviorSubject, catchError, finalize, of, tap } from 'rxjs';
import { downloadBase64File } from '../../services/tools.service';
import { DemandService } from '../../../client/modules/demand-new/services/demand.service';
import {
  FileReadOptions
} from '../../../client/modules/demand-new/modules/demand-drawer/interfaces/demand-drawer.interface';

@Component({
  selector: 'mib-attached-document',
  templateUrl: './attached-document.component.html',
  styleUrls: ['./attached-document.component.scss']
})
export class AttachedDocumentComponent {
  @Output() deleteFile: EventEmitter<number> = new EventEmitter<number>()
  @Input() fileForRead: FileReadOptions;
  @Input() file: FileMode;
  @Input() download = false;
  @Input() remove = false;

  public isDownloading$ = new BehaviorSubject<boolean>(false)
  public isDeleteFile$ = new BehaviorSubject<boolean>(false)

  constructor(
    private demandService: DemandService,
  ) {
  }

  public downloadFile(): void {
    this.isDownloading$.next(true)
    this.demandService
    	.downloadFile(this.file.DemandFileID)
    	.pipe(
        catchError(error => {
          console.error(`Ошибка при скачивании файла "${this.file.FileName}":`, error);
          return of(null);
        }),
    		tap(data => {
    			downloadBase64File(data, this.file.FileName)
    		}),
    		finalize(() => {
    			this.isDownloading$.next(false)
    		})
    	)
    	.subscribe()
  }

  public deleteDemandFileById(demandFileId: number) {
    if (!demandFileId) {
      this.deleteFile.emit()
      return;
    }
    this.isDeleteFile$.next(true)
    this.demandService.deleteDemandFileById(demandFileId)
      .pipe(
        finalize(() => {
          this.isDeleteFile$.next(false)
        })
      )
      .subscribe(res => {
        this.deleteFile.emit()
      })
  }
}

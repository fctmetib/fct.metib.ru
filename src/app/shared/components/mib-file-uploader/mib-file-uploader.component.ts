import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Guid } from 'src/app/shared/classes/common/guid.class';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { FileService } from 'src/app/shared/services/common/file.service';
import { FileModeInterface } from 'src/app/shared/types/file/file-model.interface';
import { MibFileErrorDialogComponent } from '../mib-file-error-dialog/mib-file-error-dialog.component';

@Component({
  selector: 'mib-file-uploader',
  styleUrls: ['./mib-file-uploader.component.scss'],
  template: `
    <div class="addon-button mb-20">
      <div class="action-box">
        <div class="addon-text">
          <p>{{ title }}</p>
        </div>
        <div class="mib-uploader">
          <input
            type="file"
            id="{{ type }}"
            (change)="onSelect($event)"
            multiple="true"
            hidden
          />
          <label for="{{ type }}" class="mib-upload"
            ><i class="pi pi-paperclip mr-20"></i> Выбрать файлы</label
          >
        </div>
      </div>
      <div class="progress">
        <p-progressBar
          *ngIf="fileUploadProgress.isProgress == true"
          styleClass="mib-progress"
          [value]="fileUploadProgress.progress"
          showValue="false"
        ></p-progressBar>
      </div>
    </div>
    <div class="mib-uploader__error" *ngIf="required && isFileInvalid()">
      <small class="p-error"> Необходимо загрузить документ </small>
    </div>

    <div *ngIf="currentFiles.length">
      <ng-container *ngFor="let file of currentFiles">
        <div class="addon-button mb-10">
          <div class="action-box">
            <div class="addon-text">
              <p>
                {{ file.FileName }}
              </p>
            </div>
            <div class="mib-uploader">
              <div class="mib-upload-warn" (click)="removeFile(file)">
                Удалить
              </div>
            </div>
          </div>
        </div>
      </ng-container>
    </div>
  `,
})
export class MibFileUploaderComponent implements OnInit {
  @Input()
  title: string;

  @Input()
  type: string;

  @Input()
  required: boolean = true;

  @Input()
  existFile: FileModeInterface[] = [];

  @Output()
  remove = new EventEmitter<any>();

  @Output()
  add = new EventEmitter<any>();

  public currentFiles = [];
  private refMibFileErrorDialog: DynamicDialogRef;

  public fileUploadProgress = {
    progress: 0,
    isProgress: false,
  };
  private subscription$: Subscription = new Subscription();

  constructor(
    private commonService: CommonService,
    private fileService: FileService,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.fillCurrentFiles();
  }

  public isFileInvalid(): boolean {
    let isInvalid = false;

    if (this.currentFiles.length > 0) {
      isInvalid = false;
    } else {
      isInvalid = true;
    }

    return isInvalid;
  }

  public removeFile(file: FileModeInterface) {
    this.currentFiles = this.currentFiles.filter((x) => x !== file);
    this.remove.emit(file);
    this.resetFileInputs();
  }

  public onSelect(event) {
    let files: File[] = event.target.files;

    for (let file of files) {
      this.resetLoader();
      let guid = Guid.newGuid();

      this.subscription$.add(
        this.commonService
          .getBase64(file)
          .pipe(
            switchMap((res) => {
              return this.fileService.uploadFileChunks(
                res,
                file.name,
                file.size.toString(),
                guid
              );
            })
          )
          .subscribe(
            (res: any) => {
              switch (res.type) {
                // загружается
                case 1:
                  const progressResult = Math.round(
                    (100 * res.loaded) / res.total
                  );

                  this.fileUploadProgress = {
                    progress: progressResult,
                    isProgress: true,
                  };
                  break;
                case 2:
                  if (!res.ok) {
                    // TODO: показать ошибку
                    this.openErrorDialog();
                  }
                  break;
                // получил результат
                case 4:
                  let file = {
                    Code: res.body.Code,
                    FileName: res.body.FileName,
                    ID: res.body.ID,
                    Size: res.body.Size,
                    Identifier: this.type,
                  };
                  this.currentFiles.push(file);
                  this.add.emit(file);
                  this.resetLoader();
                  break;
                default:
                  break;
              }
            },
            (err) => {
              console.log(err);
            }
          )
      );
    }
  }

  private resetLoader() {
    this.fileUploadProgress = {
      progress: 0,
      isProgress: false,
    };
  }

  private resetFileInputs() {
    (<HTMLInputElement>document.getElementById(this.type)).value = '';
  }

  private openErrorDialog() {
    if (!this.refMibFileErrorDialog) {
      this.refMibFileErrorDialog = this.dialogService.open(
        MibFileErrorDialogComponent,
        {
          header: 'Ошибка',
          width: '976px',
          contentStyle: { 'max-height': '677px', overflow: 'auto' },
          baseZIndex: 10000,
        }
      );

      this.subscription$.add(
        this.refMibFileErrorDialog.onClose.subscribe(() => {
          this.refMibFileErrorDialog = null;
        })
      );
    }
  }

  private fillCurrentFiles() {
    this.existFile.forEach(file => {
      if (file.Identifier === this.type) {
        this.currentFiles.push(file);
      }
    });
  }
}

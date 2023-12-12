import {DoDemandPageActionType} from '../../../types/navigation-service/do-demand-page-action-type';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FileModeInterface} from 'src/app/shared/types/file/file-model.interface';
import {CommonService} from 'src/app/shared/services/common/common.service';
import {FileService} from 'src/app/shared/services/common/file.service';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {switchMap} from 'rxjs/operators';
import {Guid} from 'src/app/shared/classes/common/guid.class';
import {DemandNavigationService} from '../../../services/demand-navigation.service';
import {DoDemandActionInterface} from '../../../types/navigation-service/do-demand-action.interface';
import {CreateDemandMessageRequestInterface} from '../../../types/requests/create-demand-message-request.interface';
import {FactoringInfo} from '../../../../../../shared/modules/old-modules/demand/types/common/factoring/factoring.info';

@Component({
  selector: 'demand-info',
  templateUrl: './demand-info.component.html',
  styleUrls: ['./demand-info.component.scss'],
})
export class DemandInfoComponent implements OnInit, OnDestroy {
  public currentDemandInfo: FactoringInfo;

  public selectedStepIndex = 0;

  public files: FileModeInterface[] = [];
  public items: MenuItem[] = [];

  public form: FormGroup;

  constructor(
    private commonService: CommonService,
    private fileService: FileService,
    private _demandNavigationService: DemandNavigationService
  ) {
  }

  ngOnInit() {
    this._initValues();
    this._initForm();
  }

  ngOnDestroy(): void {
  }

  public getType(type: string): string {
    let result: string = '';
    switch (type) {
      case 'VerificationChannel':
        result = 'Запрос на Регистрацию канала верификации';
        break;
      case 'Guarantee':
        result = 'Запрос на Поручительство';
        break;
      case 'Factoring':
        result = 'Запрос на Факторинг';
        break;
      case 'DigitalSignature':
        result = 'Запрос на ЭЦП';
        break;
      case 'ProfileChange':
        result = 'Запрос на Редактирование Профиля';
        break;
      case 'Question':
        result = 'Запрос на свободную тему';
        break;
      case 'Limit':
        result = 'Запрос на лимит';
        break;
      case 'NewDebtor':
        result = 'Запрос на нового дебитора';
        break;
      case 'AgencyFactoring':
        result = 'Запрос на Агентский Факторинг';
        break;
      default:
        result = 'Запрос на свободную тему';
        break;
    }
    return result;
  }

  public getStatus(status: string): string {
    let result: string = '';
    switch (status) {
      case 'Created':
        result = 'Создан';
        break;
      case 'Completed':
        result = 'Завершен';
        break;
      case 'Processing':
        result = 'В процессе';
        break;
      case 'Rejected':
        result = 'Отклонено';
        break;
      case 'Draft':
        result = 'Черновик';
        break;
      case 'Canceled':
        result = 'Отменен';
        break;
    }
    return result;
  }

  public removeFile(file: FileModeInterface): void {
    this.files = this.files.filter((x) => x !== file);
  }

  onSelect(event, type: string) {
    let files: File[] = event.target.files;

    for (let file of files) {
      let guid = Guid.newGuid();

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
            this.files = [];
            switch (res.type) {
              // загружается
              case 1:
                // const progressResult = Math.round((100 * res.loaded) / res.total)
                // this.fileUploadProgress = {
                //  progress: progressResult,
                //  type
                // }
                break;
              // получил результат
              case 4:
                this.files.push({
                  Code: res.body.Code,
                  FileName: res.body.FileName,
                  ID: res.body.ID,
                  Size: res.body.Size,
                  Identifier: type,
                });
                break;
            }
          },
          (err) => console.log(err)
        );
    }
  }

  onSubmit() {
    let fileCode = null;
    if (this.files[0]) fileCode = this.files[0].Code;

    let data: CreateDemandMessageRequestInterface = {
      Comment: this.form.value.message,
      FileCode: fileCode,
    };

    this.form.reset();
    this.files = [];

    const doActionData: DoDemandActionInterface = {
      data: data,
      type: DoDemandPageActionType.SEND_MESSAGE,
    };
    this._demandNavigationService.setDoDemandAction(doActionData);
  }

  private _initValues(): void {
    this._demandNavigationService.currentDemandInfoData$.subscribe(
      (demandData) => {
        this.currentDemandInfo = demandData;
        demandData.Steps.forEach((s) => {
          this.items.push({
            label: s.Title,
          });

          if (s.IsCompleted) this.selectedStepIndex = s.Position--;
        });
      }
    );
  }

  private _initForm(): void {
    this.form = new FormGroup({
      message: new FormControl('', [Validators.required]),
    });
  }
}

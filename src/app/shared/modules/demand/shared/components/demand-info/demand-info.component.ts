import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FileModeInterface } from 'src/app/shared/types/file/file-model.interface';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { FileService } from 'src/app/shared/services/common/file.service';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { switchMap } from 'rxjs/operators';
import { Guid } from 'src/app/shared/classes/common/guid.class';
import { FactoringInfoInterface } from 'src/app/shared/modules/demand/types/common/factoring/factoring-info.interface';
import { CreateDemandMessageRequestInterface } from 'src/app/shared/modules/demand/types/requests/create-demand-message-request.interface';

@Component({
  selector: 'app-demand-info',
  templateUrl: './demand-info.component.html',
  styleUrls: ['./demand-info.component.scss'],
})
export class DemandInfoComponent implements OnInit, OnDestroy {
  @Input()
  currentDemandInfo: FactoringInfoInterface;

  @Output()
  sendMessage: EventEmitter<any> = new EventEmitter<any>();

  public selectedStepIndex = 0;

  public files: FileModeInterface[] = [];
  public items: MenuItem[] = [];

  public form: FormGroup;

  constructor(
    private commonService: CommonService,
    private fileService: FileService
  ) {}

  ngOnInit() {
    this.currentDemandInfo.Steps.forEach((s) => {
      this.items.push({
        label: s.Title,
      });

      if (s.IsCompleted) this.selectedStepIndex = s.Position--;
    });

    this.form = new FormGroup({
      message: new FormControl('', [Validators.required]),
    });
  }

  ngOnDestroy(): void {}

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

  //TODO: ADD

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
          (res) => {
            this.files = [];
            this.files.push({
              Code: res.Code,
              FileName: res.FileName,
              ID: res.ID,
              Size: res.Size,
              Identifier: type,
            });
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
    this.sendMessage.emit(data);
  }
}

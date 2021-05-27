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
  selector: 'app-factoring-info',
  templateUrl: './factoring-info.component.html',
  styleUrls: ['./factoring-info.component.scss'],
})
export class FactoringInfoComponent implements OnInit, OnDestroy {
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
      message: new FormControl('', [Validators.required])
    })
  }

  ngOnDestroy(): void {}

  public getType(type: string): string {
    let result: string = '';
    switch (type) {
      case 'Factoring':
        result = 'Запрос на факторинг';
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
    }
    return result;
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
            console.log(res);
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
    let file = null;
    if(this.files)
      file = this.files[0];

    let data: CreateDemandMessageRequestInterface = {
      Comment: this.form.value.message,
      FileCode: file.Code
    };

    this.sendMessage.emit(data);
  }
}

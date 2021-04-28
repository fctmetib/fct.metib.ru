import { DebtorInterface } from './../../../types/debtor-interface';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Guid } from 'src/app/shared/classes/common/guid.class';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { FileService } from 'src/app/shared/services/common/file.service';
import { FileModeInterface } from 'src/app/shared/types/file/file-model.interface';
import { DemandService } from '../../../services/demand.service';
import { SaveDemandRequestInterface } from '../../../types/requests/save-demand-request.interface';

@Component({
  selector: 'app-demand-action-debitor-page',
  templateUrl: './demand-action-debitor-page.component.html',
  styleUrls: ['./demand-action-debitor-page.component.scss'],
})
export class DemandActionDebitorPageComponent implements OnInit {
  isUserVerified: boolean;

  public alert: boolean;
  public alertMessage: string;

  public formFree: FormGroup;

  public files: FileModeInterface[] = [];

  private currentDraftId: number = 0;

  public isLoading: boolean = false;
  public debtors: DebtorInterface[] = [];

  public isNewDebtor: boolean = false;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private demandService: DemandService,
    private commonService: CommonService,
    private messageService: MessageService,
    private fileService: FileService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.isUserVerified = this.authService.isUserVerified();
    this.initForm();

    this.route.queryParams.subscribe((params: Params) => {
      if (params['ID']) {
        this.demandService.getDemandById(params['ID']).subscribe((resp) => {});
      }
      if (params['DraftId']) {
        this.currentDraftId = params['DraftID'];
      }
    });

    setInterval(() => this.saveDraft(), 30000);

    this.demandService.getDebtors().subscribe((resp) => {
      this.debtors = resp;
    });
  }

  public debtorChange() {
    let selectedDebtor = this.debtors.find(
      (x) => x.ID === this.formFree.value.Id
    );
    if (!selectedDebtor) {
      this.isNewDebtor = true;
    } else {
      this.isNewDebtor = false;
    }
  }

  ngOnDestroy() {}

  public onSubmit() {
    this.isLoading = true;
    let data: SaveDemandRequestInterface<any> = this.prepareData();

    this.demandService.add(data).subscribe((resp) => {
      this.alert = true;
      this.alertMessage = 'Запрос успешно создан.';
      this.isLoading = false;
    });
  }

  //#region private logic
  saveDraft() {
    this.demandService
      .addDraftById(this.currentDraftId, this.prepareDraft())
      .subscribe(
        (resp) => {
          console.log(resp);
          this.currentDraftId = resp.ID;
          this.showSuccess();
        },
        (error) => {
          this.showWarn();
        }
      );
  }

  private prepareDraft() {
    let result = this.prepareCoreData();
    return result;
  }

  private prepareData() {
    let result: SaveDemandRequestInterface<any> = {
      Data: this.prepareCoreData(),
      DraftID: this.currentDraftId,
    };

    return result;
  }

  private prepareCoreData() {
    if (this.isNewDebtor) {
      let data = {
        ID: 0,
        INN: this.formFree.value.INN,
        IsNew: true,
        Title: this.formFree.value.Id,
        Files: this.files,
        Type: 'NewDebtor',
      };
      return data;
    } else {
      if (this.formFree.value.Id) {
        let debtor = this.debtors.find((x) => x.ID === this.formFree.value.Id);
        let data = {
          ID: debtor.ID,
          INN: debtor.Inn,
          IsNew: false,
          Title: debtor.Title,
          Files: this.files,
          Type: 'NewDebtor',
        };
        return data;
      }
    }
  }

  private initForm(): void {
    this.formFree = this.fb.group({
      Id: [0, [Validators.required]],
      INN: [''],
    });

    this.formFree.markAllAsTouched();
    this.formFree.markAsDirty();
  }

  private showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Успешно',
      detail: 'Черновик успешно сохранен!',
    });
  }

  private showWarn() {
    this.messageService.add({
      severity: 'warn',
      summary: 'Ошибка',
      detail: 'При сохранении Черновика произошла ошибка.',
    });
  }
  //#endregion

  //#region files
  public removeFile(file: FileModeInterface) {
    this.files.splice(
      this.files.indexOf(this.files.find((x) => x === file)),
      1
    );
  }

  onSelect(event, type: string) {
    let files: File[] = event.target.files;

    for (let file of files) {
      let guid = Guid.newGuid();

      this.commonService.getBase64(file).subscribe((res) => {
        this.fileService
          .uploadFileChunks(res, file.name, file.size.toString(), guid)
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
      });
    }
  }

  //#endregion
}

import { DebtorInterface } from './../../../types/debtor-interface';
import { Component, OnInit, OnDestroy } from '@angular/core';
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
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CreateDemandMessageRequestInterface } from '../../../types/requests/create-demand-message-request.interface';
import { FactoringInfoInterface } from '../../../types/common/factoring/factoring-info.interface';
import { ExitGuard } from 'src/app/shared/services/exit.guard';

@Component({
  selector: 'app-demand-action-debitor-page',
  templateUrl: './demand-action-debitor-page.component.html',
  styleUrls: ['./demand-action-debitor-page.component.scss'],
})
export class DemandActionDebitorPageComponent implements OnInit, OnDestroy, ExitGuard {

  public isEdit: boolean = false;
  public currentDemand: any;
  public currentInformation: FactoringInfoInterface;
  private currentDraftId: number = 0;

  public isUserVerified: boolean;

  public alert: boolean;
  public errorAlert: boolean;

  public alertMessage: string;
  public errorMessage: string;

  public formFree: FormGroup;

  public files: FileModeInterface[] = [];

  public isLoading: boolean = false;
  public debtors: DebtorInterface[] = [];

  public isNewDebtor: boolean = false;

  private _saveDraftAction$: NodeJS.Timeout;
  private subscription$: Subscription = new Subscription();

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

    this.subscription$.add(
      this.route.queryParams.subscribe((params: Params) => {
        if (params['ID']) {
          this.fetch(params['ID']);
        }
        if (params['DraftId']) {
          this.currentDraftId = params['DraftID'];
        }
      })
    );

    this._saveDraftAction$ = setInterval(() => this.saveDraft(), 30000);

    this.subscription$.add(
      this.demandService.getDebtors().subscribe((resp) => {
        this.debtors = resp;
      })
    );
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

  ngOnDestroy() {
    this.subscription$.unsubscribe();
    if (this._saveDraftAction$) {
      clearInterval(this._saveDraftAction$);
    }
  }

  handleSendMessage(event: CreateDemandMessageRequestInterface) {
    this.subscription$.add(
      this.demandService
        .addMessageByDemandId(this.currentDemand.ID, event)
        .subscribe((resp) => {
          this.fetch(this.currentDemand.ID);
        })
    );
  }

  handleRemoveFile(file: FileModeInterface) {
    this.currentDemand.Files = this.currentDemand.Files.filter(x => x !== file)
  }

  private fetch(id: number) {
    this.subscription$.add(
      this.demandService.getDemandById(id).subscribe((resp) => {
        this.currentDemand = resp;
        this.currentInformation = {
          ID: resp.ID,
          Messages: resp.Messages,
          DateCreated: resp.DateCreated,
          DateModify: resp.DateModify,
          DateStatus: resp.DateStatus,
          Steps: resp.Steps,
          Status: resp.Status,
          Type: resp.Type,
          Manager: null,
        };
        console.log(this.currentDemand);
        this.isEdit = true;
        this.convertToFormData();
      })
    );
  }

  private convertToFormData() {
    let data = this.currentDemand.Data;
    this.formFree.patchValue({
      Id: +data.ID,
      inn: data.INN,
    });
  }

  public onSubmit() {
    this.resetAlerts();

    if (this.isNewDebtor) {
      if (this.files.length < 1) {
        this.errorAlert = true;
        this.errorMessage =
          'Для добавления нового дебитора необходимо прикрепить файл.';
        return;
      }
    }

    this.isLoading = true;
    let data: SaveDemandRequestInterface<any> = this.prepareData();

    this.subscription$.add(
      this.demandService.add(data).subscribe((resp) => {
        this.alert = true;
        this.alertMessage = 'Запрос успешно создан.';
        this.isLoading = false;
      })
    );
  }

  //#region private logic
  saveDraft() {
    this.subscription$.add(
      this.demandService
        .addDraftById(this.currentDraftId, this.prepareDraft())
        .subscribe((resp) => {
          console.log(resp);
          this.currentDraftId = resp.ID;
          this.showSuccess();
        })
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
        let debtor = this.debtors.find((x) => x.ID === +this.formFree.value.Id);
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
          )
      );
    }
  }

  private resetAlerts() {
    this.alert = false;
    this.alertMessage = '';
    this.errorAlert = false;
    this.errorMessage = '';
  }
  //#endregion
  canDeactivate(): boolean | Observable<boolean> {
    return confirm('Внимание! Возможно, Вы не сохранили данные, хотите покинуть страницу?');
  }

}

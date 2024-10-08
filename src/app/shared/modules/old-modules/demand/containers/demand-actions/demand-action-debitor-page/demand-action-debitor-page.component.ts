import { DebtorInterface } from './../../../types/debtor-interface';
import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Guid } from 'src/app/shared/classes/common/guid.class';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { FileService } from 'src/app/shared/services/common/file.service';
import { FileMode } from 'src/app/shared/types/file/file-model.interface';
import { DemandService } from '../../../services/demand.service';
import { SaveDemandRequestInterface } from '../../../types/requests/save-demand-request.interface';
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CreateDemandMessageRequestInterface } from '../../../types/requests/create-demand-message-request.interface';
import { FactoringInfo } from '../../../types/common/factoring/factoring.info';
import { ExitGuard } from 'src/app/shared/services/exit.guard';

@Component({
  selector: 'app-demand-action-debitor-page',
  templateUrl: './demand-action-debitor-page.component.html',
  styleUrls: ['./demand-action-debitor-page.component.scss'],
})
export class DemandActionDebitorPageComponent
  implements OnInit, OnDestroy, ExitGuard
{
  public isEdit: boolean = false;
  public currentDemand: any;
  public currentInformation: FactoringInfo;
  private currentDraftId: number = 0;

  public isUserVerified: boolean;

  public alert: boolean;
  public errorAlert: boolean;

  public alertMessage = [];
  public errorMessage: string;

  public formFree: FormGroup;

  public isRequestLoading: boolean = false;

  public files: FileMode[] = [];

  public isLoading: boolean = false;
  public debtors: DebtorInterface[] = [];

  public isNewDebtor: boolean = false;

  private _saveDraftAction$: ReturnType<typeof setTimeout>;
  private subscription$: Subscription = new Subscription();
  isView: boolean;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private demandService: DemandService,
    private commonService: CommonService,
    private messageService: MessageService,
    private fileService: FileService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.isUserVerified = this.authService.isUserVerified();
    this.initForm();

    this.subscription$.add(
      this.route.queryParams.subscribe((params: Params) => {
        this.isView = params['View'] === 'true' ? true : false;
        if (params['ID'] && params['Edit'] === 'true') {
          this.isLoading = true;
          this.fetchDraft(params['ID']);
        } else if (params['ID'] && params['Edit'] === 'false') {
          this.fetch(params['ID']);
        } else {
          this.isLoading = true;
          this.getDraft();
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

  public back() {
    const notVerify = 'not-verify';
    const baseUrl = this.isUserVerified ? '' : notVerify;
    this.router.navigate([`${baseUrl}/demand`]);
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

  handleRemoveFile(file: FileMode) {
    this.currentDemand.Files = this.currentDemand.Files.filter(
      (x) => x !== file
    );
  }

  private getDraft() {
    this.subscription$.add(
      this.demandService.prepareDemandByType('NewDebtor').subscribe((resp) => {
        this.currentDemand = resp;
        this.convertToFormData();
        this.isLoading = false;
      })
    );
  }

  private fetchDraft(id: number) {
    this.subscription$.add(
      this.demandService.getDemandDraftById(id).subscribe((resp) => {
        this.currentDemand = resp.Data;
        this.currentDraftId = resp.ID;
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
        this.convertToFormData();
      })
    );
  }

  private fetch(id: number) {
    this.subscription$.add(
      this.demandService.getDemandById(id).subscribe((resp) => {
        this.currentDemand = resp.Data;
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

        this.isEdit = true;
        this.convertToFormData();
        this.isLoading = false;
      })
    );
  }

  private convertToFormData() {
    this.files = this.currentDemand.Files;

    let data = this.currentDemand;

    this.formFree.patchValue({
      INN: data.INN,
    });

    if (data.IsNew) {
      this.formFree.patchValue({
        Id: data.Title,
      });
      this.isNewDebtor = true;
    } else {
      this.formFree.patchValue({
        Id: data.ID,
      });
    }

    this.isLoading = false;
    this.formFree.markAllAsTouched();
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
    this.isRequestLoading = true;
    let data: SaveDemandRequestInterface<any> = this.prepareData();

    this.subscription$.add(
      this.demandService.add(data).subscribe((resp) => {
        this.alert = true;
        window.scroll(0, 0);
        this.alertMessage = [
          {
            severity: 'success',
            summary: 'Успешно!',
            detail: 'Запрос успешно создан.',
          },
        ];
        this.isRequestLoading = false;
        this.isLoading = false;
      })
    );
  }

  //#region private logic
  saveDraft() {
    if (this.isEdit) {
      return;
    }

    this.subscription$.add(
      this.demandService
        .addDraftById(this.currentDraftId, this.prepareDraft())
        .subscribe((resp) => {
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
      Id: ['', [Validators.required]],
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

  onAdd(file) {
    this.files.push(file);
  }

  onRemove(file) {
    this.files = this.files.filter((x) => x !== file);
  }

  private resetAlerts() {
    this.alert = false;
    this.alertMessage = [];
    this.errorAlert = false;
    this.errorMessage = '';
  }
  //#endregion
  canDeactivate(): boolean | Observable<boolean> {
    this.saveDraft();
    return confirm(
      'Внимание! Возможно, Вы не сохранили данные, хотите покинуть страницу?'
    );
  }
}

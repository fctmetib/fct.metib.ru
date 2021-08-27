import { SaveDemandRequestInterface } from 'src/app/shared/modules/demand/types/requests/save-demand-request.interface';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ExitGuard } from 'src/app/shared/services/exit.guard';
import { DemandService } from '../../../services/demand.service';
import { FactoringInfoInterface } from '../../../types/common/factoring/factoring-info.interface';
import { FileModeInterface } from 'src/app/shared/types/file/file-model.interface';
import { CreateDemandMessageRequestInterface } from '../../../types/requests/create-demand-message-request.interface';
import { DeliveryService } from 'src/app/shared/services/share/delivery.service';
import { MibArray } from 'src/app/shared/classes/arrays/mib-array.class';

@Component({
  selector: 'app-demand-action-verification-page',
  templateUrl: './demand-action-verification-page.component.html',
  styleUrls: ['./demand-action-verification-page.component.scss'],
})
export class DemandActionVerificationPageComponent
  implements OnInit, ExitGuard
{
  isUserVerified: boolean;

  public alert: boolean;
  public alertMessage = [];

  public isEdit: boolean = false;

  public isLoading: boolean;
  public isLoadingData: boolean;

  public debtorList: any[] = [];
  public verificationTypes: any[] = [];

  public formFree: FormGroup;

  private currentDraftId: number = 0;

  private _saveDraftAction$: NodeJS.Timeout;
  private subscription$: Subscription = new Subscription();

  public currentTemplate: string = 'ediTemplate';
  public currentDemand: any;
  public currentInformation: FactoringInfoInterface;
  isView: boolean;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private demandService: DemandService,
    private deliveryService: DeliveryService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.isUserVerified = this.authService.isUserVerified();
    this.initForm();
    this.initValues();

    this.subscription$.add(
      this.route.queryParams.subscribe((params: Params) => {
        this.isView = params['View'] === 'true' ? true : false
        if (params['ID'] && params['Edit'] === 'false') {
          this.fetch(params['ID']);
        } else {
          this.isLoading = true;
          this.getDraft();
        }
      })
    );

    this._saveDraftAction$ = setInterval(() => this.saveDraft(), 30000);
  }

  public back() {
    const notVerify = 'not-verify';
    const baseUrl = this.isUserVerified ? '' : notVerify;
    this.router.navigate([`${baseUrl}/demand`]);
  }


  ngOnDestroy() {
    this.subscription$.unsubscribe();
    if (this._saveDraftAction$) {
      clearInterval(this._saveDraftAction$);
    }
  }

  public changeVerificationType(event) {
    switch (event.value) {
      case 'EDOKontur':
        this.currentTemplate = 'edoTemplate';
        break;
      case 'Other':
        this.currentTemplate = 'anotherTemplate';
        break;
      default:
        this.currentTemplate = 'ediTemplate';
        break;
    }
  }

  public onSubmit() {
    let data: SaveDemandRequestInterface<any> = this.prepareData();
    this.subscription$.add(
      this.demandService.add(data).subscribe((resp) => {
        this.alert = true;
        this.alertMessage = [{severity:'success', summary:'Успешно!', detail:'Запрос успешно создан.'},];
      })
    );
  }

  private getDraft() {
    this.isLoadingData = true;
    this.subscription$.add(
      this.demandService
        .prepareDemandByType('VerificationChannel')
        .subscribe((resp) => {
          this.currentDemand = resp;
          this.convertToFormData();
          this.isLoadingData = false;
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
    this.currentDemand.Files = this.currentDemand.Files.filter(
      (x) => x !== file
    );
  }

  private fetch(id: number) {
    this.isLoadingData = true;
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
        this.isEdit = true;
        this.convertToFormData();
        this.isLoadingData = false;
      })
    );
  }

  private convertToFormData() {
    let data = this.currentDemand;

    let DocumentTypeTorg12 = false;
    let DocumentTypeInvoice = false;
    let DocumentTypeAcceptance = false;
    let DocumentTypeNonformalized = false;
    let DocumentTypeORDER = false;
    let DocumentTypeRECADV = false;

    data.DocumentTypes.forEach((documentType) => {
      if (documentType === 'Torg12') {
        DocumentTypeTorg12 = true;
      }
      if (documentType === 'Invoice') {
        DocumentTypeInvoice = true;
      }
      if (documentType === 'Acceptance') {
        DocumentTypeAcceptance = true;
      }
      if (documentType === 'Nonformalized') {
        DocumentTypeNonformalized = true;
      }
      if (documentType === 'ORDER') {
        DocumentTypeORDER = true;
      }
      if (documentType === 'RECADV') {
        DocumentTypeRECADV = true;
      }
    });

    this.formFree.patchValue({
      Comment: data?.Comment ? data?.Comment : '',
      DebtorID: data?.DebtorID ? data?.DebtorID : this.debtorList[0]?.ID,
      GLN: data?.GLN ? data?.GLN : '',
      VerificationType: data?.VerificationType
        ? data?.VerificationType
        : 'EDIKorus',
      DocumentTypeTorg12: DocumentTypeTorg12,
      DocumentTypeInvoice: DocumentTypeInvoice,
      DocumentTypeAcceptance: DocumentTypeAcceptance,
      DocumentTypeNonformalized: DocumentTypeNonformalized,
      DocumentTypeORDER: DocumentTypeORDER,
      DocumentTypeRECADV: DocumentTypeRECADV,
    });
  }

  private prepareDraft() {
    let DocumentTypes: string[] = [];
    let formValues = this.formFree.value;

    if (formValues.DocumentTypeTorg12) {
      DocumentTypes.push('Torg12');
    }
    if (formValues.DocumentTypeInvoice) {
      DocumentTypes.push('Invoice');
    }
    if (formValues.DocumentTypeAcceptance) {
      DocumentTypes.push('Acceptance');
    }
    if (formValues.DocumentTypeNonformalized) {
      DocumentTypes.push('Nonformalized');
    }
    if (formValues.DocumentTypeORDER) {
      DocumentTypes.push('ORDER');
    }
    if (formValues.DocumentTypeRECADV) {
      DocumentTypes.push('RECADV');
    }

    let result: any = {
      DocumentTypes,
      Comment: formValues.Comment,
      DebtorID: formValues.DebtorID,
      GLN: formValues.GLN,
      VerificationType: formValues.VerificationType,
      Type: 'VerificationChannel',
    };

    return result;
  }

  private prepareData() {
    let data = this.prepareDraft();
    let result: SaveDemandRequestInterface<any> = {
      Data: data,
      DraftID: this.currentDraftId,
    };

    return result;
  }

  private initForm(): void {
    this.formFree = this.fb.group({
      Comment: ['', [Validators.required]],
      DebtorID: ['', [Validators.required]],
      GLN: [''],
      VerificationType: [''],
      DocumentTypeTorg12: false,
      DocumentTypeInvoice: false,
      DocumentTypeAcceptance: false,
      DocumentTypeNonformalized: false,
      // EDI only
      DocumentTypeORDER: false,
      DocumentTypeRECADV: false,
    });

    this.formFree.markAllAsTouched();
    this.formFree.markAsDirty();
  }

  canDeactivate(): boolean | Observable<boolean> {
    return confirm(
      'Внимание! Возможно, Вы не сохранили данные, хотите покинуть страницу?'
    );
  }

  private initValues(): void {
    this.verificationTypes = [
      {
        name: 'EDI Корус',
        value: 'EDIKorus',
      },
      {
        name: 'EDI CISLINK (Сислинк)',
        value: 'EDICislink',
      },
      {
        name: 'EDI Exite',
        value: 'EDIExite',
      },
      {
        name: 'ЭДО Контур Диадок',
        value: 'EDOKontur',
      },
      {
        name: 'Другой источник',
        value: 'Other',
      },
    ];

    this.deliveryService.getDeliveriesWithStats().subscribe((deliveries) => {
      let debtors = deliveries.map((delivery) => delivery.Debtor);
      let uniqDebtors = MibArray.getUniqByProperty(debtors, 'Title');
      this.debtorList.push(...uniqDebtors);

      this.formFree.patchValue({
        VerificationType: 'EDIKorus',
        DebtorID: this.debtorList[0].ID,
      });
    });
  }

  private showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Успешно',
      detail: 'Черновик успешно сохранен!',
    });
  }
  //#endregion
}

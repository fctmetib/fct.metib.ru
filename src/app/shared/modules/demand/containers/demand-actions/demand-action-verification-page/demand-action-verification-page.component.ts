import { errorSelector } from './../../../../../../client/modules/requests/store/selectors';
import { isLoadingSelector } from './../../../../../../auth/store/selectors';
import { SaveDemandRequestInterface } from 'src/app/shared/modules/demand/types/requests/save-demand-request.interface';
import { select, Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CommonService } from 'src/app/shared/services/common/common.service';
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
  public alertMessage: string;

  public isEdit: boolean = false;

  public isLoading: boolean;

  public debtorList: any[] = [];
  public verificationTypes: any[] = [];

  public formFree: FormGroup;

  private currentDraftId: number = 0;

  private _saveDraftAction$: NodeJS.Timeout;
  private subscription$: Subscription = new Subscription();

  public currentTemplate: string = 'ediTemplate';
  public currentDemand: any;
  public currentInformation: FactoringInfoInterface;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private demandService: DemandService,
    private deliveryService: DeliveryService,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.isUserVerified = this.authService.isUserVerified();
    this.initForm();
    this.initValues();

    this.subscription$.add(
      this.route.queryParams.subscribe((params: Params) => {
        if (params['ID']) {
          this.fetch(params['ID']);
        } else {
          this.isLoading = true;
          this.getDraft();
        }
      })
    );

    this._saveDraftAction$ = setInterval(() => this.saveDraft(), 30000);
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
    if (this._saveDraftAction$) {
      clearInterval(this._saveDraftAction$);
    }
  }

  public changeVerificationType(event) {
    console.log('hgere', event);
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
        this.alertMessage = 'Запрос успешно создан.';
      })
    );
  }

  private getDraft() {
    this.subscription$.add(
      this.demandService
        .prepareDemandByType('VerificationChannel')
        .subscribe((resp) => {
          this.currentDemand = resp;
          this.convertToFormData();
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
    // this.formFree.patchValue({
    //   subject: data.Subject,
    //   question: data.Question,
    // });
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
      Type: formValues.VerificationType,
    };

    return result;
  }

  private prepareData() {
    let result: SaveDemandRequestInterface<any> = {
      Data: {
        Question: this.formFree.value.question,
        Subject: this.formFree.value.subject,
        Files: [],
        Type: 'VerificationChannel',
      },
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
// 0: "Torg12"
// 1: "Invoice"
// 2: "Acceptance"
// 3: "Nonformalized"

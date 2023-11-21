import { ActivatedRoute, Params, Router } from '@angular/router';
import { DemandService } from './../../../services/demand.service';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { FileService } from 'src/app/shared/services/common/file.service';
import { FileModeInterface } from 'src/app/shared/types/file/file-model.interface';
import { SaveDemandRequestInterface } from '../../../types/requests/save-demand-request.interface';
import { MessageService } from 'primeng/api';
import { switchMap } from 'rxjs/operators';
import { FactoringInfoInterface } from '../../../types/common/factoring/factoring-info.interface';
import { CreateDemandMessageRequestInterface } from '../../../types/requests/create-demand-message-request.interface';
import { ExitGuard } from 'src/app/shared/services/exit.guard';

@Component({
  selector: 'app-demand-action-request-free-page',
  templateUrl: './demand-action-request-free-page.component.html',
  styleUrls: ['./demand-action-request-free-page.component.scss'],
})
export class DemandActionRequestFreePageComponent
  implements OnInit, OnDestroy, ExitGuard
{
  isUserVerified: boolean;

  public alert: boolean;
  public alertMessage = [];

  public isEdit: boolean = false;

  public isLoading$: Observable<boolean> = new Observable<boolean>();
  public backendErrors$: Observable<string | null>;

  public formFree: FormGroup;
  public isRequestLoading: boolean = false;
  public isLoading: boolean = false;

  public files: FileModeInterface[] = [];

  private currentDraftId: number = 0;

  private _saveDraftAction$: ReturnType<typeof setTimeout>;
  private subscription$: Subscription = new Subscription();

  public currentDemand: any;
  public currentInformation: FactoringInfoInterface;
  isView: boolean;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private demandService: DemandService,
    private commonService: CommonService,
    private messageService: MessageService,
    private fileService: FileService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.isUserVerified = this.authService.isUserVerified();
    this.initForm();
    this.initValues();

    this.subscription$.add(
      this.route.queryParams.subscribe((params: Params) => {
        this.isView = params['View'] === 'true' ? true : false
        if(params['ID'] && params['Edit'] === 'true') {
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

  public onSubmit() {
    this.isRequestLoading = true;
    let data: SaveDemandRequestInterface<any> = this.prepareData();
    this.subscription$.add(
      this.demandService.add(data).subscribe((resp) => {
        this.alert = true;
        window.scroll(0, 0);
        this.alertMessage = [{severity:'success', summary:'Успешно!', detail:'Запрос успешно создан.'},];
        this.isRequestLoading = false;
      })
    );
  }

  onAdd(file) {
    this.files.push(file);
  }

  onRemove(file) {
    this.files = this.files.filter((x) => x !== file);
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
  private getDraft() {
    this.subscription$.add(
      this.demandService
        .prepareDemandByType('Question')
        .subscribe((resp) => {
          this.currentDemand = resp;
          this.convertToFormData();
          this.isLoading = false;
        })
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

        this.isEdit = true;
        this.convertToFormData();
      })
    );
  }

  private fetchDraft(id: number) {
    this.subscription$.add(
      this.demandService.getDemandDraftById(id).subscribe((resp) => {
        this.currentDemand = resp;
        console.log('RESTP: ', resp)
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

  private convertToFormData() {
    this.files = this.currentDemand?.Files;

    let data = this.currentDemand?.Data;
    console.log(this.currentDemand)
    console.log(data)
    this.formFree.patchValue({
      subject: data?.Subject,
      question: data?.Question,
    });

    this.isLoading = false;
  }

  private prepareDraft() {
    let result: any = {
      Question: this.formFree.value.question,
      Subject: this.formFree.value.subject,
      Files: this.files,
      Type: 'Question',
    };

    return result;
  }

  private prepareData() {
    let result: SaveDemandRequestInterface<any> = {
      Data: {
        Question: this.formFree.value.question,
        Subject: this.formFree.value.subject,
        Files: this.files,
        Type: 'Question',
      },
      DraftID: this.currentDraftId,
    };

    return result;
  }

  private initForm(): void {
    this.formFree = this.fb.group({
      subject: ['', [Validators.required]],
      question: ['', [Validators.required]],
    });

    this.formFree.markAllAsTouched();
    this.formFree.markAsDirty();
  }

  canDeactivate(): boolean | Observable<boolean> {
    this.saveDraft();
    return confirm('Внимание! Возможно, Вы не сохранили данные, хотите покинуть страницу?');
  }

  private initValues(): void {
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

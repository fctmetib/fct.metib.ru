import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Guid } from 'src/app/shared/classes/common/guid.class';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { FileService } from 'src/app/shared/services/common/file.service';
import { ExitGuard } from 'src/app/shared/services/exit.guard';
import { FileMode } from 'src/app/shared/types/file/file-model.interface';
import { DemandService } from '../../../services/demand.service';
import { FactoringInfo } from '../../../types/common/factoring/factoring.info';
import { CreateDemandMessageRequestInterface } from '../../../types/requests/create-demand-message-request.interface';
import { SaveDemandRequestInterface } from '../../../types/requests/save-demand-request.interface';

@Component({
  selector: 'app-demand-action-limit-page',
  templateUrl: './demand-action-limit-page.component.html',
  styleUrls: ['./demand-action-limit-page.component.scss'],
})
export class DemandActionLimitPageComponent implements OnInit, OnDestroy, ExitGuard {
  isUserVerified: boolean;

  public isEdit: boolean = false;
  public currentDemand: any;
  public currentInformation: FactoringInfo;

  public alert: boolean;
  public alertMessage = [];

  public formFree: FormGroup;

  public files: FileMode[] = [];

  private currentDraftId: number = 0;

  public isRequestLoading: boolean = false;
  public isLoading: boolean = false;

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
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.isUserVerified = this.authService.isUserVerified();
    this.initForm();

    this.subscription$.add(
      this.route.queryParams.subscribe((params: Params) => {
        this.isView = params['View'] === 'true' ? true : false
        if (params['ID'] && params['Edit'] === 'false') {
          this.fetch(params['ID']);
        }
        if (params['DraftId']) {
          this.currentDraftId = params['DraftID'];
          this.isEdit = true;
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
    this.isLoading = true;
    this.isRequestLoading = true;
    let data: SaveDemandRequestInterface<any> = this.prepareData();

    this.subscription$.add(
      this.demandService.add(data).subscribe((resp) => {
        this.alert = true;
        window.scroll(0, 0);
        this.alertMessage = [{severity:'success', summary:'Успешно!', detail:'Запрос успешно создан.'},];
        this.isLoading = false;
        this.isRequestLoading = false;
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

  handleRemoveFile(file: FileMode) {
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

        this.isEdit = true;
        this.convertToFormData();
      })
    );
  }

  private convertToFormData() {
    this.files = this.currentDemand.Files;

    let data = this.currentDemand.Data;
    this.formFree.patchValue({
      limit: data.Limit,
      comment: data.Comment,
    });
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
    let data = {
      Limit: this.formFree.value.limit,
      Comment: this.formFree.value.comment,
      Files: this.files,
      Type: 'Limit',
    };
    return data;
  }

  private initForm(): void {
    this.formFree = this.fb.group({
      limit: [0, [Validators.required]],
      comment: ['', [Validators.required]],
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

  //#endregion

  canDeactivate(): boolean | Observable<boolean> {
    this.saveDraft();
    return confirm('Внимание! Возможно, Вы не сохранили данные, хотите покинуть страницу?');
  }
}

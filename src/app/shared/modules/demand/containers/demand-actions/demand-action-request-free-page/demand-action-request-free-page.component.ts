import { ActivatedRoute, Params } from '@angular/router';
import { DemandService } from './../../../services/demand.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Guid } from 'src/app/shared/classes/common/guid.class';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { FileService } from 'src/app/shared/services/common/file.service';
import { FileModeInterface } from 'src/app/shared/types/file/file-model.interface';
import { errorSelector, isLoadingSelector } from '../../../store/selectors';
import { SaveDemandRequestInterface } from '../../../types/requests/save-demand-request.interface';
import { MessageService } from 'primeng/api';
import { switchMap } from 'rxjs/operators';
import { FactoringInfoInterface } from '../../../types/common/factoring/factoring-info.interface';
import { CreateDemandMessageRequestInterface } from '../../../types/requests/create-demand-message-request.interface';

@Component({
  selector: 'app-demand-action-request-free-page',
  templateUrl: './demand-action-request-free-page.component.html',
  styleUrls: ['./demand-action-request-free-page.component.scss'],
})
export class DemandActionRequestFreePageComponent implements OnInit, OnDestroy {
  isUserVerified: boolean;

  public alert: boolean;
  public alertMessage: string;

  public isEdit: boolean = false;

  public isLoading$: Observable<boolean> = new Observable<boolean>();
  public backendErrors$: Observable<string | null>;

  public formFree: FormGroup;

  public files: FileModeInterface[] = [];

  private currentDraftId: number = 0;

  private _saveDraftAction$: NodeJS.Timeout;
  private subscription$: Subscription = new Subscription();

  public currentDemand: any;
  public currentInformation: FactoringInfoInterface;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private demandService: DemandService,
    private commonService: CommonService,
    private messageService: MessageService,
    private fileService: FileService,
    private route: ActivatedRoute,
    private store: Store
  ) {}

  ngOnInit() {
    this.isUserVerified = this.authService.isUserVerified();
    this.initForm();
    this.initValues();

    this.subscription$.add(
      this.route.queryParams.subscribe((params: Params) => {
        if (params['ID']) {
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

  ngOnDestroy() {
    this.subscription$.unsubscribe();
    if(this._saveDraftAction$) {
      clearInterval(this._saveDraftAction$);
    }
  }

  public onSubmit() {
    //TODO: UPDATE IT
    let data: SaveDemandRequestInterface<any> = this.prepareData();
    this.subscription$.add(
      this.demandService.add(data).subscribe((resp) => {
        this.alert = true;
        this.alertMessage = 'Запрос успешно создан.';
      })
    );
  }

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
      })
    );
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

  private initValues(): void {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.backendErrors$ = this.store.pipe(select(errorSelector));
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
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ExitGuard } from 'src/app/shared/services/exit.guard';
import { FileMode } from 'src/app/shared/types/file/file-model.interface';
import { CreateDemandFactoringRequestInterface } from '../../../types/requests/create-demand-factoring-request.interface';
import { CreateDemandMessageRequestInterface } from '../../../types/requests/create-demand-message-request.interface';
import { SaveDemandRequestInterface } from '../../../types/requests/save-demand-request.interface';
import { DemandService } from '../../../services/demand.service';
import { MessageService } from 'primeng/api';
import { FactoringInfo } from '../../../types/common/factoring/factoring.info';

@Component({
  selector: 'app-demand-action-surety-page',
  templateUrl: './demand-action-surety-page.component.html',
  styleUrls: ['./demand-action-surety-page.component.scss'],
})
export class DemandActionSuretyPageComponent implements OnInit, ExitGuard {
  public isUserVerified: boolean;

  public alert: boolean;
  public alertMessage = [];

  public backendErrors$: Observable<string | null>;

  public currentDraftId: number = 0;

  public currentDemand: any;
  public currentInformation: FactoringInfo;

  public isRequestLoading: boolean = false;

  public files: any;

  public isEdit: boolean = false;
  public isLoading: boolean = false;

  private subscription$: Subscription = new Subscription();
  isView: boolean;

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router,
    private demandService: DemandService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.isUserVerified = this.authService.isUserVerified();

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
  }

  public back() {
    const notVerify = 'not-verify';
    const baseUrl = this.isUserVerified ? '' : notVerify;
    this.router.navigate([`${baseUrl}/demand`]);
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

  handleSubmit(
    data: SaveDemandRequestInterface<CreateDemandFactoringRequestInterface>
  ) {
    if (this.isEdit) {
      data.Data.Files = this.currentDemand.Files;
    }
    this.isRequestLoading = true;

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
      })
    );
    // this.store.dispatch(createDemandFactoringAction({ data }));
  }

  handleSave(event: any) {
    if (this.currentDemand.Files) {
      event.Files = this.currentDemand.Files;
    }

    this.subscription$.add(
      this.demandService
        .addDraftById(this.currentDraftId, event)
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

  handleRemoveFiles(files: FileMode[]) {
    this.currentDemand.Files = files;
  }

  handleRemoveFile(file: FileMode) {
    this.currentDemand.Files = this.currentDemand.Files.filter(
      (x) => x !== file
    );
  }
  //#region private logic

  private getDraft() {
    this.subscription$.add(
      this.demandService.prepareDemandByType('Guarantee').subscribe((resp) => {
        this.currentDemand = resp;
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
        this.isLoading = false;
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
      })
    );
  }

  private showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Успешно',
      detail: 'Черновик успешно сохранен!',
    });
  }
  //#endregion
  canDeactivate(): boolean | Observable<boolean> {
    return confirm(
      'Внимание! Возможно, Вы не сохранили данные, хотите покинуть страницу?'
    );
  }
}

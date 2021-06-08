import { FileModeInterface } from './../../../../../types/file/file-model.interface';
import { DemandService } from '../../../services/demand.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { SaveDemandRequestInterface } from '../../../types/requests/save-demand-request.interface';
import { CreateDemandFactoringRequestInterface } from '../../../types/requests/create-demand-factoring-request.interface';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { createDemandFactoringAction } from '../../../store/actions/createDemand.action';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Params } from '@angular/router';
import { FactoringInfoInterface } from '../../../types/common/factoring/factoring-info.interface';
import { CreateDemandMessageRequestInterface } from '../../../types/requests/create-demand-message-request.interface';

@Component({
  selector: 'app-demand-action-factoring-page',
  templateUrl: './demand-action-factoring-page.component.html',
  styleUrls: ['./demand-action-factoring-page.component.scss'],
})
export class DemandActionFactoringPageComponent implements OnInit, OnDestroy {
  public isUserVerified: boolean;

  public alert: boolean;
  public alertMessage: string;

  public backendErrors$: Observable<string | null>;

  public currentDraftId: number = 0;

  public currentDemand: any;
  public currentInformation: FactoringInfoInterface;

  public files: any;

  public isEdit: boolean = false;
  public isLoading: boolean = false;

  private subscription$: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private demandService: DemandService,
    private route: ActivatedRoute,
    private store: Store
  ) {}

  ngOnInit() {
    this.isUserVerified = this.authService.isUserVerified();

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
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

  handleSubmit(
    data: SaveDemandRequestInterface<CreateDemandFactoringRequestInterface>
  ) {
    if(this.isEdit) {
      data.Data.Files = this.currentDemand.Files
    }
    this.store.dispatch(createDemandFactoringAction({ data }));
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

  handleRemoveFile(file: FileModeInterface) {
    this.currentDemand.Files = this.currentDemand.Files.filter(x => x !== file)
  }
  //#region private logic

  private getDraft() {
    this.subscription$.add(
      this.demandService.prepareDemandByType('Factoring').subscribe((resp) => {
        this.currentDemand = resp;
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
}

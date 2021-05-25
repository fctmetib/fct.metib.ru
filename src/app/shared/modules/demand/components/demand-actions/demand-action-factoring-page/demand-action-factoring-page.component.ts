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

@Component({
  selector: 'app-demand-action-factoring-page',
  templateUrl: './demand-action-factoring-page.component.html',
  styleUrls: ['./demand-action-factoring-page.component.scss'],
})
export class DemandActionFactoringPageComponent implements OnInit, OnDestroy {
  public isUserVerified: boolean;

  public alert: boolean;
  public alertMessage: string;

  public isLoading$: Observable<boolean> = new Observable<boolean>();
  public backendErrors$: Observable<string | null>;

  public currentDraftId: number = 0;
  public currentDemand: any;

  public files: any;

  public isEdit: boolean = false;

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
          this.demandService.getDemandById(params['ID']).subscribe((resp) => {
            this.currentDemand = resp;
            this.isEdit = true;
          });
        }
        if (params['DraftId']) {
          this.currentDraftId = params['DraftID'];
          this.isEdit = true;
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

  handleSubmit(data: SaveDemandRequestInterface<CreateDemandFactoringRequestInterface>) {
    this.store.dispatch(createDemandFactoringAction({ data }));
  }

  handleSave(event: any) {
    this.subscription$.add(
      this.demandService
        .addDraftById(this.currentDraftId, event)
        .subscribe((resp) => {
          console.log(resp);
          this.currentDraftId = resp.ID;
          this.showSuccess();
        })
    );
  }

  handleFiles(event: any) {
    this.files = event;
  }

  //#region private logic

  private showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Успешно',
      detail: 'Черновик успешно сохранен!',
    });
  }
  //#endregion
}

import { DemandActionType } from './../../types/common/demand-action-type';
import { DemandService } from '../../services/demand.service';
import { DemandInterface } from '../../types/demand.interface';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';
import {
  switchMap,
  map,
  debounceTime,
  distinctUntilChanged,
  tap,
} from 'rxjs/operators';
import { FormBuilder } from '@angular/forms';
import { DemandAction } from '../../types/common/demand-action';

@Component({
  selector: 'app-demand-history',
  templateUrl: './demand-history.component.html',
  styleUrls: ['./demand-history.component.scss'],
})
export class DemandHistoryComponent implements OnInit, OnDestroy {
  displayModal: boolean;
  loading: boolean = true;

  selectedItems: DemandInterface<any>[];
  isUserVerified: boolean;

  allDemandsFiltered: DemandInterface<any>[] = [];
  allDemands: DemandInterface<any>[] = [];
  allDrafts: any[] = [];

  public statusTypes: any[] = [];

  public searchForm = this.fb.group({
    search: [''],
  });

  private subscription$: Subscription = new Subscription();
  isSearching: boolean;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private demandService: DemandService,
    private router: Router
  ) {}

  ngOnInit() {
    this.fetch();
    this.initForm();
    this.initValues();
    this.isUserVerified = this.authService.isUserVerified();
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

  public onFilterStatusChange(event) {
    if (event.value === 'All') {
      this.allDemandsFiltered = this.allDemands;
    } else {
      this.allDemandsFiltered = this.allDemands.filter(
        (x) => x.Status === event.value
      );
    }
  }

  public back(): void {
    const notVerify = 'not-verify';
    const baseUrl = this.isUserVerified ? 'client' : notVerify;
    this.router.navigate([`${baseUrl}/new-demand`]);
  }

  fetch() {
    this.loading = true;
    this.subscription$.add(
      this.demandService
        .getDrafts()
        .pipe(
          switchMap((drafts) => {
            this.allDrafts = drafts;
            return this.demandService.getDemands();
          })
        )
        .subscribe((demands) => {
          this.allDemands = demands;

          if (demands) {
            if (this.allDrafts) {
              this.allDrafts.forEach((draft) => {
                this.allDemands.push({
                  Data: draft.Data,
                  DateCreated: draft.DateCreated,
                  DateModify: draft.DateModify,
                  DateStatus: draft.DateCreated,
                  Files: draft.Data.Files,
                  ID: draft.ID,
                  Manager: null,
                  Messages: null,
                  Requirements: null,
                  Result: null,
                  Status: 'Draft',
                  Steps: null,
                  Type: draft.Data.Type,
                  User: draft.User,
                });

                this.allDemands.sort((a, b) => {
                  return (
                    new Date(b.DateModify).getTime() -
                    new Date(a.DateModify).getTime()
                  );
                });
              });
            }
          }

          this.allDemands = this.allDemands.map((x) => {
            let translatedType = this.getTypeTranslate(x.Type);
            let translatedStatus = this.getStatusTranslate(x.Status);

            return {
              Type: x?.Type,
              Status: x?.Status,
              User: x?.User,
              Manager: x?.Manager,
              DateCreated: x?.DateCreated,
              DateModify: x?.DateModify,
              DateStatus: x?.DateStatus,
              Requirements: x?.Requirements,
              Steps: x?.Steps,
              Messages: x?.Messages,
              Files: x?.Files,
              Data: x?.Data,
              Result: x?.Result,
              ID: x?.ID,
              TranslatedType: translatedType,
              TranslatedStatus: translatedStatus,
            };
          });
          this.allDemandsFiltered = this.allDemands;
        })
    );
  }

  remove(Id) {
    this.subscription$.add(
      this.demandService.deleteDraftById(Id).subscribe(() => {
        this.allDemandsFiltered = this.allDemandsFiltered.filter(
          (x) => x.ID !== Id
        );
        this.allDemands = this.allDemands.filter((x) => x.ID !== +Id);
      })
    );
  }

  cancel(Id) {
    this.subscription$.add(
      this.demandService.cancelByDemandId(Id).subscribe(() => {
        let canceledDemand = this.allDemands.find((x) => x.ID === Id);
        canceledDemand.Status = 'Canceled';
      })
    );
  }

  edit(Type: string, ID: string, isDraft: string, isCompleted: boolean) {
    const notVerify = 'not-verify';
    const baseUrl = this.isUserVerified ? 'client' : notVerify;

    let Edit = isDraft === 'Draft' ? true : false;

    let demandAction: DemandActionType;
    let demandType: DemandAction;

    if (isCompleted) {
      demandAction = DemandActionType.VIEW;
    } else {
      demandAction = Edit
        ? DemandActionType.EDIT_DRAFT
        : DemandActionType.EDIT_CREATED;
    }

    switch (Type) {
      case 'Factoring':
        demandType = DemandAction.FACTORING;
        break;
      case 'AgencyFactoring':
        demandType = DemandAction.AGENT_FACTORING;
        break;
      case 'Question':
        demandType = DemandAction.FREE_REQUEST;
        break;
      case 'DigitalSignature':
        demandType = DemandAction.EDS;
        break;
      case 'ProfileChange':
        demandType = DemandAction.EDIT_PROFILE;
        break;
      case 'Limit':
        demandType = DemandAction.UPDATE_LIMIT;
        break;
      case 'NewDebtor':
        demandType = DemandAction.CREATE_DEBITOR;
        break;
      case 'Guarantee':
        demandType = DemandAction.SURETY;
        break;
      case 'VerificationChannel':
        demandType = DemandAction.VERIFY;
        break;
    }

    this.router.navigate([`${baseUrl}/new-demand/demand-action`], {
      queryParams: {
        ID: ID, // Id запроса
        Type: demandType, // Factoring, EDS и тд
        Action: demandAction, // Редактирование, создание и тд
      },
    });
  }

  private initValues() {
    this.statusTypes = [
      {
        type: 'All',
        name: 'Все',
      },
      {
        type: 'Processing',
        name: 'В процессе',
      },
      {
        type: 'Completed',
        name: 'Завершен',
      },
      {
        type: 'Rejected',
        name: 'Отклонено',
      },
      {
        type: 'Created',
        name: 'Создан',
      },
      {
        type: 'Draft',
        name: 'Черновик',
      },
      {
        type: 'Canceled',
        name: 'Отменен',
      },
    ];
  }

  private initForm() {
    this.subscription$.add(
      this.searchForm.valueChanges
        .pipe(
          tap(() => {
            this.isSearching = true;
          }),
          debounceTime(2000),
          distinctUntilChanged()
        )
        .subscribe((formSub) => {
          this.allDemandsFiltered = [];
          let searchFieldValue: string = formSub.search;
          searchFieldValue = searchFieldValue.toLowerCase();
          this.allDemands.forEach((demand) => {
            let propValueList = Object.values(demand);
            for (let i = 0; i < propValueList.length; i++) {
              {
                if (propValueList[i]) {
                  if (
                    propValueList[i]
                      .toString()
                      .toLowerCase()
                      .indexOf(searchFieldValue) > -1
                  ) {
                    this.allDemandsFiltered.push(demand);
                    break;
                  }
                }
              }
            }
          });
          this.isSearching = false;
        })
    );
  }

  private getTypeTranslate(type): string {
    let result: string = '';
    switch (type) {
      case 'VerificationChannel':
        result = 'Запрос на Регистрацию канала верификации';
        break;
      case 'Guarantee':
        result = 'Запрос на Поручительство';
        break;
      case 'Factoring':
        result = 'Запрос на Факторинг';
        break;
      case 'DigitalSignature':
        result = 'Запрос на ЭЦП';
        break;
      case 'ProfileChange':
        result = 'Запрос на Редактирование Профиля';
        break;
      case 'Question':
        result = 'Запрос на свободную тему';
        break;
      case 'Limit':
        result = 'Запрос на лимит';
        break;
      case 'NewDebtor':
        result = 'Запрос на нового дебитора';
        break;
      case 'AgencyFactoring':
        result = 'Запрос на Агентский Факторинг';
        break;
      default:
        result = 'Запрос на свободную тему';
        break;
    }
    return result;
  }

  private getStatusTranslate(status): string {
    let result: string = '';
    switch (status) {
      case 'Processing':
        result = 'В процессе';
        break;
      case 'Completed':
        result = 'Завершен';
        break;
      case 'Rejected':
        result = 'Отклонено';
        break;
      case 'Created':
        result = 'Создан';
        break;
      case 'Draft':
        result = 'Черновик';
        break;
      case 'Canceled':
        result = 'Отменен';
        break;
    }

    return result;
  }
}

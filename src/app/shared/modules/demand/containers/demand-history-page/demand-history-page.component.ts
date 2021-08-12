import { DemandService } from './../../services/demand.service';
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

@Component({
  selector: 'app-demand-history-page',
  templateUrl: './demand-history-page.component.html',
  styleUrls: ['./demand-history-page.component.scss'],
})
export class DemandHistoryPageComponent implements OnInit, OnDestroy {
  displayModal: boolean;
  loading: boolean = true;

  selectedItems: DemandInterface<any>[];
  isUserVerified: boolean;

  allDemandsFiltered: DemandInterface<any>[] = [];
  allDemands: DemandInterface<any>[] = [];
  allDrafts: any[] = [];

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
    this.isUserVerified = this.authService.isUserVerified();
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

  public search() {}

  fetch() {
    this.loading = true;
    this.subscription$.add(
      this.demandService
        .getDrafts()
        .pipe(
          switchMap((drafts) => {
            this.allDrafts = drafts;
            return this.demandService.fetch();
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

                console.log('Demands', this.allDemands);
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
        this.allDemands = this.allDemands.filter((x) => x.ID !== Id);
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

  edit(Type, ID) {
    switch (Type) {
      case 'Factoring':
        this.router.navigate(['/demand/actions/factoring'], {
          queryParams: {
            ID: ID,
          },
        });
        break;
      case 'Question':
        this.router.navigate(['/demand/actions/free-request'], {
          queryParams: {
            ID: ID,
          },
        });
        break;
      case 'DigitalSignature':
        this.router.navigate(['/demand/actions/create-eds'], {
          queryParams: {
            ID: ID,
          },
        });
        break;
      case 'ProfileChange':
        this.router.navigate(['/demand/actions/edit-profile'], {
          queryParams: {
            ID: ID,
          },
        });
        break;
      case 'Limit':
        this.router.navigate(['/demand/actions/update-limit'], {
          queryParams: {
            ID: ID,
          },
        });
        break;
      case 'NewDebtor':
        this.router.navigate(['/demand/actions/create-debitor'], {
          queryParams: {
            ID: ID,
          },
        });
        break;
    }
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

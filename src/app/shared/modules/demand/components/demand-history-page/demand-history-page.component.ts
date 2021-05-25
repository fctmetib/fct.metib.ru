import { DemandService } from './../../services/demand.service';
import { DemandDraftInterface } from './../../types/demand-draft.interface';
import { DemandInterface } from '../../types/demand.interface';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-demand-history-page',
  templateUrl: './demand-history-page.component.html',
  styleUrls: ['./demand-history-page.component.scss'],
})
export class DemandHistoryPageComponent implements OnInit, OnDestroy {
  demands$: Observable<DemandInterface<any>[] | null>;
  drafts$: Observable<DemandDraftInterface<any>[] | null>;

  error$: Observable<string | null>;
  isLoading$: Observable<boolean>;

  displayModal: boolean;
  loading: boolean = true;

  selectedItems: DemandInterface<any>[];
  isUserVerified: boolean;

  allDemands: DemandInterface<any>[] = [];
  allDrafts: any[] = [];
  private subscription$: Subscription = new Subscription();

  constructor(
    private store: Store,
    private authService: AuthService,
    private demandService: DemandService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initializeValues();
    this.fetch();
    this.isUserVerified = this.authService.isUserVerified();
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

  initializeValues(): void {
    // this.demands$ = this.store.pipe(select(demandssSelector));
    // this.drafts$ = this.store.pipe(select(draftsSelector));

    this.loading = true;

    // this.demands$.subscribe((demands) => {
    //   this.drafts$.subscribe((drafts) => {
    //     this.allDemands = demands;

    //     if (demands) {
    //       if (drafts) {
    //         drafts.forEach((draft) => {
    //           this.allDemands.push({
    //             Data: draft.Data,
    //             DateCreated: draft.DateCreated,
    //             DateModify: draft.DateModify,
    //             DateStatus: draft.DateCreated,
    //             Files: draft.Data.Files,
    //             ID: draft.ID,
    //             Manager: null,
    //             Messages: null,
    //             Requirements: null,
    //             Result: null,
    //             Status: 'draft',
    //             Steps: null,
    //             Type: null,
    //             User: draft.User,
    //           });

    //           this.allDemands.filter((x) => x.DateCreated);
    //           console.log('Demands', this.allDemands);
    //         });
    //       }

    //       this.loading = false;
    //     }
    //   });
    // });

    // this.error$ = this.store.pipe(select(errorSelector));
    // this.isLoading$ = this.store.pipe(select(isLoadingSelector));
  }

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
        })
    );
  }

  remove(Id) {
    this.subscription$.add(
      this.demandService.deleteDraftById(Id).subscribe((resp) => {
        this.allDemands.splice(this.allDemands.findIndex((x) => x.ID === Id));
      })
    );
  }

  cancel(Id) {
    this.subscription$.add(
      this.demandService.cancelByDemandId(Id).subscribe((resp) => {
        this.allDemands.splice(this.allDemands.findIndex((x) => x.ID === Id));
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
    }
  }
}

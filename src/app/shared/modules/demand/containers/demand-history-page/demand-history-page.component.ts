import { DemandService } from './../../services/demand.service';
import { DemandInterface } from '../../types/demand.interface';
import { Subscription } from 'rxjs';
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
  displayModal: boolean;
  loading: boolean = true;

  selectedItems: DemandInterface<any>[];
  isUserVerified: boolean;

  allDemands: DemandInterface<any>[] = [];
  allDrafts: any[] = [];
  private subscription$: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private demandService: DemandService,
    private router: Router
  ) {}

  ngOnInit() {
    this.fetch();
    this.isUserVerified = this.authService.isUserVerified();
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
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
}

import { DemandActionEditProfilePageComponent } from './components/demand-actions/demand-action-edit-profile-page/demand-action-edit-profile-page.component';
import { DemandPageComponent } from './components/demand-page/demand-page.component';
import { DemandHistoryPageComponent } from './components/demand-history-page/demand-history-page.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DemandActionDebitorPageComponent } from './components/demand-actions/demand-action-debitor-page/demand-action-debitor-page.component';
import { DemandActionEDSPageComponent } from './components/demand-actions/demand-action-eds-page/demand-action-eds-page.component';
import { DemandActionLimitPageComponent } from './components/demand-actions/demand-action-limit-page/demand-action-limit-page.component';
import { DemandActionRequestFreePageComponent } from './components/demand-actions/demand-action-request-free-page/demand-action-request-free-page.component';
import { DemandActionRequestSupportPageComponent } from './components/demand-actions/demand-action-request-support-page/demand-action-request-support-page.component';
import { DemandActionSuretyPageComponent } from './components/demand-actions/demand-action-surety-page/demand-action-surety-page.component';
import { DemandActionVerificationPageComponent } from './components/demand-actions/demand-action-verification-page/demand-action-verification-page.component';

const routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: DemandPageComponent,
      },
      {
        path: 'history',
        component: DemandHistoryPageComponent,
      },
      {
        path: 'actions/edit-profile',
        component: DemandActionEditProfilePageComponent
      },
      {
        path: 'actions/create-debitor',
        component: DemandActionDebitorPageComponent
      },
      {
        path: 'actions/create-eds',
        component: DemandActionEDSPageComponent,
      },
      {
        path: 'actions/update-limit',
        component: DemandActionLimitPageComponent
      },
      {
        path: 'actions/free-request',
        component: DemandActionRequestFreePageComponent
      },
      {
        path: 'actions/support-request',
        component: DemandActionRequestSupportPageComponent
      },
      {
        path: 'actions/surety',
        component: DemandActionSuretyPageComponent
      },
      {
        path: 'actions/verify',
        component: DemandActionVerificationPageComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DemandRoutingModule {}

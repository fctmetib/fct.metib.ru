import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DemandActionAgentFactoringPageComponent } from './containers/demand-actions/demand-action-agent-factoring-page/demand-action-agent-factoring-page.component';
import { DemandActionDebitorPageComponent } from './containers/demand-actions/demand-action-debitor-page/demand-action-debitor-page.component';
import { DemandActionEditProfilePageComponent } from './containers/demand-actions/demand-action-edit-profile-page/demand-action-edit-profile-page.component';
import { DemandActionEDSPageComponent } from './containers/demand-actions/demand-action-eds-page/demand-action-eds-page.component';
import { DemandActionFactoringPageComponent } from './containers/demand-actions/demand-action-factoring-page/demand-action-factoring-page.component';
import { DemandActionLimitPageComponent } from './containers/demand-actions/demand-action-limit-page/demand-action-limit-page.component';
import { DemandActionRequestFreePageComponent } from './containers/demand-actions/demand-action-request-free-page/demand-action-request-free-page.component';
import { DemandActionRequestSupportPageComponent } from './containers/demand-actions/demand-action-request-support-page/demand-action-request-support-page.component';
import { DemandActionSuretyPageComponent } from './containers/demand-actions/demand-action-surety-page/demand-action-surety-page.component';
import { DemandActionVerificationPageComponent } from './containers/demand-actions/demand-action-verification-page/demand-action-verification-page.component';
import { DemandHistoryPageComponent } from './containers/demand-history-page/demand-history-page.component';
import { DemandPageComponent } from './containers/demand-page/demand-page.component';

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
        path: 'actions/agent-factoring',
        component: DemandActionAgentFactoringPageComponent
      },
      {
        path: 'actions/factoring',
        component: DemandActionFactoringPageComponent
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

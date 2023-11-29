import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {
  DemandActionAgentFactoringPageComponent
} from './containers/demand-actions/demand-action-agent-factoring-page/demand-action-agent-factoring-page.component';
import {
  DemandActionDebitorPageComponent
} from './containers/demand-actions/demand-action-debitor-page/demand-action-debitor-page.component';
import {
  DemandActionEditProfilePageComponent
} from './containers/demand-actions/demand-action-edit-profile-page/demand-action-edit-profile-page.component';
import {DemandActionEDSPageComponent} from './containers/demand-actions/demand-action-eds-page/demand-action-eds-page.component';
import {
  DemandActionFactoringPageComponent
} from './containers/demand-actions/demand-action-factoring-page/demand-action-factoring-page.component';
import {DemandActionLimitPageComponent} from './containers/demand-actions/demand-action-limit-page/demand-action-limit-page.component';
import {
  DemandActionRequestFreePageComponent
} from './containers/demand-actions/demand-action-request-free-page/demand-action-request-free-page.component';
import {
  DemandActionRequestSupportPageComponent
} from './containers/demand-actions/demand-action-request-support-page/demand-action-request-support-page.component';
import {DemandActionSuretyPageComponent} from './containers/demand-actions/demand-action-surety-page/demand-action-surety-page.component';
import {
  DemandActionVerificationPageComponent
} from './containers/demand-actions/demand-action-verification-page/demand-action-verification-page.component';
import {DemandHistoryPageComponent} from './containers/demand-history-page/demand-history-page.component';
import {DemandPageComponent} from './containers/demand-page/demand-page.component';
import {ExitGuard} from '../../../services/exit.guard';

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
        canDeactivate: [ExitGuard],
        component: DemandActionEditProfilePageComponent,
      },
      {
        path: 'actions/create-debitor',
        canDeactivate: [ExitGuard],
        component: DemandActionDebitorPageComponent,
      },
      {
        path: 'actions/create-eds',
        canDeactivate: [ExitGuard],
        component: DemandActionEDSPageComponent,
      },
      {
        path: 'actions/update-limit',
        canDeactivate: [ExitGuard],
        component: DemandActionLimitPageComponent,
      },
      {
        path: 'actions/free-request',
        canDeactivate: [ExitGuard],
        component: DemandActionRequestFreePageComponent,
      },
      {
        path: 'actions/support-request',
        canDeactivate: [ExitGuard],
        component: DemandActionRequestSupportPageComponent,
      },
      {
        path: 'actions/agent-factoring',
        canDeactivate: [ExitGuard],
        component: DemandActionAgentFactoringPageComponent,
      },
      {
        path: 'actions/factoring',
        canDeactivate: [ExitGuard],
        component: DemandActionFactoringPageComponent,
      },
      {
        path: 'actions/surety',
        canDeactivate: [ExitGuard],
        component: DemandActionSuretyPageComponent,
      },
      {
        path: 'actions/verify',
        canDeactivate: [ExitGuard],
        component: DemandActionVerificationPageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DemandRoutingModule {
}

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ExitGuard } from '../../services/exit.guard';
import { DemandActionComponent } from './containers/demand-action/demand-action.component';
import { DemandActionsComponent } from './containers/demand-actions/demand-actions.component';
import { DemandHistoryComponent } from './containers/demand-history/demand-history.component';

const routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: DemandActionsComponent,
      },
      {
        path: 'demand-action',
        component: DemandActionComponent,
      },
      {
        path: 'history',
        component: DemandHistoryComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DemandNewRoutingModule {}

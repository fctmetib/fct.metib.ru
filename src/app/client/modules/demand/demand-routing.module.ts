import { DemandActionEditProfilePageComponent } from './components/demand-actions/demand-action-edit-profile-page/demand-action-edit-profile-page.component';
import { DemandPageComponent } from './components/demand-page/demand-page.component';
import { DemandHistoryPageComponent } from './components/demand-history-page/demand-history-page.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

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
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DemandRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ExitGuard } from '../../services/exit.guard';
import { DemandActionComponent } from './containers/demand-action/demand-action.component';

const routes = [
  {
    path: '',
    children: [
      {
        path: 'demand-action',
        component: DemandActionComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DemandNewRoutingModule {}

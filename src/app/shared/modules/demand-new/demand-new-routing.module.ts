import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ExitGuard } from '../../services/exit.guard';
import { DemandContainerComponent } from './containers/demand-container/demand-container.component';

const routes = [
  {
    path: '',
    children: [
      {
        path: 'demand-work',
        component: DemandContainerComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DemandNewRoutingModule {}

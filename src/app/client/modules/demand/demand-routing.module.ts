import { DemandPageComponent } from './components/demand-history-page/demand-history-page.component';
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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DemandRoutingModule {}

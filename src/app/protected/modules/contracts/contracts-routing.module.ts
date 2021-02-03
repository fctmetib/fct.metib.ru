import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ContractsPageComponent } from './components/contracts-page/contracts-page.component';

const routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ContractsPageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContractsRoutingModule {}

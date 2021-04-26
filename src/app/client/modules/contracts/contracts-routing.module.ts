import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ContractDetailsPageComponent } from './components/contract-details-page/contract-details-page.component';
import { ContractsPageComponent } from './components/contracts-page/contracts-page.component';

const routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ContractsPageComponent,
      },
      {
        path: 'details/:id',
        component: ContractDetailsPageComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContractsRoutingModule {}

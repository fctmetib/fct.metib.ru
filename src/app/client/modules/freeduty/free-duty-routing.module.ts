import {FreeDutyPageComponent} from './pages/free-duty-page/free-duty-page.component';

import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

const routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: FreeDutyPageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FreeDutyRoutingModule {
}

import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {RequestsPageComponent} from './pages/requests-page/requests-page.component';

const routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: RequestsPageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestsRoutingModule {
}

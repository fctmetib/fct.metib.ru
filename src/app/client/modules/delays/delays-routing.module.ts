import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DelaysPageComponent } from './delays-page/delays-page.component';

const routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: DelaysPageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DelaysRoutingModule {}

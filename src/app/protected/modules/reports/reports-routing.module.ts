import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReportsPageComponent } from './components/reports-page/reports-page.component';

const routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ReportsPageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportsRoutingModule {}

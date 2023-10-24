import { ReportViewPageComponent } from './components/report-view-page/report-view-page.component';
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
      {
        path: 'report-view',
        component: ReportViewPageComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportsRoutingModule {}

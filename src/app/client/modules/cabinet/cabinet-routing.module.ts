import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CabinetPageComponent } from './components/cabinet-page/cabinet-page.component';

const routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: CabinetPageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CabinetRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ExitGuard } from '../../services/exit.guard';

const routes = [
  {
    path: '',
    children: [
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DemandNewRoutingModule {}

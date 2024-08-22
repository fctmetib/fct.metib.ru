import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgentClientCabinetRoutingModule } from './agent-client-cabinet-routing.module';
import { CabinetPageComponent } from './components/cabinet-page.component';


@NgModule({
  declarations: [
    CabinetPageComponent
  ],
  imports: [
    CommonModule,
    AgentClientCabinetRoutingModule
  ]
})
export class AgentClientCabinetModule { }

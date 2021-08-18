import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'clients',
  styleUrls: ['./clients.component.scss'],
  templateUrl: 'clients.component.html'
})

export class ClientsComponent implements OnInit {
  constructor() { }

  ngOnInit() { }

  public openAstralList() {
    window.open('https://astral.ru/', '_blank');
  }

  public getContract() {
    window.open(`${window.location.origin}/assets/_files/factoring_contract.zip`);
  }

  public getInstruction() {
    window.open(`${window.location.origin}/assets/_files/FactorClientHelp.zip`);
  }

}

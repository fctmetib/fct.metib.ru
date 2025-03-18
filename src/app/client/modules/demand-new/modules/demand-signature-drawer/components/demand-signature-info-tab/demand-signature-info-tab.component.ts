import { Component, Input } from '@angular/core';

@Component({
  selector: 'mib-demand-signature-info-tab',
  templateUrl: './demand-signature-info-tab.component.html',
  styleUrls: ['./demand-signature-info-tab.component.scss']
})
export class DemandSignatureInfoTabComponent {
  @Input() data: any

  get legalAddress(): string {
    const legalAddress = this.data?.Organization?.LegalAddress
    return this.getFullAddress(legalAddress)
  }

  getFullAddress(data: any) {
    if (!data) {
      return ''
    }
    return `${data?.PostCode}, город ${data?.RegionTitle}, ${data?.Street}, ${data?.House}`
  }

  get factAddress(): string {
    const factAddress = this.data?.Organization?.FactAddress
    return this.getFullAddress(factAddress)
  }
}

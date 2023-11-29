import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  PLATFORM_ID,
} from '@angular/core';

@Component({
  selector: 'app-demand-result',
  templateUrl: './demand-result.component.html',
  styleUrls: ['./demand-result.component.scss'],
})
export class DemandResultComponent implements OnInit, OnDestroy {
  @Input()
  public result: any;

  ngOnInit() {
  }

  ngOnDestroy(): void {}

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object) {
  }

  public downloadCert() {
    let win: any = window;
    if (win.navigator && win.navigator.msSaveOrOpenBlob) {
      // download PDF in IE
      let byteChar = atob(this.result.CertificateData);
      let byteArray = new Array(byteChar.length);
      for (let i = 0; i < byteChar.length; i++) {
        byteArray[i] = byteChar.charCodeAt(i);
      }
      let uIntArray = new Uint8Array(byteArray);
      let blob = new Blob([uIntArray], { type: 'crt' });
      win.navigator.msSaveOrOpenBlob(blob, `certificate.crt`);
    } else {
      // Download PDF in Chrome etc.
      if (isPlatformBrowser(this.platformId)) {
        const source = `data:crt;base64,${this.result.CertificateData}`;
        const link = document.createElement('a');
        link.href = source;
        link.download = `certificate.crt`;
        link.click();
      }
    }
  }
}
// TODO: ADD INTERFACE
// AbonentCode: "1686334d-71b6-4f3b-8b20-5e8479f1c498"
// CertificateData: "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"
// Comment: "Изготовлен сертификат ЭП"
// Requests: [{Code: "c02573b0698b4950bf537276dafb05f0", ManagerID: 327, ManagerName: "Адиенко Наталья",…}]
// 0: {Code: "c02573b0698b4950bf537276dafb05f0", ManagerID: 327, ManagerName: "Адиенко Наталья",…}
// Code: "c02573b0698b4950bf537276dafb05f0"
// Date: "2019-07-01T15:06:52"
// ManagerID: 327
// ManagerName: "Адиенко Наталья"
// Type: "DigitalSignature"

import { DemandLocalActionsInterface } from './../../types/common/demand-local-actions.interface';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CryptoProService } from 'src/app/shared/services/common/cryprto-pro.service';
import { Certificate, createAttachedSignature, createDetachedSignature, createHash, getCertificate, getSystemInfo, getUserCertificates, isValidSystemSetup, SystemInfo } from 'crypto-pro';

@Component({
  selector: 'app-demand-page',
  templateUrl: './demand-page.component.html',
  styleUrls: ['./demand-page.component.scss'],
})
export class DemandPageComponent implements OnInit {
  actions: DemandLocalActionsInterface[] = [];

  isUserVerified: boolean = false;

  // TEST
  displayModal = false;
  isCertsLoading = false;
  certificateList: Certificate[] = [];
  selectedCert: Certificate;

  public message = 'METIB';
  public hash: string = null;
  public hashStatus = 'Не вычислен';
  public detachedSignature = true;
  public thumbprint: string = null;
  public signature: string = null;
  public signatureStatus = 'Не создана';
  public systemInfo: SystemInfo & {
    isValidSystemSetup: boolean;
  };
  public certificateListError: string = null;
  public certificateInfoError: string = null;
  public hashError: string = null;
  public signatureError: string = null;
  public systemInfoError: string = null;
  public certInfo = null;
  private setting = {
    element: {
      dynamicDownload: null as HTMLElement
    }
  }


  constructor(private authService: AuthService, private cryproService: CryptoProService) {}

  ngOnInit() {
    this.initActions();
    this.isUserVerified = this.authService.isUserVerified();

    this.displayCertificates();
    this.displaySystemInfo();
  }

  openCerts() {
    this.displayModal = true;
    this.isCertsLoading = true;
    this.cryproService.getCertificates().subscribe(resp => {
      // https://www.npmjs.com/package/crypto-pro
      console.log(resp)
      this.certificateList = resp;
      this.isCertsLoading = false;
    })
  }

  initActions() {
    this.actions = [
      {
        text: 'Запрос на редактирование профиля',
        url: 'actions/edit-profile',
        onlyNewClient: true,
      },
      {
        text: 'Запрос на свободную тему',
        url: 'actions/free-request',
        onlyNewClient: true,
      },
      {
        text: 'Запрос в техническую поддержку',
        url: 'actions/support-request',
        onlyNewClient: false,
      },
      {
        text: 'Запрос на ЭЦП',
        url: 'actions/create-eds',
        onlyNewClient: true,
      },
      {
        text: 'Запрос на поручительство',
        url: 'actions/surety',
        onlyNewClient: false,
      },
      {
        text: 'Запрос на факторинг',
        url: 'actions/factoring',
        onlyNewClient: true,
      },
      {
        text: 'Запрос на агентский факторинг',
        url: 'actions/agent-factoring',
        onlyNewClient: true,
      },
      {
        text: 'Запрос на увеличение лимита',
        url: 'actions/update-limit',
        onlyNewClient: false,
      },
      {
        text: 'Запрос на нового дебитора',
        url: 'actions/create-debitor',
        onlyNewClient: false,
      },
      {
        text: 'Регистрация канала верификации',
        url: 'actions/verify',
        onlyNewClient: false,
      },
    ];
  }

  ngOnDestroy() {}

  public download() {
    this.dyanmicDownloadByHtmlTag({
      fileName: 'Подпись',
      text: this.signature,
    });
  }

  private dyanmicDownloadByHtmlTag(arg: {
    fileName: string,
    text: string
  }) {
    if (!this.setting.element.dynamicDownload) {
      this.setting.element.dynamicDownload = document.createElement('a');
    }
    const element = this.setting.element.dynamicDownload;

    const fileType = this.detachedSignature ? '.sig' : '.sgn';
    element.setAttribute('href', `data:${fileType};charset=utf-8,${encodeURIComponent(arg.text)}`);
    element.setAttribute('download', `${arg.fileName}${fileType}`);

    var event = new MouseEvent("click");
    element.dispatchEvent(event);
  }

  public async createSignature(thumbprint) {
    this.hash = null;
    this.hashError = null;
    this.signature = null;
    this.signatureError = null;
    this.hashStatus = 'Вычисляется...';

    try {
      this.hash = await createHash(this.message);
    } catch (error) {
      this.hashError = error.message;

      return;
    }

    this.hashStatus = 'Не вычислен';
    this.signatureStatus = 'Создается...';

    if (this.detachedSignature) {
      try {
        this.signature = await createDetachedSignature(thumbprint, this.hash);
      } catch (error) {
        this.signatureError = error.message;
      }

      this.signatureStatus = 'Не создана';

      return;
    }

    try {
      this.signature = await createAttachedSignature(thumbprint, this.message);
    } catch (error) {
      this.signatureError = error.message;
    }

    this.signatureStatus = 'Не создана';
  }

  public async showCertInfo(thumbprint) {
    this.certInfo = null;
    this.certificateInfoError = null;

    try {
      const certificate = await getCertificate(thumbprint);

      this.certInfo = {
        name: certificate.name,
        issuerName: certificate.issuerName,
        subjectName: certificate.subjectName,
        thumbprint: certificate.thumbprint,
        validFrom: certificate.validFrom,
        validTo: certificate.validTo,
        isValid: await certificate.isValid(),
        version: await certificate.getCadesProp('Version'),
        base64: await certificate.exportBase64(),
        algorithm: await certificate.getAlgorithm(),
        extendedKeyUsage: await certificate.getExtendedKeyUsage(),
        ownerInfo: await certificate.getOwnerInfo(),
        issuerInfo: await certificate.getIssuerInfo(),
        decodedExtendedKeyUsage: await certificate.getDecodedExtendedKeyUsage(),
        '1.3.6.1.4.1.311.80.1': await certificate.hasExtendedKeyUsage('1.3.6.1.4.1.311.80.1'),
        '[\'1.3.6.1.5.5.7.3.2\', \'1.3.6.1.4.1.311.10.3.12\']': await certificate.hasExtendedKeyUsage([
          '1.3.6.1.5.5.7.3.2',
          '1.3.6.1.4.1.311.10.3.12'
        ]),
        '1.3.6.1.4.1.311.80.2': await certificate.hasExtendedKeyUsage('1.3.6.1.4.1.311.80.2'),
        '\'1.3.6.1.5.5.7.3.3\', \'1.3.6.1.4.1.311.10.3.12\'': await certificate.hasExtendedKeyUsage([
          '1.3.6.1.5.5.7.3.3',
          '1.3.6.1.4.1.311.10.3.12'
        ]),
      };
    } catch (error) {
      this.certificateInfoError = error.message;
    }
  }

  private async displayCertificates() {
    this.certificateListError = null;

    try {
      this.certificateList = await getUserCertificates();
    } catch (error) {
      this.certificateListError = error.message;
    }
  }

  private async displaySystemInfo() {
    this.systemInfoError = null;

    try {
      this.systemInfo = {
        ...await getSystemInfo(),
        isValidSystemSetup: await isValidSystemSetup()
      };
    } catch (error) {
      this.systemInfoError = error.message;
    }
  }
}

import { DemandLocalActionsInterface } from './../../types/common/demand-local-actions.interface';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CryptoProService } from 'src/app/shared/services/common/cryprto-pro.service';
import {
  Certificate,
  createAttachedSignature,
  createDetachedSignature,
  createHash,
  getCertificate,
  getSystemInfo,
  getUserCertificates,
  isValidSystemSetup,
  SystemInfo,
} from 'crypto-pro';
import { saveAs } from '@progress/kendo-file-saver';
import * as JSZip from 'jszip';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-demand-page',
  templateUrl: './demand-page.component.html',
  styleUrls: ['./demand-page.component.scss'],
})
export class DemandPageComponent implements OnInit, OnDestroy {
  actions: DemandLocalActionsInterface[] = [];

  isUserVerified: boolean = false;

  // TEST
  displayModal = false;
  isCertsLoading = false;
  certificateList: Certificate[] = [];
  selectedCert: Certificate;

  public message = 'METIB';
  public file: string | ArrayBuffer;
  public hash: string = null;
  public hashStatus = 'Не вычислен';
  public detachedSignature = true;
  public thumbprint: string = null;
  public signature: string = null;
  public fileSignature: string = null;
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
      dynamicDownload: null as HTMLElement,
    },
  };

  // TEST FILE
  public CADESCOM_CADES_BES = 1;
  public CAPICOM_CURRENT_USER_STORE = 2;
  public CAPICOM_MY_STORE = 'My';
  public CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED = 2;
  public CAPICOM_CERTIFICATE_FIND_SUBJECT_NAME = 1;
  public CADESCOM_BASE64_TO_BINARY = 1;

  public eds: string = '';
  public filesWithEDS: File[] = [];

  private subscription$: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private cryproService: CryptoProService
  ) {}

  ngOnInit() {
    this.initActions();
    this.isUserVerified = this.authService.isUserVerified();

    // this.displayCertificates();
    // this.displaySystemInfo();
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

  openCerts() {
    this.displayModal = true;
    this.isCertsLoading = true;
    this,
      this.subscription$.add(
        this.cryproService.getCertificates().subscribe((resp) => {
          // https://www.npmjs.com/package/crypto-pro
          this.certificateList = resp;
          this.isCertsLoading = false;
        })
      );
  }

  initActions() {
    this.actions = [
      {
        text: 'Запрос на редактирование профиля',
        url: 'actions/edit-profile',
        isForNewClient: true,
        isForDefaultClient: true,
      },
      {
        text: 'Запрос на свободную тему',
        url: 'actions/free-request',
        isForNewClient: false,
        isForDefaultClient: true,
      },
      // {
      //   text: 'Запрос в техническую поддержку',
      //   url: 'actions/support-request',
      //   isForNewClient: false,
      //   isForDefaultClient: false,
      // },
      {
        text: 'Запрос на ЭЦП',
        url: 'actions/create-eds',
        isForNewClient: true,
        isForDefaultClient: true,
      },
      {
        text: 'Запрос на поручительство',
        url: 'actions/surety',
        isForNewClient: true,
        isForDefaultClient: true,
      },
      {
        text: 'Запрос на факторинг',
        url: 'actions/factoring',
        isForNewClient: true,
        isForDefaultClient: true,
      },
      {
        text: 'Запрос на агентский факторинг',
        url: 'actions/agent-factoring',
        isForNewClient: true,
        isForDefaultClient: true,
      },
      {
        text: 'Запрос на увеличение лимита',
        url: 'actions/update-limit',
        isForNewClient: false,
        isForDefaultClient: true,
      },
      {
        text: 'Запрос на нового дебитора',
        url: 'actions/create-debitor',
        isForNewClient: false,
        isForDefaultClient: true,
      },
      {
        text: 'Регистрация канала верификации',
        url: 'actions/verify',
        isForNewClient: false,
        isForDefaultClient: true,
      },
    ];

    let user = this.authService.getUserFromStore();
    if (user && user.DebtorID) {
      let updateAction = this.actions.find(
        (x) => x.text === 'Запрос на агентский факторинг'
      );
      let updatedAction = {
        ...updateAction,
        isForNewClient: false,
        isForDefaultClient: false,
      };

      let index = this.actions.indexOf(updateAction);
      this.actions[index] = updatedAction;
    }
    if (user && user.CustomerID) {
      let updateAction = this.actions.find(
        (x) => x.text === 'Запрос на факторинг'
      );
      let updatedAction = {
        ...updateAction,
        isForNewClient: false,
        isForDefaultClient: false,
      };

      let index = this.actions.indexOf(updateAction);
      this.actions[index] = updatedAction;
    }
  }

  public downloadFile() {
    // this.dyanmicDownloadByHtmlTag({
    //   fileName: 'Подпись с файлом',
    //   text: this.fileSignature,
    // });

    const jszip = new JSZip();
    jszip.file('key.sig', this.fileSignature);
    jszip.file('file.jpg', this.file);

    jszip.generateAsync({ type: 'blob' }).then(function (content) {
      // see FileSaver.js
      saveAs(content, 'подпись.zip');
    });
  }

  public download() {
    this.dyanmicDownloadByHtmlTag({
      fileName: 'Подпись',
      text: this.signature,
    });
  }

  private dyanmicDownloadByHtmlTag(arg: { fileName: string; text: string }) {
    if (!this.setting.element.dynamicDownload) {
      this.setting.element.dynamicDownload = document.createElement('a');
    }
    const element = this.setting.element.dynamicDownload;

    const fileType = this.detachedSignature ? '.sig' : '.sgn';
    element.setAttribute(
      'href',
      `data:${fileType};charset=utf-8,${encodeURIComponent(arg.text)}`
    );
    element.setAttribute('download', `${arg.fileName}${fileType}`);

    var event = new MouseEvent('click');
    element.dispatchEvent(event);
  }

  public async createSignatureWithFile(thumbprint) {
    this.hash = null;
    this.hashError = null;
    this.fileSignature = null;
    this.signatureError = null;
    this.hashStatus = 'Вычисляется...';

    try {
      this.hash = await createHash(this.file);
    } catch (error) {
      this.hashError = error.message;

      return;
    }

    this.hashStatus = 'Не вычислен';
    this.signatureStatus = 'Создается...';

    if (this.detachedSignature) {
      try {
        this.fileSignature = await createDetachedSignature(
          thumbprint,
          this.hash
        );
      } catch (error) {
        this.signatureError = error.message;
      }

      this.signatureStatus = 'Не создана';

      return;
    }

    try {
      this.fileSignature = await createAttachedSignature(thumbprint, this.file);
    } catch (error) {
      this.signatureError = error.message;
    }

    this.signatureStatus = 'Не создана';
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
        '1.3.6.1.4.1.311.80.1': await certificate.hasExtendedKeyUsage(
          '1.3.6.1.4.1.311.80.1'
        ),
        "['1.3.6.1.5.5.7.3.2', '1.3.6.1.4.1.311.10.3.12']":
          await certificate.hasExtendedKeyUsage([
            '1.3.6.1.5.5.7.3.2',
            '1.3.6.1.4.1.311.10.3.12',
          ]),
        '1.3.6.1.4.1.311.80.2': await certificate.hasExtendedKeyUsage(
          '1.3.6.1.4.1.311.80.2'
        ),
        "'1.3.6.1.5.5.7.3.3', '1.3.6.1.4.1.311.10.3.12'":
          await certificate.hasExtendedKeyUsage([
            '1.3.6.1.5.5.7.3.3',
            '1.3.6.1.4.1.311.10.3.12',
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
        ...(await getSystemInfo()),
        isValidSystemSetup: await isValidSystemSetup(),
      };
    } catch (error) {
      this.systemInfoError = error.message;
    }
  }

  // Test

  onSelect(event, type: string) {
    let file: File = event.target.files[0];

    if (type === 'Rar') {
      let fileData;
      const jszip = new JSZip();
      jszip.loadAsync(file).then((zip) => {
        // <----- HERE
        Object.keys(zip.files).forEach((filename) => {
          // <----- HERE
          zip.files[filename].async('string').then((fileData) => {
            if (zip.files[filename].name.split('.')[1] === 'sig') {
              this.eds = fileData;
            } else {
              const imageBlob = this.dataURItoBlob(fileData);
              const imageFile = new File(
                [imageBlob],
                zip.files[filename].name,
                { type: zip.files[filename].name.split('.')[1] }
              );

              this.filesWithEDS.push(imageFile);
            }
            // <----- HERE
            fileData = fileData + '**$$##$$**' + fileData;
          });
        });
      });
    } else {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        let file = reader.result;
        this.file = file;
        // this.createSignatureWithFile(file);
      };
      reader.readAsArrayBuffer(file);
    }
  }

  dataURItoBlob(dataURI) {
    const arrayBuffer = new ArrayBuffer(dataURI);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < dataURI; i++) {
      int8Array[i] = dataURI.charCodeAt(i);
    }
    const blob = new Blob([int8Array]);
    return blob;
  }
}

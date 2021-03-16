import { FileModeInterface } from './../../../../../types/file/file-model.interface';
import { CommonService } from './../../../../../services/common/common.service';
import { DemandService } from '../../../services/demand.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { DemandSelectboxInterface } from '../../../types/common/demand-selectbox.interface';
import { FileService } from 'src/app/shared/services/common/file.service';
import { Guid } from 'src/app/shared/classes/common/guid.class';

@Component({
  selector: 'app-demand-action-factoring-page',
  templateUrl: './demand-action-factoring-page.component.html',
  styleUrls: ['./demand-action-factoring-page.component.scss'],
})
export class DemandActionFactoringPageComponent implements OnInit {
  isUserVerified: boolean;
  formFactoring: FormGroup;
  files: FileModeInterface[] = [];

  organizationTypes: DemandSelectboxInterface[] = [
    {
      title: 'Юридическое лицо',
      value: 'Юридическое лицо',
    },
    {
      title: 'ИП',
      value: 'ИП',
    },
  ];
  ruleTypes: DemandSelectboxInterface[] = [
    {
      title: 'ООО',
      value: 'ООО',
    },
  ];

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private commonService: CommonService,
    private fileService: FileService,
    private demandService: DemandService
  ) {}

  ngOnInit() {
    this.isUserVerified = this.authService.isUserVerified();
    this.initForm();
  }

  ngOnDestroy() {}

  initForm() {
    this.formFactoring = this.fb.group({
      organizationType: ['', [Validators.required]],
      organizationLegalForm: ['', [Validators.required]],
      organizationShortName: ['', [Validators.required]],
      organizationINN: ['', [Validators.required]],
      organizationPhone: ['', [Validators.required]],
      organizationEmail: ['', [Validators.required]],
      organizationWEB: ['', [Validators.required]],

      bankBik: ['', [Validators.required]],
      bankCorrespondentAccount: ['', [Validators.required]],
      bankName: ['', [Validators.required]],
      bankAccountOpenDate: ['', [Validators.required]],
      bankOwnerAccount: ['', [Validators.required]],
      bankComment: ['', [Validators.required]],

      otherBanks: this.fb.array([]),

      factoringProducts: ['', [Validators.required]],
      factoringTradeMarks: ['', [Validators.required]],
      factoringShipments: ['', [Validators.required]],
      factoringFinanceLimit: ['', [Validators.required]],
      factoringClients: ['', [Validators.required]],
      factoringWorkers: [0, [Validators.required]],

      factoringPlaces: this.fb.array([]),

      factoringCredits: this.fb.array([]),

      factoringEDIProviders: this.fb.array([]),

      filesRegulations: this.fb.group({
        id: [0],
        code: [''],
        fileName: [''],
        size: [0],
        identifier: ['Regulations'],
      }),

      fileGenDirPassport: this.fb.group({
        id: [0],
        code: [''],
        fileName: [''],
        size: [0],
        identifier: ['GenDirPassport'],
      }),

      fileGenDirProtocol: this.fb.group({
        id: [0],
        code: [''],
        fileName: [''],
        size: [0],
        identifier: ['GenDirProtocol'],
      }),

      fileGenDirOrder: this.fb.group({
        id: [0],
        code: [''],
        fileName: [''],
        size: [0],
        identifier: ['GenDirOrder'],
      }),

      // TODO: REWORK ON ARRAY
      // fileBalance: this.fb.array([]),
      fileBalance: this.fb.group({
        id: [0],
        code: [''],
        fileName: [''],
        size: [0],
        identifier: ['Balance'],
      }),

      // TODO: REWORK ON ARRAY
      fileOSV: this.fb.group({
        id: [0],
        code: [''],
        fileName: [''],
        size: [0],
        identifier: ['OSV'],
      }),

      fileShareReestr: this.fb.group({
        id: [0],
        code: [''],
        fileName: [''],
        size: [0],
        identifier: ['ShareReestr'],
      }),

      fileShareholders: this.fb.group({
        id: [0],
        code: [''],
        fileName: [''],
        size: [0],
        identifier: ['Shareholders'],
      }),

      fileContractDelivery: this.fb.group({
        id: [0],
        code: [''],
        fileName: [''],
        size: [0],
        identifier: ['ContractDelivery'],
      }),
    });
  }

  onSubmit() {
    console.log(this.formFactoring.value);
  }

  onSelect(event, type: string) {
    let files: File[] = event.files;

    for (let file of files) {
      let guid = Guid.newGuid();

      this.commonService.getBase64(file).subscribe((res) => {
        this.fileService
          .uploadFileChunks(res, file.name, file.size.toString(), guid)
          .subscribe(
            (res) => {
              console.log(res);
              this.addFileToForm(res, type);
            },
            (err) => console.log(err)
          );
      });
    }
  }

  addOtherBank(): void {
    let otherBanks = this.formFactoring.get('otherBanks') as FormArray;
    otherBanks.push(
      this.fb.group({
        otherBankAccountOpenDate: ['', [Validators.required]],
        otherBankAccountCloseDate: ['', [Validators.required]],
        otherBankName: ['', [Validators.required]],
        otherBankOwnerAccount: ['', [Validators.required]],
        otherBankTarget: ['', [Validators.required]],
      })
    );
  }

  addOtherPlace(): void {
    let factoringPlaces = this.formFactoring.get(
      'factoringPlaces'
    ) as FormArray;
    factoringPlaces.push(
      this.fb.group({
        factoringPlacesAddress: ['', [Validators.required]],
        factoringPlacesLegalForm: ['', [Validators.required]],
      })
    );
  }

  addFactoringCredits(): void {
    let factoringCredits = this.formFactoring.get(
      'factoringCredits'
    ) as FormArray;
    factoringCredits.push(
      this.fb.group({
        factoringCreditsCreditor: ['', [Validators.required]],
        factoringPlacesTypeDuty: ['', [Validators.required]],
        factoringPlacesDateClose: ['', [Validators.required]],
        factoringPlacesContractSum: ['', [Validators.required]],
        factoringPlacesBalanceReport: ['', [Validators.required]],
        factoringPlacesBalanceCurrent: ['', [Validators.required]],
      })
    );
  }

  addEDIProvider(): void {
    let factoringEDIProviders = this.formFactoring.get(
      'factoringEDIProviders'
    ) as FormArray;
    factoringEDIProviders.push(
      this.fb.group({
        factoringEDIProvidersDebitor: ['', [Validators.required]],
        factoringEDIProvidersProvider: ['', [Validators.required]],
      })
    );
  }

  remove(i: number, type: string): void {
    let other = this.formFactoring.get(type) as FormArray;
    other.removeAt(i)
  }

  addFileToForm(data: FileModeInterface, type: string): void {
    switch (type) {
      case 'Regulations':
        this.formFactoring.patchValue({
          filesRegulations: {
            id: data.ID,
            code: data.Code,
            fileName: data.FileName,
            size: data.Size,
          },
        });
        break;

      case 'GenDirPassport':
        this.formFactoring.patchValue({
          fileGenDirPassport: {
            id: data.ID,
            code: data.Code,
            fileName: data.FileName,
            size: data.Size,
          },
        });
        break;

      case 'GenDirProtocol':
        this.formFactoring.patchValue({
          fileGenDirProtocol: {
            id: data.ID,
            code: data.Code,
            fileName: data.FileName,
            size: data.Size,
          },
        });
        break;

      case 'GenDirOrder':
        this.formFactoring.patchValue({
          fileGenDirOrder: {
            id: data.ID,
            code: data.Code,
            fileName: data.FileName,
            size: data.Size,
          },
        });
        break;

      case 'Balance':
        this.formFactoring.patchValue({
          fileBalance: {
            id: data.ID,
            code: data.Code,
            fileName: data.FileName,
            size: data.Size,
          },
        });
        break;

      case 'OSV':
        this.formFactoring.patchValue({
          fileOSV: {
            id: data.ID,
            code: data.Code,
            fileName: data.FileName,
            size: data.Size,
          },
        });
        break;

      case 'ShareReestr':
        this.formFactoring.patchValue({
          fileShareReestr: {
            id: data.ID,
            code: data.Code,
            fileName: data.FileName,
            size: data.Size,
          },
        });
        break;

      case 'Shareholders':
        this.formFactoring.patchValue({
          fileShareholders: {
            id: data.ID,
            code: data.Code,
            fileName: data.FileName,
            size: data.Size,
          },
        });
        break;

      case 'ContractDelivery':
        this.formFactoring.patchValue({
          fileContractDelivery: {
            id: data.ID,
            code: data.Code,
            fileName: data.FileName,
            size: data.Size,
          },
        });
        break;
    }
  }

  // TODO: LINK IT WITH ARRAY CONTROLS
  addBalanceFile() {
    this.fb.group({
      id: [0],
      code: [''],
      fileName: [''],
      size: [0],
      identifier: ['Balance'],
    });
  }

  addOSVFile() {
    this.fb.group({
      id: [0],
      code: [''],
      fileName: [''],
      size: [0],
      identifier: ['OSV'],
    });
  }
}

import { Component, inject, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FileDnd } from 'src/app/shared/ui-kit/drag-and-drop/interfaces/drop-box.interface';
import { DrawerData } from 'src/app/shared/ui-kit/drawer/interfaces/drawer.interface';
import { DocumentReq } from '../../../requests/interfaces/request.interface';
import { extractBase64 } from 'src/app/shared/services/tools.service';
import { ToasterService } from 'src/app/shared/services/common/toaster.service';
import { BehaviorSubject, debounceTime, distinctUntilChanged, finalize, switchMap } from 'rxjs';
import { FormGenerator } from '../../../demand-new/tools/form-generator';
import { FormBuilder, FormGroup } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { GetAgentRequestService } from '../../../../../public/service/get-agent-request.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AgentDataInterface, AgentSuggestionsInterface } from '../../../../../public/type/agent.interface';
import { DemandsPrepareEnum } from '../../../demand-new/pages/demand-new-home/demand-new-home.component';
import { DemandService } from '../../../demand-new/services/demand.service';

@UntilDestroy()
@Component({
  selector: 'mib-verify-query-drawer',
  templateUrl: './verify-query-drawer.component.html',
  styleUrls: ['./verify-query-drawer.component.scss']
})
export class VerifyQueryDrawerComponent implements OnInit {
  public loading$ = new BehaviorSubject<boolean>(false)
  progress$ = new BehaviorSubject<number>(1);
  progress: number = 1;
  maxPage: number = 3;
  pageCount: number = 1;
  form: FormGroup;
  innData: AgentSuggestionsInterface;
  dataByINN = []

  fb = inject(FormBuilder)
  data: DrawerData = inject(MAT_DIALOG_DATA)
  dialogRef: MatDialogRef<VerifyQueryDrawerComponent> = inject(MatDialogRef)
  private getAgentRequestService = inject(GetAgentRequestService)
  private toaster = inject(ToasterService)
  private demandService = inject(DemandService)

  ngOnInit() {

    this.initForms()
    this.prepareDemandByTypes(DemandsPrepareEnum.Eds)

    this.getDataByINN();
  }

  getDataByINN() {
    this.form.get('organizationINN')?.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value => this.getAgentRequestService.getAgentData(value)),
      untilDestroyed(this)
    ).subscribe(options => {
      this.dataByINN = options.suggestions || [];
      this.innData = this.dataByINN.find((option) => this.form.get('organizationINN').value === option?.data?.inn)
      if (this.innData?.data) {
        this.patchOrganizationData(this.innData.data)
      }
    })
  }

  // todo: каюсь, слишком много хардкода, извините, простите, умоляю
  mapShortToCode(short) {
    const opfMapping = {
      "ООО": 1,
      "ЗАО": 2,
      "ПАО": 3,
      "ОАО": 4,
      "НАО": 5,
      "АО": 6,
    };

    return opfMapping[short] || null;
  }

  patchOrganizationData(data: AgentDataInterface) {
    this.form.patchValue({
      organizationType: this.mapShortToCode(data.opf?.short),
      organizationKPP: data.kpp || '',
      organizationOGRN: data.ogrn || '',
      organizationOKPO: data.okpo || '',
      organizationShortName: data.name.short || '',
      organizationFullName: data.name.full || '',
      organizationLegalForm: data.opf?.short || '',
      organizationPhone: data.phones?.[0]?.value || '',
      organizationEmail: data.emails?.[0]?.value || '',
      organizationLegalAddress: {
        address: data.address?.value || '',
      },
      organizationIsActualAdressEqual: true, // Ставим совпадение адресов по умолчанию
      organizationActualAddress: {
        address: data.address?.value || '',
      },
    });
  }

  nextPage() {
    if (this.pageCount >= 1 && this.pageCount <= this.maxPage - 1) {
      this.progress = this.progress$.value + 1;
      this.progress$.next(this.progress);
      this.pageCount = this.progress;
      console.log('next', this.progress);
    } else {
      return;
    }
  }

  prevPage() {
    if (this.pageCount >= 2 && this.pageCount <= this.maxPage) {
      this.progress = this.progress$.value - 1;
      this.progress$.next(this.progress);
      this.pageCount = this.progress;
      console.log('prev', this.progress);
    } else {
      return;
    }
  }

  onDocumentLoad({ file, url }: FileDnd) {
    const document: DocumentReq = {
      Description: `description ${file.name}`,
      DocumentTypeID: 40,
      Title: file.name,
      OwnerTypeID: 20,
      Data: extractBase64(url)
    };
    // this.addDocument(document)
  }

  private prepareDemandByTypes(type: DemandsPrepareEnum) {
    this.loading$.next(true)
    this.demandService.prepareDemandByTypes(type)
      .pipe(
        finalize(() => this.loading$.next(false)),
      )
      .subscribe(res => {
          console.log('prepareDemandByTypes=>', res);
        }
      );
  }

  submitData() {
    this.toaster.show(
      'failure',
      'Функционал в разработке!',
      '',
      true,
      false,
      3000
    );
    // this.dialogRef.close()
  }

  downloadFile() {
    this.toaster.show(
      'failure',
      'Функционал в разработке!',
      '',
      true,
      false,
      3000
    );
  }

  private initForms() {
    const formGenerator = new FormGenerator(this.fb);
    this.form = formGenerator.generateEDSForm();
  }
}

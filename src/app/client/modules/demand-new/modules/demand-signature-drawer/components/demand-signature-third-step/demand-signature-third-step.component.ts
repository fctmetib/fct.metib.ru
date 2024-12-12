import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  inject,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { FileDnd } from '../../../../../../../shared/ui-kit/drag-and-drop/interfaces/drop-box.interface';
import { DocumentReq } from '../../../../../requests/interfaces/request.interface';
import { downloadBase64File, extractBase64 } from '../../../../../../../shared/services/tools.service';
import { AbstractControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { CommonService } from '../../../../../../../shared/services/common/common.service';
import { catchError, of, tap } from 'rxjs';
import { DemandService } from '../../../../services/demand.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DrawerData } from '../../../../../../../shared/ui-kit/drawer/interfaces/drawer.interface';
import { FileMode } from '../../../../../../../shared/types/file/file-model.interface';

@Component({
  selector: 'mib-demand-signature-third-step',
  templateUrl: './demand-signature-third-step.component.html',
  styleUrls: ['./demand-signature-third-step.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemandSignatureThirdStepComponent implements OnInit {
  @Output() changeDoc: EventEmitter<{ type: string, form: FormGroup }> = new EventEmitter<{
    type: string,
    form: FormGroup
  }>();
  @Input() personalDataForm: FormGroup;
  @Input() docFormData: FormGroup;

  form: FormGroup;
  private docType = 'documentsScan';

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DrawerData
  ) {
  }

  get requestId(): number {
    return this.data.data.id
  }

  private cdr = inject(ChangeDetectorRef)
  private demandService = inject(DemandService)
  public commonService = inject(CommonService);
  public countries = [];
  selectedTitle: string = '';

  ngOnInit() {
    this.initForms();

    this.commonService.getCountries().subscribe(countries => {
      this.countries = countries;

      const selectedCountry = this.countries.find(country => country.Title);
      if (selectedCountry) {
        this.personalDataForm.patchValue({
          Nationality: selectedCountry.Title // Устанавливаем Title или другой нужный атрибут
        });
      }

      this.cdr.markForCheck()
    });
    console.log(this.countries);


  }


  private initForms(): void {
    this.form = this.docFormData.get('AllDocuments') as FormGroup;
    this.docFormData.markAllAsTouched();
    console.log(this.form);
  }

  public onDocumentLoad({ file, url }: FileDnd) {
    const document: DocumentReq = {
      Description: `description ${file.name}`,
      DocumentTypeID: 40,
      Title: file.name,
      OwnerTypeID: 20,
      Data: extractBase64(url),
      File: file
    };

    this.demandService.uploadDraftFile(file, 'documentsScan', this.requestId).pipe(
      tap(fileMode => {
        this.addDocument(fileMode);
      }),
      catchError(error => {
        console.error(`Ошибка загрузки файла ${file.name}:`, error);
        return of(null);
      })
    ).subscribe()
  }

  private addDocument(data: FileMode): void {
    const control: FormGroup = this.fb.group({
      ID: [null],
      Identifier: [null],
      Code: [null],
      FileName: [null],
      Size: [null],
      DemandFileID: [null],
    });
    control.patchValue(data)
    this.documents.push(control);
    this.changeDoc.emit({ type: this.docType, form: this.form });
  }

  get documents(): FormArray<any> {
    return this.form.get('documentsScan') as FormArray;
  }

  removeDocument(idx: number): void {
    const { DemandFileID } = this.documents.at(idx).getRawValue() as FileMode;

    this.demandService.deleteDemandFileById(DemandFileID).pipe(
      tap(() => {
        console.log('test');
        this.documents.removeAt(idx);
        this.changeDoc.emit({ type: this.docType, form: this.form });
      })
    ).subscribe();
  }

  downloadCurrentFile(document: AbstractControl): void {
    const { DemandFileID, FileName } = document.getRawValue() as FileMode;

    this.demandService
      .downloadFile(DemandFileID).pipe(
      tap(data => {
        downloadBase64File(data, FileName);
      }),
      catchError(error => {
        console.error(`Ошибка при скачивании файла "${FileName}":`, error);
        return of(null);
      })
    )
      .subscribe();

  }
}

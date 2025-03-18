import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import {ToasterService} from 'src/app/shared/services/common/toaster.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {DemandService} from '../../services/demand.service'
import {DestroyService} from '../../../../../shared/services/common/destroy.service'
import {takeUntil} from 'rxjs/operators'
import { tap } from 'rxjs';

@Component({
  selector: 'mib-demand-verification-drawer',
  templateUrl: './demand-verification-drawer.component.html',
  styleUrls: ['./demand-verification-drawer.component.scss'],
  providers:[DestroyService]
})
export class DemandVerificationDrawerComponent implements OnInit {
  form: FormGroup

  constructor(
    private toaster: ToasterService,
    public dialogRef: MatDialogRef<DemandVerificationDrawerComponent>,
    private fb: FormBuilder,
    private demandSrv: DemandService,
    private destroy$: DestroyService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    const info = data?.data
    // {
    //   "DebtorID": 0,
    //   "VerificationType": "",
    //   "GLN": "",
    //   "Comment": "",
    //   "DocumentTypes": [],
    //   "Type": "VerificationChannel",
    //   "Files": []
    // }
    this.form = this.fb.group({
      debtorID: ['', [Validators.required]],
      verificationType: ['Верификация А', [Validators.required]],
      gln: [null, [Validators.required]],
      comment: ['', [Validators.required]],
      documentTypes: this.fb.group({
        ORDER: [false],
        RECADV: [false],
      }),
    })

    if (info?.isEdit) this.getDemandByID(info.id)
  }

  ngOnInit() {
    this.enableAutoSaveDraft()
  }

  public submitData() {
    this.toaster.show(
      'failure',
      'Функционал в разработке!',
      '',
      true,
      false,
      3000
    )


    let test = this.form
    const ORDER = test.value.documentTypes.ORDER && 'ORDER'
    const RECADV = test.value.documentTypes.RECADV && 'RECADV'
    let documentTypes = [ORDER, RECADV].filter(item => {
      if (!item) {
        return
      }
      return item
    })
    console.log({
      ...test.value,
      type: 'VerificationChannel',
      documentTypes,
      files: [],
    })
    // this.dialogRef.close()
  }

  private getDemandByID(id: number) {
    this.demandSrv.getDemandDraftById(id).pipe(takeUntil(this.destroy$)).subscribe({
      next: val => {
        const demandData = val.DemandData as any
        this.form.patchValue({
          debtorID: demandData.DebtorID,
          verificationType: demandData.VerificationType,
          gln: demandData.GLN,
          comment: demandData.Comment
        })
      }
    })
  }

  private enableAutoSaveDraft() {
    this.form.valueChanges
      .pipe(
        tap(console.log)
      )
      .subscribe()
  }

}

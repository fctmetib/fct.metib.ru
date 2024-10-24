import {Component, Inject, Input} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {SignService} from '../../../services/share/sign.service';
import {BehaviorSubject, catchError, finalize, of, switchMap, tap, throwError} from 'rxjs';
import {RequestsService} from '../../../../client/modules/requests/services/requests.service';
import {FormControl, Validators} from '@angular/forms';
import {SignPinModalData, SignPinModalOutput} from './sign-pin-modal.interface';
import {ToasterService} from '../../../services/common/toaster.service';

@Component({
  selector: 'mib-sign-pin-modal',
  templateUrl: './sign-pin-modal.component.html',
  styleUrls: ['./sign-pin-modal.component.scss']
})
export class SignPinModalComponent {

  public isSigning$ = new BehaviorSubject<boolean>(false)

  public symbolsCount = 6
  public codeControl = new FormControl(null, [Validators.required, Validators.minLength(this.symbolsCount)])

  constructor(
    public dialogRef: MatDialogRef<SignPinModalComponent, SignPinModalOutput>,
    private signService: SignService,
    private requestsService: RequestsService,
    private toasterService: ToasterService,
    @Inject(MAT_DIALOG_DATA) private data: SignPinModalData
  ) {
  }

  onAction() {
    this.isSigning$.next(true)
    this.signService.createSession(this.codeControl.value).pipe(
      switchMap(() => this.data.action()),
      tap(data => {
        this.dialogRef.close({
          data,
          verified: true
        })
      }),
      catchError((err) => {
        this.toasterService.show('failure', 'Что-то пошло не так!')
        return throwError(err)
      }),
      finalize(() => {
        this.isSigning$.next(false)
      })
    ).subscribe()
  }

  closeModal() {
    this.dialogRef.close({
      verified: false
    })
  }
}

import {Component, Inject, Input} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {SignService} from '../../../services/share/sign.service';
import {BehaviorSubject, finalize, switchMap, tap} from 'rxjs';
import {RequestsService} from '../../../../client/modules/requests/services/requests.service';
import {FormControl, Validators} from '@angular/forms';

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
    public dialogRef: MatDialogRef<SignPinModalComponent>,
    private signService: SignService,
    private requestsService: RequestsService,
    @Inject(MAT_DIALOG_DATA) private requestIds: number[]
  ) {
  }

  onAction() {
    this.isSigning$.next(true)
    this.signService.createSession(this.codeControl.value).pipe(
      switchMap(() => this.requestsService.send(this.requestIds)),
      tap(() => {
        this.dialogRef.close()
      }),
      finalize(() => {
        this.isSigning$.next(false)
      })
    ).subscribe()
  }
}

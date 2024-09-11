import {Observable} from 'rxjs';
import {MatDialogRef} from '@angular/material/dialog';
import {SignPinModalComponent} from './sign-pin-modal.component';

export interface SignPinModalData<ActionType = Observable<any>> {
  action: () => Observable<ActionType>
}

export interface SignPinModalOutput<T = any> {
  data?: T
  verified: boolean
}

export type SignPinModalRef<T> = MatDialogRef<SignPinModalComponent, SignPinModalOutput<T>>

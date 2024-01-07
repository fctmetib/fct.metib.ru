import {Component} from '@angular/core'
import {MatDialogRef} from '@angular/material/dialog'
import {PinModalService} from './pin-modal.service'

@Component({
	selector: 'mib-pin-modal',
	templateUrl: './pin-modal.component.html',
	styleUrls: ['./pin-modal.component.scss']
})
export class PinModalComponent {
	constructor(public dialogRef: MatDialogRef<PinModalComponent>) {}
}

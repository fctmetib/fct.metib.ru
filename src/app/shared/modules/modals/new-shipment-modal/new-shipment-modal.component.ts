import {Component} from '@angular/core'
import {MatDialogRef} from '@angular/material/dialog'

@Component({
	selector: 'mib-new-shipment-modal',
	templateUrl: './new-shipment-modal.component.html',
	styleUrls: ['./new-shipment-modal.component.scss']
})
export class NewShipmentModalComponent {
	constructor(public dialogRef: MatDialogRef<NewShipmentModalComponent>) {}
}

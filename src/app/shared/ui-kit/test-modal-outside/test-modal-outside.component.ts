import {Component} from '@angular/core'
import {MatDialogRef} from '@angular/material/dialog'

@Component({
	selector: 'mib-test-modal-outside',
	templateUrl: './test-modal-outside.component.html',
	styleUrls: ['./test-modal-outside.component.scss']
})
export class TestModalOutsideComponent {
	constructor(public dialogRef: MatDialogRef<TestModalOutsideComponent>) {}

	closeModal(): void {
		this.dialogRef.close()
	}
}

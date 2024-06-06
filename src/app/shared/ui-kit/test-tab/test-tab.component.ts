import {Component} from '@angular/core'

@Component({
	selector: 'mib-test-tab',
	templateUrl: './test-tab.component.html',
	styleUrls: ['./test-tab.component.scss']
})
export class TestTabComponent {
	headers = ['Name', 'Age', 'Country', 'City', 'Occupation']
	data = [
		{
			Name: 'John',
			Age: 25,
			Country: 'USA',
			City: 'New York',
			Occupation: 'Developer'
		},
		{
			Name: 'Jane',
			Age: 30,
			Country: 'UK',
			City: 'London',
			Occupation: 'Designer'
		}
	]

	currentIndex = 0

	// constructor(public dialog: MatDialog) {}

	ngOnInit(): void {}

	getVisibleHeader() {
		return this.headers[this.currentIndex + 1]
	}

	getVisibleCell(row: any) {
		return row[this.headers[this.currentIndex + 1]]
	}

	next() {
		if (this.currentIndex < this.headers.length - 2) {
			this.currentIndex++
		}
	}

	previous() {
		if (this.currentIndex > 0) {
			this.currentIndex--
		}
	}

	openModal(row: any): void {
		console.log('halo data :>> ', row)
		// this.dialog.open(ModalContentComponent, {
		//   data: {
		//     headers: this.headers,
		//     ...row
		//   }
		// });
	}
}

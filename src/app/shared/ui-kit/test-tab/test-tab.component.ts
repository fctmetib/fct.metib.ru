import {Component} from '@angular/core'
import {TestTabService} from './test-tab.service'

@Component({
	selector: 'mib-test-tab',
	templateUrl: './test-tab.component.html',
	styleUrls: ['./test-tab.component.scss']
})
export class TestTabComponent {
	headers: string[] = []
	data: string[][] = []
	currentColumnIndex = 1

	constructor(private dataService: TestTabService) {}

	ngOnInit() {
		this.dataService.getHeaders().subscribe(headers => {
			this.headers = headers
		})

		this.dataService.getData().subscribe(data => {
			this.data = data
		})
	}

	nextColumn() {
		if (this.currentColumnIndex < this.headers.length - 1) {
			this.currentColumnIndex++
		}
	}

	prevColumn() {
		if (this.currentColumnIndex > 1) {
			this.currentColumnIndex--
		}
	}
}

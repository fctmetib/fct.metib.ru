import { HttpClient } from '@angular/common/http'
import { Component } from '@angular/core'
import {
	FileCellContent,
	FileCellStatus
} from './interfaces/file-cell.interface'
import { throwError } from 'rxjs'

@Component({
	selector: 'mib-file-cell',
	templateUrl: './file-cell.component.html',
	styleUrls: ['./file-cell.component.scss']
})
export class FileCellComponent {
	public file: File | null = null
	public status: FileCellStatus
	public content: FileCellContent

	constructor(private http: HttpClient) {}

	get classes() {
		return {
			[`file-cell_status-${this.status}`]: true,
			[`file-cell_content-${this.content}`]: true
		}
	}

	get ContentType() {
		// switch (this.file) {
		//   case value:

		//     break;

		//   default:
		//     break;
		// }
		return console.log('this.file', this.file)
	}

	ngOnInit(): void {}

	onChange(event: any) {
		const file: File = event.target.files[0]

		if (file) {
			this.status = 'initial'
			this.file = file
			if (this.file) {
				if (this.file.type === 'image/png') {
					console.log('IMAGE')
					this.content = 'image'
				} else {
					this.content = 'document'
					console.log('DOCUMENT')
				}
			}
			// if (this.file.type === 'image/png' || 'image/jpg' || 'image/jpeg') {
			// 	this.content = 'image'
			// } else {
			// 	this.content = 'document'
			// }
			console.log('this.file.type :>> ', this.file.type)
			console.log('this.content :>> ', this.content)
		}
	}

	onUpload() {
		if (this.file) {
			const formData = new FormData()
			formData.append('file', this.file, this.file.name)

			const upload$ = this.http.post('https://httpbin.org/post', formData)

			this.status = 'uploading'

			upload$.subscribe({
				next: () => {
					this.status = 'success'
				},
				error: (error: any) => {
					this.status = 'fail'
					return throwError(() => error)
				}
			})
		}
	}
}

import { HttpClient } from '@angular/common/http'
import { Component, Input } from '@angular/core'
import {
	FileCellContent,
	FileCellSize,
	FileCellStatus
} from './interfaces/file-cell.interface'
import { throwError } from 'rxjs'

@Component({
	selector: 'mib-file-cell',
	templateUrl: './file-cell.component.html',
	styleUrls: ['./file-cell.component.scss']
})
export class FileCellComponent {
	@Input() size: FileCellSize = 'm'
	public fileName = ''
	public file: File | null = null
	public status: FileCellStatus
	public content: FileCellContent

	constructor(private http: HttpClient) {}

	get classes() {
		return {
			[`file-cell_status-${this.status}`]: true,
			[`file-cell_content-${this.content}`]: true,
			[`file-cell_size-${this.size}`]: true
		}
	}

	get IconName() {
		let icon = ''
		switch (this.content) {
			case 'document':
				icon = 'fi_file'
				break
		}
		return icon
	}

	ngOnInit(): void {}

	onFileSelected($event: Event) {}

	onChange(event: any) {
		const file: File = event.target.files[0]

		if (file) {
			this.status = 'initial'
			this.file = file
			this.fileName = file.name
			const ft = this.file.type
			if (ft === 'image/png' || ft === 'image/jpg' || ft === 'image/jpeg') {
				this.content = 'image'
			} else {
				this.content = 'document'
			}
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

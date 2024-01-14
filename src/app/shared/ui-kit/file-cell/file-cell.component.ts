import {HttpClient, HttpEventType} from '@angular/common/http'
import {Component, Input} from '@angular/core'
import {
	FileCellContent,
	FileCellSize,
	FileCellStatus
} from './interfaces/file-cell.interface'
import {Subscription, throwError} from 'rxjs'
import {FileService} from '../../services/common/file.service'

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
	public uploadSub: Subscription
	progress: number = 0
	@Input() imageUrl = './assets/images/imageDoc.png'

	constructor(private http: HttpClient, private filesService: FileService) {}

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
			this.uploadSub = this.filesService
				.uploadFileWithProgress(this.file)
				.subscribe({
					next: event => {
						switch (event.type) {
							case HttpEventType.UploadProgress:
								this.status = 'uploading'
								if (event.total) {
									this.progress = Math.round((100 * event.loaded) / event.total)
								}
								break
							case HttpEventType.Response:
								setTimeout(() => {
									this.status = 'success'
								})
								break
						}
					},
					error: err => {
						this.status = 'fail'
						throwError(() => err)
					}
				})
		}
	}

	cancelUpload() {
		if (!(<Subscription>this.uploadSub)) {
			return
		} else {
			this.uploadSub.unsubscribe()
		}
		this.reset()
	}

	reset() {
		this.status = ''
		this.fileName = ''
		this.file = null
	}
}

import {
	Component,
	ElementRef,
	EventEmitter,
	Input,
	Output,
	ViewChild
} from '@angular/core'
import {FileDnd} from './interfaces/drop-box.interface'
import {DropDirective} from './directives/drop.directive'

@Component({
	selector: 'mib-dnd',
	templateUrl: './mib-drag-and-drop.component.html',
	styleUrls: ['./mib-drag-and-drop.component.scss']
})
export class MibDragAndDropComponent {
	@ViewChild(DropDirective) dropDirective: DropDirective
	@ViewChild('loader') loader!: ElementRef
	@Input() disabled: boolean = false
	@Input() text: string = 'Перетащите файл сюда или'
	@Input() actionText: string = 'выберите файл на диске'
	@Input() fileOverText: string = 'Перетащите файл сюда'
	@Input() headline: string = 'Прикрепите документ'
	@Input() IconName: string = ''
	@Input() showPicker: boolean = true
	@Input() showIcon: boolean = true
	@Input() loading: boolean = false
	@Input() accept: string[] = []
	@Input() multiple: boolean = false
	@Output() onLoad = new EventEmitter<void>()
	@Output() onChange = new EventEmitter<FileDnd>()

	public onChangeFile() {
		const files: File[] = Array.from(this.loader.nativeElement.files)
		this.formatFiles(files)
	}

	public openFileManager() {
		if (!this.loading && !this.disabled) {
			this.loader.nativeElement.click()
			this.loader.nativeElement.value = ''
		}
	}

	private formatFiles(files: File[]) {
		this.onLoad.emit()

		files.forEach((file: File) => {
			if (!this.accept.includes(file.type)) {
				return console.warn(
					this.accept,
					'Поддерживаются, но передан',
					file.type
				)
			}

			Promise.all([
				this.readFileAsDataURL(file),
				this.readFileAsArrayBuffer(file)
			])
				.then(([url, arrayBuffer]) => {
					const value = {file, url, arrayBuffer}
					this.onChange.emit(value)
				})
				.catch(error => console.error('Ошибка чтения файла', error))
		})
	}

	private readFileAsDataURL(file: File): Promise<string> {
		return new Promise((resolve, reject) => {
			const reader = new FileReader()
			reader.onload = () => resolve(reader.result as string)
			reader.onerror = () => reject(reader.error)
			reader.readAsDataURL(file)
		})
	}

	private readFileAsArrayBuffer(file: File): Promise<ArrayBuffer> {
		return new Promise((resolve, reject) => {
			const reader = new FileReader()
			reader.onload = () => resolve(reader.result as ArrayBuffer)
			reader.onerror = () => reject(reader.error)
			reader.readAsArrayBuffer(file)
		})
	}

	public onDrop(data: {files: File[]}) {
		if (!this.loading) {
			this.formatFiles(data.files)
		}
	}
}

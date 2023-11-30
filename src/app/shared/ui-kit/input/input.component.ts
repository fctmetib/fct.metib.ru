import {
	AfterContentInit,
	AfterViewChecked,
	AfterViewInit,
	Component,
	ContentChild,
	ElementRef,
	Renderer2,
	ViewChild,
	ViewEncapsulation
} from '@angular/core'
import { MibInputDirective } from './directives/mib-input.directive'
import { fromEvent, tap } from 'rxjs'

@Component({
	selector: 'mib-input',
	templateUrl: './input.component.html',
	styleUrls: ['./input.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class InputComponent
	implements AfterContentInit, AfterViewInit, AfterViewChecked
{
	@ContentChild(MibInputDirective, { descendants: true })
	inputDirective!: MibInputDirective

	@ViewChild('label') labelEl: ElementRef<HTMLSpanElement>
	@ViewChild('iconsLeft') iconsLeftEl: ElementRef<HTMLDivElement>
	@ViewChild('iconsRight') iconsRightEl: ElementRef<HTMLDivElement>
	@ViewChild('box') box: ElementRef<HTMLDivElement>
	@ViewChild('message') messageRef?: ElementRef

	constructor(private r2: Renderer2) {}

	ngAfterViewInit(): void {
		this.setIconPaddings()
    this.updateClasses()
		// console.log(
		// 	'inputDirectiveRefNative :>> ',
		// 	this.inputDirective.elementRef.nativeElement
		// )
	}

	setIconPaddings() {
		const leftWidth = this.iconsLeftEl.nativeElement.clientWidth
		const rightWidth = this.iconsRightEl.nativeElement.clientWidth

		const inputStyles = window.getComputedStyle(
			this.inputDirective.elementRef.nativeElement
		)

		const paddingRight = inputStyles.getPropertyValue('padding-right')
		const paddingLeft = inputStyles.getPropertyValue('padding-left')

		const newPaddingRight = `calc(${paddingRight} + ${rightWidth}px)`
		const newPaddingLeft = `calc(${paddingLeft} + ${leftWidth}px)`

		this.r2.setStyle(
			this.inputDirective.elementRef.nativeElement,
			'padding-right',
			newPaddingRight
		)

		this.r2.setStyle(
			this.inputDirective.elementRef.nativeElement,
			'padding-left',
			newPaddingLeft
		)

		this.r2.setStyle(this.labelEl.nativeElement, 'padding-left', newPaddingLeft)
	}

	focus() {
		this.inputDirective.elementRef.nativeElement.focus()
	}

	get isMessageEmpty(): boolean {
		const node = this.messageRef?.nativeElement
		for (let i = 0; i < node?.childNodes?.length; i++) {
			const child = node.childNodes[i]
			if (
				child.nodeType !== Node.COMMENT_NODE &&
				child.textContent.trim() !== ''
			) {
				return false
			}
		}
		return true
	}

	isResizing: boolean = false
	startPosX: number = 0
	startPosY: number = 0

	public classes: string[] = []
	public input?: HTMLInputElement
	public textarea?: HTMLTextAreaElement

	public maxLength: number = 0
	public textLength: number = 0

	ngAfterContentInit() {
		if (this.inputDirective) {
			if (this.inputDirective.elementRef.nativeElement.tagName === 'TEXTAREA') {
				this.textarea = this.inputDirective.elementRef
					.nativeElement as unknown as HTMLTextAreaElement
				this.maxLength = this.textarea.maxLength
				this.textLength = this.textarea.textLength
				fromEvent(this.textarea, 'input')
					.pipe(
						tap(event => {
							setTimeout(() => {
								const target = event.target as HTMLTextAreaElement
								this.maxLength = target.maxLength
								this.textLength = target.textLength
							})
						})
					)
					.subscribe()
			} else {
				this.input = this.inputDirective.elementRef
					.nativeElement as HTMLInputElement
			}
		} else {
			throw new Error('mib-input should contains <input mibInput/>!')
		}
	}

	ngAfterViewChecked() {
		this.updateClasses()
	}

	private updateClasses() {
		this.classes = []
		if (this.iconsLeftEl.nativeElement.children.length > 0)
			this.classes.push('input_left-iconly')
		if (this.iconsRightEl.nativeElement.children.length > 0)
			this.classes.push('input_right-iconly')
		// ERRORIUS!!!!!
		// this.classes.forEach(clazz => this.input?.classList.add(clazz) || this.textarea?.classList.add(clazz));
		this.classes.forEach(clazz => this.input?.classList.add(clazz))
		this.classes.forEach(clazz => this.textarea?.classList.add(clazz))
	}

	startResize(event: MouseEvent) {
		event.preventDefault()
		this.isResizing = true
		this.startPosX = event.clientX
		this.startPosY = event.clientY
	}

	stopResize($event: MouseEvent) {
		this.isResizing = false
	}

	onMouseMove(event: MouseEvent) {
		if (this.isResizing) {
			const deltaX = event.clientX - this.startPosX
			const deltaY = event.clientY - this.startPosY
			if (this.textarea) {
				this.textarea.style.width = this.textarea.offsetWidth + deltaX + 'px'
				this.textarea.style.height = this.textarea.offsetHeight + deltaY + 'px'
			}
			this.startPosX = event.clientX
			this.startPosY = event.clientY
		}
	}
}

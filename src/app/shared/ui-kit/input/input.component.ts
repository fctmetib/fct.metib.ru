import {
	AfterViewInit,
	Component,
	ContentChild,
	ElementRef,
	Renderer2,
	ViewChild,
	ViewEncapsulation
} from '@angular/core'
import { MetibInputDirective } from './directives/metib-input.directive'

@Component({
	selector: 'mib-input',
	templateUrl: './input.component.html',
	styleUrls: ['./input.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class InputComponent implements AfterViewInit {
	@ContentChild(MetibInputDirective, { descendants: true })
	inputDirective!: MetibInputDirective

	@ViewChild('label') label: ElementRef<HTMLSpanElement>
	@ViewChild('iconsLeft') iconsLeftEl: ElementRef<HTMLDivElement>
	@ViewChild('iconsRight') iconsRightEl: ElementRef<HTMLDivElement>
	@ViewChild('box') box: ElementRef<HTMLDivElement>

	constructor(private r2: Renderer2) {}

	ngAfterViewInit(): void {
		this.setIconPaddings()
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

		this.r2.setStyle(this.label.nativeElement, 'padding-left', newPaddingLeft)
	}

	focus() {
		this.inputDirective.elementRef.nativeElement.focus()
	}
}

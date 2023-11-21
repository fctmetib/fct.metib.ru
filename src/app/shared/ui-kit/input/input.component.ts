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

	@ViewChild('iconsLeft') iconsLeft: ElementRef<HTMLDivElement>
	@ViewChild('iconsRight') iconsRight: ElementRef<HTMLDivElement>
	@ViewChild('box') box: ElementRef<HTMLDivElement>

	constructor(private r2: Renderer2) {}

	ngAfterViewInit(): void {
		this.setIconPaddings()
	}

	setIconPaddings() {
		const leftLength = this.iconsLeft.nativeElement.children.length
		const rightLength = this.iconsRight.nativeElement.children.length

		const boxStyles = window.getComputedStyle(this.box.nativeElement)
		const iconSize = boxStyles.getPropertyValue(
			`--input-${this.inputDirective.size}-icon-size`
		)
		const iconsGap = boxStyles.getPropertyValue(
			`--input-${this.inputDirective.size}-icons-gap`
		)

		const inputStyles = window.getComputedStyle(
			this.inputDirective.elementRef.nativeElement
		)

		const paddingRight = inputStyles.getPropertyValue('padding-right')
		const paddingLeft = inputStyles.getPropertyValue('padding-left')

		const newPaddingRight = `calc(${paddingRight} + ${iconSize} * ${rightLength} + ${
			rightLength - 1
		} * ${iconsGap})`

		const newPaddingLeft = `calc(${paddingLeft} + ${iconSize} * ${leftLength} + ${
			leftLength - 1
		} * ${iconsGap})`

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
	}

	focus() {
		this.inputDirective.elementRef.nativeElement.focus()
	}
}

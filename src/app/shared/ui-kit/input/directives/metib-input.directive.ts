import { Directive, ElementRef } from '@angular/core'

@Directive({
	selector: '[mibInput]'
})
export class MetibInputDirective {
	constructor(public el: ElementRef<HTMLInputElement>) {}
}

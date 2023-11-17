import { Directive, ElementRef } from '@angular/core'

@Directive({
	selector: '[mibInputDirective]'
})
export class MetibInputDirective {
	constructor(public el: ElementRef<HTMLInputElement>) {}
}

import { Component, ContentChild, ViewEncapsulation } from '@angular/core'
import { MetibInputDirective } from './directives/metib-input.directive'

@Component({
	selector: 'mib-input',
	templateUrl: './input.component.html',
	styleUrls: ['./input.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class InputComponent {
	@ContentChild(MetibInputDirective, { descendants: true })
	inputDirective!: MetibInputDirective

	focus() {
		this.inputDirective.el.nativeElement.focus()
	}
}

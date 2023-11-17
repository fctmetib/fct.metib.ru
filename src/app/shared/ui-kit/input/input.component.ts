import { AfterViewInit, Component, ContentChild } from '@angular/core'
import { MetibInputDirective } from './directives/metib-input.directive'
import { ViewEncapsulation } from '@angular/compiler'

@Component({
	selector: 'app-input',
	templateUrl: './input.component.html',
	styleUrls: ['./input.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class InputComponent {
	@ContentChild(MetibInputDirective, { descendants: true })
	inputDirective!: MetibInputDirective

	blur() {
		this.inputDirective.el.nativeElement.blur()
	}
}

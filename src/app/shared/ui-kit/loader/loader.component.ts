import {AfterViewInit, Component, Input, Renderer2} from '@angular/core'
import {LoaderSize} from './interfaces/loader.interface'
import {BehaviorSubject} from 'rxjs'

@Component({
	selector: 'mib-loader',
	templateUrl: './loader.component.html',
	styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements AfterViewInit {
	@Input() inverted: boolean = false
	@Input() size: LoaderSize = 'l'
	@Input() showCancel: boolean = false

	@Input() progs = 0

	@Input() prog = new BehaviorSubject(0)

	constructor(private r2: Renderer2) {}

	ngAfterViewInit(): void {
		// this.setProgress(this.prog)
		console.log('this.prog :>> ', this.prog)
	}

	get classes() {
		return {
			[`loader_inverted-${this.inverted}`]: true,
			[`loader_size-${this.size}`]: true
		}
	}

	setProgress(progs: number) {
		const circle = this.r2.selectRootElement('.progress-ring')
		const radius = circle.r.baseVal.value
		const circumference = 2 * Math.PI * radius

		console.log('this.prog :>> ', this.progs)

		circle.style.strokeDasharray = `${circumference} ${circumference}`
		circle.style.strokeDashoffset = this.progs

		const offcet = circumference - (this.progs / 100) * circumference
		circle.style.strokeDashoffset = offcet
	}
}

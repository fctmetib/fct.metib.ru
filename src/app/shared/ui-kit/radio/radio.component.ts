import {
	Component,
	Input,
	OnInit,
} from '@angular/core'
import {MibRadioSize} from './interfaces/radio.interface'
import {RadioGroupComponent} from './components/radio-group.component';

@Component({
	host: {
		'[class]': 'align'
	},
	selector: 'mib-radio',
	templateUrl: './radio.component.html',
	styleUrls: ['./radio.component.scss']
})
export class RadioComponent implements OnInit {
	@Input() size: MibRadioSize = 'm'
	@Input() class: string = ''
	@Input() align: string = 'flex_align-self-start'
  @Input() value: any = ''

	constructor(
    private group: RadioGroupComponent
  ) {
	}

  get checked() {
    return this.group.match(this.value)
  }

	ngOnInit() {
	}

  onRadioChange() {
    this.group.setActiveRadio(this)
  }
}

import {
  Component,
  ViewChild,
} from '@angular/core'
import {InputBaseWrapperComponent} from './components/input-base-wrapper/input-base-wrapper.component';

@Component({
  selector: 'mib-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  @ViewChild(InputBaseWrapperComponent) wrapper: InputBaseWrapperComponent
}

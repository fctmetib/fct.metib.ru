import {
  Component, ContentChild, forwardRef,
  ViewChild,
} from '@angular/core'
import {InputBaseWrapperComponent} from './components/input-base-wrapper/input-base-wrapper.component';
import {MibInputDirective} from './directives/mib-input.directive';
import {MibTextareaDirective} from '../textarea/directives/mib-textarea.directive';

@Component({
  selector: 'mib-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  @ContentChild(MibInputDirective, {descendants: true}) inputDirective: MibInputDirective
}

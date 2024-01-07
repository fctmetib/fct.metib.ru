import {
  Component, ContentChild, ContentChildren, forwardRef, QueryList,
  ViewChild,
} from '@angular/core'
import {InputBaseWrapperComponent} from './components/input-base-wrapper/input-base-wrapper.component';
import {MibInputDirective} from './directives/mib-input.directive';
import {MibTextareaDirective} from '../textarea/directives/mib-textarea.directive';
import {LeftIconDirective} from '../../directives/left-icon/left-icon.directive';
import {RightIconDirective} from '../../directives/right-icon/right-icon.directive';

@Component({
  selector: 'mib-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  @ContentChild(MibInputDirective, {descendants: true}) inputDirective: MibInputDirective

  @ContentChildren(LeftIconDirective, {descendants: true}) leftIcons: QueryList<LeftIconDirective>
  @ContentChildren(RightIconDirective, {descendants: true}) rightIcons: QueryList<RightIconDirective>
}

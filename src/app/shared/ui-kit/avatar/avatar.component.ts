import {AfterViewInit, Component, Input} from '@angular/core';
import {AvatarType} from './interfaces/picture-type.interface';

@Component({
  selector: 'mib-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements AfterViewInit {
  @Input() src: string = ''
  @Input() type: AvatarType = 'square'
  @Input() showImage: boolean = false;

  ngAfterViewInit() {
  }

}

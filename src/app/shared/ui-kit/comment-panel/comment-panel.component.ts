import {Component, Input} from '@angular/core'
import {RequestState} from '../../../client/modules/requests/interfaces/request.interface';

@Component({
	selector: 'mib-comment-panel',
	templateUrl: './comment-panel.component.html',
	styleUrls: ['./comment-panel.component.scss']
})
export class CommentPanelComponent {
	@Input() extracted: boolean = false
	@Input() showActions: boolean = true
	@Input() showLink: boolean = true
	@Input() showAttached: boolean = true
	@Input() file: boolean = true
	@Input() showTitle: boolean = true
	@Input() showAvatar: boolean = true
	@Input() showHead: boolean = true
	@Input() data: RequestState

  public robotAvatar = './assets/images/robot.svg'
  public userAvatar = './assets/images/user-avatar.jpg'

  public isTextExtended: boolean = false;

  get isRobot() {
    return this.data?.Author === '  Robot'
  }

  toggleTextExtension() {
    this.isTextExtended = !this.isTextExtended;
  }
}

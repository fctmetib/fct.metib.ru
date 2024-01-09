import {Component, Input} from '@angular/core'

@Component({
	selector: 'mib-comment-panel',
	templateUrl: './comment-panel.component.html',
	styleUrls: ['./comment-panel.component.scss']
})
export class CommentPanelComponent {
	@Input() textExtention: boolean = false
	@Input() extracted: boolean = false
	@Input() showActions: boolean = true
	@Input() showText: boolean = true
	@Input() showLink: boolean = true
	@Input() showAttached: boolean = true
	@Input() file: boolean = true
	@Input() showTitle: boolean = true
	@Input() showAvatar: boolean = true
	@Input() showHead: boolean = true
	@Input() data: {}

	// Avatar = './assets/images/user-avatar.jpg'
	// user = {Name: 'Назаров Егор Михайлович', Date: '2024-01-08T09:03:06.693Z'}

	// get getUserAvatar() {
	// 	return this.Avatar
	// }
}

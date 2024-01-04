import {
	AnimationTriggerMetadata,
	animate,
	style,
	transition,
	trigger
} from '@angular/animations'

export const modalAnimation: AnimationTriggerMetadata = trigger(
	'modalAnimation',
	[
		transition('void = > *', [
			style({transform: 'translateX(60%)', opacity: 0}),
			animate('250ms ease', style({transform: 'translateX(0)', opacity: 1}))
		])
	]
)

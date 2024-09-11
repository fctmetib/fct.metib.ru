import {animate, AnimationTriggerMetadata, style, transition, trigger} from "@angular/animations";

export const drawerAnimation: AnimationTriggerMetadata = trigger('drawerAnimation', [
  transition('void => *', [
    style({transform: 'translateX(60%)', opacity: 0}),
    animate('250ms ease', style({transform: 'translateX(0)', opacity: 1}))
  ])
]);

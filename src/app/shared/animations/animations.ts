import { animate, style, transition, trigger } from '@angular/animations';

export const OpacityViewAnimation = trigger('opacityViewAnimation', [
  // Анимация для появления элемента (когда он входит в DOM)
  transition(':enter', [
    style({ opacity: 0 }), // начальное состояние с нулевой прозрачностью
    animate('{{enterTime}}ms ease', style({ opacity: 1 })) // анимация до полной непрозрачности
  ]),

  // Анимация для исчезновения элемента (когда он уходит из DOM)
  transition(':leave', [
    style({ opacity: 1 }), // начальное состояние с полной непрозрачностью
    animate('{{leaveTime}}ms ease', style({ opacity: 0 })) // анимация до полной прозрачности
  ], {params: {enterTime: 200, leaveTime: 200}})
]);

export const SlideFromRightAnimation = trigger('slideFromRightAnimation', [
  // Анимация для появления элемента (когда он входит в DOM)
  transition(':enter', [
    style({ opacity: 0, transform: 'translateX(100%)' }), // начальное состояние с нулевой прозрачностью и смещением вправо
    animate('200ms ease', style({ opacity: 1, transform: 'translateX(0)' })) // анимация до полной непрозрачности и возврат в исходное положение
  ]),

  // Анимация для исчезновения элемента (когда он уходит из DOM)
  transition(':leave', [
    style({ opacity: 1, transform: 'translateX(0)' }), // начальное состояние с полной непрозрачностью и без смещения
    animate('1200ms ease', style({ opacity: 0, transform: 'translateX(100%)' })) // анимация до полной прозрачности и смещение вправо
  ])
]);

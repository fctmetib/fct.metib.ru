import { trigger, transition, style, animate } from '@angular/animations';

interface AnimationConfig {
  direction: 'left' | 'right' | 'top' | 'bottom';
  translateDistance?: string;
  duration?: number;
  startOpacity?: number;
  endOpacity?: number;
  triggerEvent?: 'enter' | 'leave' | 'change';
}


const defaultConfig: AnimationConfig = {
  direction: 'left',
  translateDistance: '100%',
  duration: 200,
  startOpacity: 0,
  endOpacity: 1,
  triggerEvent: 'change'
};

export class AnimationService {

  constructor() { }

  // Объединение пользовательской конфигурации с конфигурацией по умолчанию
  private getEffectiveConfig(config: Partial<AnimationConfig>): AnimationConfig {
    return { ...defaultConfig, ...config };
  }

  generateAnimation(config: Partial<AnimationConfig>) {
    const effectiveConfig = this.getEffectiveConfig(config);
    const translateDirection = this.getTranslateDirection(effectiveConfig.direction, effectiveConfig.triggerEvent !== 'leave', effectiveConfig.translateDistance);

    let transitionState: string;
    switch (effectiveConfig.triggerEvent) {
      case 'enter':
        transitionState = ':enter';
        break;
      case 'leave':
        transitionState = ':leave';
        break;
      case 'change':
      default:
        transitionState = 'false => true'; // Отлавливаем любое изменение состояния
        break;
    }

    return trigger('slideAnimation', [
      transition(transitionState, [
        style({ opacity: effectiveConfig.startOpacity, transform: `translate(0, 0)` }),
        animate(`${effectiveConfig.duration}ms ease`, style({ opacity: effectiveConfig.endOpacity, transform: `translate${translateDirection}` }))
      ])
    ]);
  }

  private getTranslateDirection(direction: 'left' | 'right' | 'top' | 'bottom', isEntering: boolean, distance: string) {
    const translateValues = {
      'left': isEntering ? `X(${distance})` : `X(-${distance})`,
      'right': isEntering ? `X(-${distance})` : `X(${distance})`,
      'top': isEntering ? `Y(${distance})` : `Y(-${distance})`,
      'bottom': isEntering ? `Y(-${distance})` : `Y(${distance})`
    };
    return translateValues[direction];
  }
}

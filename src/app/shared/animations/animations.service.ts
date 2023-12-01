import { trigger, transition, style, animate } from '@angular/animations';

interface AnimationConfig {
  direction: 'left' | 'right' | 'top' | 'bottom';
  translateDistance?: string;
  duration?: string;
  startOpacity?: number;
  endOpacity?: number;
}

const defaultConfig: AnimationConfig = {
  direction: 'left',
  translateDistance: '100%',
  duration: '200ms',
  startOpacity: 0,
  endOpacity: 1
};

export class AnimationService {

  constructor() { }

  // Объединение пользовательской конфигурации с конфигурацией по умолчанию
  private getEffectiveConfig(config: Partial<AnimationConfig>): AnimationConfig {
    return { ...defaultConfig, ...config };
  }

  generateSlideInAnimation(config: Partial<AnimationConfig>) {
    const effectiveConfig = this.getEffectiveConfig(config);
    const translateDirection = this.getTranslateDirection(effectiveConfig.direction, true, effectiveConfig.translateDistance);
    return trigger('slideInAnimation', [
      transition(':enter', [
        style({ opacity: effectiveConfig.startOpacity, transform: `translate${translateDirection}` }),
        animate(`${effectiveConfig.duration} ease`, style({ opacity: effectiveConfig.endOpacity, transform: 'translateX(0)' }))
      ])
    ]);
  }

  generateSlideOutAnimation(config: Partial<AnimationConfig>) {
    const effectiveConfig = this.getEffectiveConfig(config);
    const translateDirection = this.getTranslateDirection(effectiveConfig.direction, false, effectiveConfig.translateDistance);
    return trigger('slideOutAnimation', [
      transition(':leave', [
        style({ opacity: effectiveConfig.startOpacity, transform: 'translateX(0)' }),
        animate(`${effectiveConfig.duration} ease`, style({ opacity: effectiveConfig.endOpacity, transform: `translate${translateDirection}` }))
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

import {Renderer2, Inject, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

export interface SetInputIconsPaddings {
  leftEl: HTMLDivElement
  rightEl: HTMLDivElement
  element: HTMLElement
}

export interface InputIconsPaddings {
  newPaddingRight: string
  newPaddingLeft: string
}

export const setPaddings = ({ leftEl, rightEl, element }: SetInputIconsPaddings, r2: Renderer2, window: Window, callback?: (data: InputIconsPaddings) => void) => {
  const leftWidth = leftEl.clientWidth
  const rightWidth = rightEl.clientWidth

  const inputStyles = window.getComputedStyle(element)

  const paddingRight = inputStyles.getPropertyValue('padding-right')
  const paddingLeft = inputStyles.getPropertyValue('padding-left')

  const newPaddingRight = `calc(${paddingRight} + ${rightWidth}px)`
  const newPaddingLeft = `calc(${paddingLeft} + ${leftWidth}px)`

  r2.setStyle(element, 'padding-right', newPaddingRight)
  r2.setStyle(element, 'padding-left', newPaddingLeft)

  callback?.({newPaddingRight, newPaddingLeft})
}

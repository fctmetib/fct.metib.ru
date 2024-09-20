import {
	Component,
	ElementRef,
	HostBinding,
	HostListener,
	Inject,
	Input,
	PLATFORM_ID
} from '@angular/core'
import {DropdownService} from './services/dropdown.service'
import {Properties} from 'csstype'
import {ScrollService} from '../../services/scroll.service'
import {animate, style, state, transition, trigger} from '@angular/animations'
import {ToolsService} from '../../services/tools.service'
import {isPlatformBrowser} from '@angular/common'

const ANIMATION_DURATION = 200

@Component({
	selector: 'mib-dropdown',
	templateUrl: './dropdown.component.html',
	styleUrls: ['./dropdown.component.scss'],
	animations: [
		trigger('dropdownAnimation', [
			state(
				'false',
				style({
					opacity: 0,
					transform: 'translateY(-10px)'
				})
			),
			state(
				'true',
				style({
					opacity: 1,
					transform: 'translateY(0)'
				})
			),
			transition('false <=> true', [animate(`${ANIMATION_DURATION}ms ease`)])
		])
	]
})
export class DropdownComponent {
	@HostBinding('style') style: Properties = {}
	@HostBinding('@dropdownAnimation')
	@HostBinding('class.dropdown-open')
	isVisible = false
	@HostBinding('class.dropdown-above') isAbove = false
	@Input() reference: HTMLElement | null = null

	private lastTrigger: HTMLElement | null = null
	private timeoutId: any = null
	public id: string = null

	constructor(
		public menuService: DropdownService,
		private toolsService: ToolsService,
		private elRef: ElementRef,
		private scrollService: ScrollService,
		@Inject(PLATFORM_ID) private platformId: Object
	) {}

	ngOnInit() {
		this.id = this.toolsService.generateId()
	}

	ngOnDestroy() {
		if (this.timeoutId) {
			clearTimeout(this.timeoutId)
		}
	}

	@HostListener('window:resize')
	onResize() {
		if (
			this.isVisible &&
			this.lastTrigger &&
			isPlatformBrowser(this.platformId)
		) {
			this.positionMenu(this.lastTrigger)
		}
	}

	@HostListener('document:click', ['$event.target'])
	onDocumentClick(target: HTMLElement) {
		if (
			isPlatformBrowser(this.platformId) && // Проверка, что выполняется в браузере
			this.isVisible &&
			this.lastTrigger &&
			!this.elRef.nativeElement.contains(target)
		) {
			this.menuService.closeMenu()
		}
	}

	toggle(trigger: HTMLElement) {
		this.isVisible = !this.isVisible
		this.lastTrigger = trigger // Сохраняем последний триггер

		if (this.isVisible && isPlatformBrowser(this.platformId)) {
			this.scrollService.blockScroll()
			requestAnimationFrame(() => this.positionMenu(trigger))
		} else {
			this.close()
		}
	}

	close() {
		if (isPlatformBrowser(this.platformId)) {
			this.scrollService.allowScroll()
		}
		this.isVisible = false
		this.isAbove = false

		// Очистка предыдущего таймера
		if (this.timeoutId) {
			clearTimeout(this.timeoutId)
		}

		// Установка нового таймера
		this.timeoutId = setTimeout(() => {
			if (!this.isVisible) {
				this.style = {}
			}
			this.timeoutId = null
		}, ANIMATION_DURATION)
	}

	positionMenu(trigger: HTMLElement) {
		// Проверяем, что код выполняется в браузере
		if (isPlatformBrowser(this.platformId)) {
			const triggerRect =
				this.reference?.getBoundingClientRect() ??
				trigger.getBoundingClientRect()
			const menuRect = this.elRef.nativeElement.getBoundingClientRect()
			const menuStyles = window.getComputedStyle(this.elRef.nativeElement)

			let topStyle, leftStyle, widthStyle

			// Позиционирование сверху или снизу
			const bottomSpaceAvailable = window.innerHeight - triggerRect.bottom
			const menuHeight = menuRect.height + parseInt(menuStyles.marginTop)
			this.isAbove = bottomSpaceAvailable < menuHeight

			topStyle = this.isAbove
				? `${triggerRect.top - menuRect.height}px`
				: `${triggerRect.bottom}px`

			// Ширина меню: если ширина меню больше ширины триггера, используем ширину меню
			widthStyle =
				menuRect.width > triggerRect.width
					? `${menuRect.width}px`
					: `${triggerRect.width}px`

			// Позиционирование по горизонтали
			const spaceRight = window.innerWidth - triggerRect.right
			const spaceLeft = triggerRect.left

			if (menuRect.width > triggerRect.width) {
				if (spaceRight < menuRect.width && spaceLeft > menuRect.width) {
					// Если справа недостаточно места, но слева достаточно, смещаем влево
					leftStyle = `${
						triggerRect.left + triggerRect.width - menuRect.width
					}px`
				} else {
					// Иначе выравниваем по левому краю триггера
					leftStyle = `${triggerRect.left}px`
				}
			} else {
				// Если ширина меню меньше или равна ширине триггера, выравниваем по левому краю триггера
				leftStyle = `${triggerRect.left}px`
			}

			// Обновление стилей
			this.style = {
				top: topStyle,
				left: leftStyle,
				width: widthStyle
			}
		}
	}
}

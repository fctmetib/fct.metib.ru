import {
	AfterViewInit,
	Component,
	ElementRef,
	inject,
	Inject,
	Optional,
	PLATFORM_ID,
	Renderer2,
	ViewChild
} from '@angular/core';
import { startWith, takeUntil } from 'rxjs/operators';
import { merge, tap } from 'rxjs';
import { setPaddings } from '../../services/set-paddings.service';
import { AutoUnsubscribeService } from '../../../../services/auto-unsubscribe.service';
import { MibInputDirective } from '../../directives/mib-input.directive';
import { MibTextareaDirective } from '../../../textarea/directives/mib-textarea.directive';
import { isPlatformBrowser } from '@angular/common';
import { InputComponent } from '../../input.component';
import { TextareaComponent } from '../../../textarea/textarea.component';
import { WINDOW } from '../../../../tokens/window.token';

@Component({
	selector: 'mib-input-base-wrapper',
	templateUrl: './input-base-wrapper.component.html',
	styleUrls: ['./input-base-wrapper.component.scss'],
	providers: [AutoUnsubscribeService]
})
export class InputBaseWrapperComponent implements AfterViewInit {
	@ViewChild('label') labelEl: ElementRef<HTMLSpanElement>;
	@ViewChild('iconsLeftRef') iconsLeftEl: ElementRef<HTMLDivElement>;
	@ViewChild('iconsRightRef') iconsRightEl: ElementRef<HTMLDivElement>;
	@ViewChild('box') box: ElementRef<HTMLDivElement>;
	@ViewChild('message') messageRef?: ElementRef;

	public viewMounted: boolean = false;

	constructor(
		@Inject(PLATFORM_ID) private platformId: Object,
		private r2: Renderer2,
		private au: AutoUnsubscribeService,
		@Optional() private input: InputComponent,
		@Optional() private textarea: TextareaComponent
	) {}

	private window = inject(WINDOW);

	get inputElement(): HTMLInputElement | HTMLTextAreaElement {
		return this.directive?.elementRef?.nativeElement;
	}

	get component(): InputComponent | TextareaComponent {
		return this.isTextarea ? this.textarea : this.input;
	}

	get directive(): MibInputDirective | MibTextareaDirective {
		return this.input?.inputDirective || this.textarea?.textareaDirective;
	}

	get isTextarea() {
		return this.inputElement?.tagName === 'TEXTAREA';
	}

	get selector() {
		return this.isTextarea ? 'textarea' : 'input';
	}

	ngAfterViewInit(): void {
		this.component.leftIcons.changes
			.pipe(
				startWith(null),
				tap(() => this.setIconPaddings()),
				takeUntil(this.au.destroyer)
			)
			.subscribe();
		setTimeout(() => (this.viewMounted = true));
		merge(this.component.leftIcons.changes, this.component.rightIcons.changes)
			.pipe(
				startWith(null),
				tap(() => this.updateClasses()),
				takeUntil(this.au.destroyer)
			)
			.subscribe();
	}

	setIconPaddings() {
		if (isPlatformBrowser(this.platformId)) {
			if (this.isTextarea) {
			} else {
				setPaddings(
					{
						leftEl: this.iconsLeftEl.nativeElement,
						rightEl: this.iconsRightEl.nativeElement,
						element: this.inputElement
					},
					this.r2,
					this.window,
					({ newPaddingLeft }) => {
						this.r2.setStyle(this.labelEl.nativeElement, 'padding-left', newPaddingLeft);
					}
				);
			}
		}
	}

	updateClasses() {
		this.directive?.addClasses(this.directiveClasses);
	}

	get directiveClasses() {
		return {
			[`${this.selector}_right-iconly`]: Boolean(this.component.rightIcons.length),
			[`${this.selector}_left-iconly`]: Boolean(this.component.leftIcons.length)
		};
	}

	get classes() {
		return {
			[`box-wrapper_${this.selector}`]: true,
			'box-wrapper-transition': this.viewMounted,
			'box-wrapper_without-label': !this.component.labelDirective
		};
	}

	focus() {
		this.inputElement?.focus();
	}
}

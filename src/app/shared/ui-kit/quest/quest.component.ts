import {
	Component,
	EventEmitter,
	Input,
	OnDestroy,
	OnInit,
	Output
} from '@angular/core'
import {Subscription} from 'rxjs'
import {BreakpointObserverService} from '../../services/common/breakpoint-observer.service'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'

@Component({
	selector: 'mib-quest',
	templateUrl: './quest.component.html',
	styleUrls: ['./quest.component.scss']
})
export class QuestComponent implements OnInit {
	quizForm: FormGroup
	currentQuestionIndex: number = 0
	progress: number = 0
	quizCompleted: boolean = false
	public isDesktop: boolean = false
	private subscriptions = new Subscription()

	@Input() questions: {
		question: string
		options: {
			label: string
			value: boolean
		}[]
		answer: any
	}[]
	@Output() onPress = new EventEmitter()

	progressInfo = [
		'Роль в сделке',
		'Предмет расчёта',
		'Резидентство',
		'Результат'
	]

	constructor(
		private fb: FormBuilder,
		public breakpointService: BreakpointObserverService
	) {}

	ngOnInit(): void {
		this.subscriptions = this.breakpointService
			.isDesktop()
			.subscribe(b => (this.isDesktop = b))

		this.initForm()

		this.updateProgress()
	}

	initForm() {
		this.quizForm = this.fb.group({
			answer: [null, Validators.required]
		})
	}

	getCurrentQuestion() {
		return this.questions[this.currentQuestionIndex]
	}

	nextQuestion() {
		if (this.quizForm.valid) {
			this.questions[this.currentQuestionIndex].answer =
				this.quizForm.value.answer

			if (this.currentQuestionIndex < this.questions.length - 1) {
				this.currentQuestionIndex++
				this.updateProgress()
				this.quizForm.reset()
			} else {
				this.quizCompleted = true
				this.updateProgress()
			}
		}
	}

	goToQuestion(index: number): void {
		if (index < this.questions.length) {
			this.currentQuestionIndex = index
			const selectedAnswer = this.questions[this.currentQuestionIndex].answer
			this.quizForm.setValue({answer: selectedAnswer})

			this.updateProgress()
		}
	}

	updateProgress(): void {
		this.progress = this.quizCompleted
			? 100
			: ((this.currentQuestionIndex + 1) / this.progressInfo.length) * 100
	}

	isLastQuestion(): boolean {
		return this.currentQuestionIndex === this.questions.length - 1
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe()
	}
}

import {
  AfterContentInit, ChangeDetectorRef,
  Component, ContentChild,
  ContentChildren, EventEmitter, Input,
  OnDestroy,
  OnInit, Output,
  QueryList,
} from '@angular/core';
import {BehaviorSubject, Subscription, tap, merge} from "rxjs";
import {TabItemComponent} from "../tab-item/tab-item.component";
import {NavbarPointType} from '../../../navbar/interfaces/navbar-point.interface';
import {NavbarPointComponent} from '../../../navbar/components/navbar-point/navbar-point.component';
import {NavbarComponent} from '../../../navbar/navbar.component';

@Component({
  selector: 'mib-tab-group',
  templateUrl: './tab-group.component.html',
  styleUrls: ['./tab-group.component.scss'],
})
export class TabGroupComponent implements OnInit, OnDestroy, AfterContentInit {

  @Input() type: NavbarPointType = 'separator'
  @Output() selectionChange = new EventEmitter<string>()

  @ContentChild(NavbarComponent, {descendants: true}) navbar: NavbarComponent
  @ContentChildren(NavbarPointComponent, {descendants: true}) buttons!: QueryList<NavbarPointComponent>;
  @ContentChildren(TabItemComponent, {descendants: true}) tabs!: QueryList<TabItemComponent>;

  private subscriptions: Subscription[] = []

  public tabValue$ = new BehaviorSubject<string>('');

  constructor(
    private cdr: ChangeDetectorRef
  ) {
  }

  get tabValue() {
    return this.tabValue$.value
  }

  ngOnDestroy() {
    this.resetSubscriptions();
  }

  ngAfterContentInit() {
    this.buttons.changes.subscribe(() => {
      this.resetSubscriptions();
      this.subscribeToItems();
    })
    this.tabs.changes.subscribe(() => {
      this.resetSubscriptions();
      this.subscribeToItems();
    })
    const value = this.buttons.get(0)?.value
    if (value) this.setActiveTab(value)
    this.subscribeToItems();
  }

  ngOnInit() {
  }

  private resetSubscriptions() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.subscriptions = [];
  }

  updateTabsAndButtons = () => {
    // Инициализация navbar
    this.navbar.type = this.type;

    // Инициализация tabs
    this.tabs.forEach(tab => {
      tab.setSelected(tab.value === this.tabValue)
      this.cdr.detectChanges()
    });

    // Инициализация buttons
    this.buttons.forEach(button => {
      button.selected = button.value === this.tabValue
      this.cdr.detectChanges()
    });

    this.cdr.detectChanges()
  };

  private subscribeToItems() {
    this.updateTabsAndButtons();

    this.subscriptions.push(
      this.tabValue$.pipe(
        tap(value => {
          this.updateTabsAndButtons()
          this.selectionChange.emit(value)
        })
      ).subscribe()
    );

    this.subscriptions.push(
      merge(this.buttons.changes, this.tabs.changes).pipe(
        tap(() => this.updateTabsAndButtons())
      ).subscribe()
    );

    // Создаем массив Observables для каждой кнопки
    const buttonPressObservables = this.buttons.map((button, index) => {
      return button.press.pipe(
        tap(() => {
          this.setActiveTab(button.value)
        })
      );
    });

    // Подписываемся на все press события
    this.subscriptions.push(
      merge(...buttonPressObservables).subscribe()
    );
  }

  setActiveTab(value: string) {
    this.tabValue$.next(value)
    this.cdr.detectChanges()
  }
}

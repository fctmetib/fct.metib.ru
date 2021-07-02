import {
  Component,
  ContentChildren,
  QueryList,
  AfterContentInit,
  AfterContentChecked,
} from "@angular/core";
import { Observable } from "rxjs";
import { startWith, map, delay } from "rxjs/operators";
import { MibTabItemComponent } from "../mib-tab-item/mib-tab-item.component";

@Component({
  selector: "mib-tab",
  template: `
    <div class="tabs-header">
      <div
        class="tab-label"
        (click)="selectTab(item)"
        [class.active]="activeTab === item"
        *ngFor="let item of tabItems$ | async"
      >
        <ng-container *ngIf="item.labelComponent">
          <ng-container *ngTemplateOutlet="item.labelComponent.labelContent">
          </ng-container>
        </ng-container>
        <ng-container *ngIf="!item.labelComponent">
          {{ item.label }}
        </ng-container>
      </div>
    </div>
    <div class="tabs-body">
      <ng-container *ngIf="activeTab && activeTab.bodyComponent">
        <ng-container *ngTemplateOutlet="activeTab.bodyComponent.bodyContent">
        </ng-container>
      </ng-container>
    </div>
  `,
  styles: [
    `
      .tabs-header {
        display: flex;
      }
      .active {
        color: red;
      }
      .tab-label {
        border: 1px dashed black;
        padding: 25px;
        margin: 0 10px;
      }
    `,
  ],
})
export class MibTabComponent implements AfterContentInit, AfterContentChecked {
  @ContentChildren(MibTabItemComponent)
  tabs: QueryList<MibTabItemComponent>;

  tabItems$: Observable<MibTabItemComponent[]>;

  activeTab: MibTabItemComponent;

  constructor() {}

  ngAfterContentInit(): void {
    this.tabItems$ = this.tabs.changes
      .pipe(startWith(""))
      .pipe(delay(0))
      .pipe(map(() => this.tabs.toArray()));
  }

  ngAfterContentChecked() {
    if (!this.activeTab) {
      Promise.resolve().then(() => {
        this.activeTab = this.tabs.first;
      });
    }
  }

  selectTab(tabItem: MibTabItemComponent) {
    if (this.activeTab === tabItem) {
      return;
    }

    if (this.activeTab) {
      this.activeTab.isActive = false;
    }

    this.activeTab = tabItem;

    tabItem.isActive = true;
  }
}

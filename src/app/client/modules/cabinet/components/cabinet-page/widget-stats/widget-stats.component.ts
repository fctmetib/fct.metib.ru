import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'widget-stats',
  styleUrls: ['./widget-stats.component.scss'],
  templateUrl: 'widget-stats.component.html',
})
export class WidgetStatsComponent implements OnInit {
  public lineStylesData: any;

  constructor() {}

  ngOnInit() {
    this.lineStylesData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Лимит',
          data: [12, 51, 62, 33, 21, 62, 45],
          fill: true,
          borderColor: '#FFA726',
          tension: 0.4,
          backgroundColor: 'rgba(255,167,38,0.2)',
        },
      ],
    };
  }
}

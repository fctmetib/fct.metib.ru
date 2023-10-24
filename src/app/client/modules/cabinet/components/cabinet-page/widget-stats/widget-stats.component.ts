import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'widget-stats',
  styleUrls: ['./widget-stats.component.scss'],
  templateUrl: 'widget-stats.component.html',
})
export class WidgetStatsComponent implements OnInit {
  public limitData: any;
  public delayData: any;

  constructor() {}

  ngOnInit() {
    this.limitData = {
      labels: ['01.10.2021', '05.10.2021', '09.10.2021', '12.10.2021', '17.10.2021', '22.10.2021', '24.10.2021'],
      datasets: [
        {
          label: 'Лимит',
          data: [100000, 1400000, 1900000, 2500000, 2800000, 4700000, 9000000],
          fill: true,
          borderColor: '#7AD383',
          tension: 0.4,
          backgroundColor: '#7AD383',
        },
      ],
    };
    this.delayData = {
      labels: ['01.10.2021', '05.10.2021', '09.10.2021', '12.10.2021', '17.10.2021', '22.10.2021', '24.10.2021'],
      datasets: [
        {
          label: 'Лимит',
          data: [9000000, 4700000, 2800000, 100000, 1400000, 1900000, 2500000],
          fill: true,
          borderColor: '#E74630',
          tension: 0.4,
          backgroundColor: '#E74630',
        },
      ],
    };
  }
}

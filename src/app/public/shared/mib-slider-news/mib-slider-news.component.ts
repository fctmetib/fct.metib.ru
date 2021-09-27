import { Router } from '@angular/router';
import { environment } from './../../../../environments/environment';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'mib-slider-news',
  styleUrls: ['./mib-slider-news.component.scss'],
  templateUrl: './mib-slider-news.component.html',
})
export class MibSliderNewsComponent implements OnInit {
  @Input() news: string[] = [];

  responsiveOptions;

  public apiUrl = environment.apiUrl;

  constructor(
    private router: Router) {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3,
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2,
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }

  ngOnInit() {
  }
  public getUrl(id: string) {
    return `${this.apiUrl}/news/${id}/image`
  }

  public openNews(id: string) {
    this.router.navigate([`news/${id}`]);
  }
}

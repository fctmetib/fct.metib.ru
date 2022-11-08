import { environment } from 'src/environments/environment';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NewsService } from '../../service/news.service';
import { NewsInterface } from '../../type/news.interface';

@Component({
  selector: 'news',
  styleUrls: ['./news.component.scss'],
  templateUrl: 'news.component.html',
})
export class NewsComponent implements OnInit, OnDestroy {
  private subscription$: Subscription = new Subscription();

  public imageSrc = '';
  public currentNews: NewsInterface;

  constructor(
    private activatedRoute: ActivatedRoute,
    private newsService: NewsService
  ) { }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.params.id;
    this.subscription$.add(
      this.newsService.getNewsById(id).subscribe((newsResponse) => {
        this.currentNews = newsResponse;
        this.imageSrc = `${environment.apiUrl}/news/${this.currentNews.ID}/image`;
      })
    );
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }
}

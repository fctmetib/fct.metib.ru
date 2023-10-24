import { environment } from 'src/environments/environment';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NewsService } from '../../service/news.service';
import { NewsInterface } from '../../type/news.interface';
import { Title } from '@angular/platform-browser';

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
    private readonly activatedRoute: ActivatedRoute,
    private readonly newsService: NewsService,
    private readonly titleService: Title
  ) { }

  public ngOnInit(): void {
    let id = this.activatedRoute.snapshot.params.id;
    this.subscription$.add(
      this.newsService.getNewsById(id).subscribe((newsResponse: NewsInterface): void => {
        this.titleService.setTitle(newsResponse.Title);
        this.currentNews = newsResponse;
        this.imageSrc = `${environment.apiUrl}/news/${this.currentNews.ID}/image`;
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}

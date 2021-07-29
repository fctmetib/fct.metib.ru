import { Subscription } from 'rxjs';
import { NewsService } from './../../../../shared/services/news.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'create-news-dialog',
  styleUrls: ['./create-news-dialog.component.scss'],
  templateUrl: 'create-news-dialog.component.html',
})
export class CreateNewsDialogComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public file: File;
  public currentId: string;

  private subscription$: Subscription = new Subscription();

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public datepipe: DatePipe,
    private formBuilder: FormBuilder,
    private newsService: NewsService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      Date: this.config?.data?.Date ? new Date(this.config?.data?.Date) : new Date(),
      Text: this.config?.data?.Text ? this.config?.data?.Text : '',
      Title: this.config?.data?.Title ? this.config?.data?.Title : '',
    });
    if (this.config.data) {
      console.log(this.config.data);
      this.currentId = this.config.data.ID;
    }
  }

  public close() {
    this.ref.close();
  }

  public onSelect(event) {
    this.file = event.target.files[0];
  }

  public onSubmit() {
    if (this.currentId) {
      this.subscription$.add(
        this.newsService
          .updateNewsItem(this.form.value, this.currentId)
          .subscribe((newsResponse) => {
            if (this.file) {
              this.newsService
                .addNewsImage(this.file, newsResponse.ID)
                .subscribe((imageResponse) => {
                  this.ref.close();
                });
            } else {
              this.ref.close();
            }
          })
      );
    } else {
      this.subscription$.add(
        this.newsService
          .addNewsItem(this.form.value)
          .subscribe((newsResponse) => {
            if (this.file) {
              this.newsService
                .addNewsImage(this.file, newsResponse.ID)
                .subscribe((imageResponse) => {
                  this.ref.close();
                });
            } else {
              this.ref.close();
            }
          })
      );
    }
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }
}

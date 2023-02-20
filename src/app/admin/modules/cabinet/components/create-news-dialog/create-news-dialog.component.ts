import { Subscription } from 'rxjs';
import { NewsService } from 'src/app/admin/shared/services/news.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'create-news-dialog',
  styleUrls: ['./create-news-dialog.component.scss'],
  templateUrl: 'create-news-dialog.component.html',
})
export class CreateNewsDialogComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public file: File;
  public currentId: string;
  public validators: Array<string> = environment.uploadFilesExt;

  private subscription$: Subscription = new Subscription();

  constructor(
    public readonly ref: DynamicDialogRef,
    public readonly config: DynamicDialogConfig,
    public readonly datepipe: DatePipe,
    private readonly formBuilder: FormBuilder,
    private readonly newsService: NewsService
  ) { }

  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      Date: this.config?.data?.Date ? new Date(this.config?.data?.Date) : new Date(),
      Text: this.config?.data?.Text ? this.config?.data?.Text : '',
      Title: this.config?.data?.Title ? this.config?.data?.Title : '',
    });
    if (this.config.data) {
      this.currentId = this.config.data.ID;
    }
  }

  public close(): void {
    this.ref.close();
  }

  public onSelect(event: any): void {
    const file = event.target.files[0];
    if (this.validators.some((ext: string): boolean => file.name.endsWith(ext))) {
      this.file = file;
    }
  }

  public onSubmit(): void {
    if (this.currentId) {
      this.subscription$.add(
        this.newsService
          .updateNewsItem(this.form.value, this.currentId)
          .subscribe((newsResponse: any): void => {
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

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}

import { NewsService } from './../../../../shared/services/news.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'create-news-dialog',
  templateUrl: 'create-news-dialog.component.html'
})

export class CreateNewsDialogComponent implements OnInit {

  public form: FormGroup;

  public file: File;

  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig, private formBuilder: FormBuilder, private newsService: NewsService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      Date: new Date(),
      Text: '',
      Title: '',
    });
  }

  public onSelect(event) {
    this.file = event.target.files[0];
  }

  public onSubmit() {
    this.newsService.addNewsItem(this.form.value).subscribe(newsResponse => {
      this.newsService.addNewsImage(this.file, newsResponse.ID).subscribe(imageResponse => {
        this.ref.close();
      });
    })
  }
}

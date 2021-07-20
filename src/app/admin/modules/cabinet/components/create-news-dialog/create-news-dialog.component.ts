import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'create-news-dialog',
  templateUrl: 'create-news-dialog.component.html'
})

export class CreateNewsDialogComponent implements OnInit {

  public form: FormGroup;

  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      Date: '',
      Text: '',
      Title: '',
    });
  }

  public onSubmit() {

  }
}

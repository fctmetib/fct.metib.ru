import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';
import {MessageService} from 'primeng/api';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {CommonService} from '../../../services/common/common.service';

@Component({
  selector: 'app-update-password-dialog',
  templateUrl: './update-password-dialog.component.html',
  styleUrls: ['./update-password-dialog.component.scss'],
})
export class UpdatePasswordDialogComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public image: any;
  public alertMessage = [];

  private captchaCode: string = '';

  constructor(
    public ref: DynamicDialogRef,
    private sanitizer: DomSanitizer,
    public config: DynamicDialogConfig,
    private commonService: CommonService,
    private messageService: MessageService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.initForm();
    this.updateCaptcha();
  }

  public updatePassword() {
    this.commonService.updatePassword(this.form.value).subscribe((resp) => {
      this.alertMessage = [
        {
          severity: 'success',
          detail: 'Пароль успешно изменён!',
        },
      ];
    }, error => {
      this.alertMessage = [
        {
          severity: 'error',
          detail: error,
        },
      ];
    });
  }

  public close() {
    this.ref.close();
  }

  public updateCaptcha() {
    this.commonService.getCaptcha().subscribe((resp) => {
      var uint8View = new Uint8Array(resp.body);
      const STRING_CHAR = String.fromCharCode.apply(null, uint8View);
      let base64String = btoa(STRING_CHAR);
      this.image = this.sanitizer.bypassSecurityTrustUrl(
        `data:image/jpg;base64, ` + base64String
      );

      this.captchaCode = resp.headers.get('Content-Disposition');
      this.captchaCode = this.captchaCode.split('=').pop();
      this.captchaCode = this.captchaCode.split('.')[0];
      this.form.patchValue({
        Captcha: {
          Code: this.captchaCode,
        },
      });
    });
  }

  private initForm() {
    this.form = this.fb.group({
      OldPassword: ['', [Validators.required]],
      NewPassword: ['', [Validators.required]],
      Captcha: this.fb.group({
        Code: [''],
        Text: ['', [Validators.required]],
      }),
    });
  }

  get captchaText() {
    return this.form.get('Captcha').get('Text');
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }
}

// {"OldPassword":"qwerty","NewPassword":"qwertyQ1","Captcha":{"Code":"27fb9dee-8e4e-4ccb-85a0-b8fd4aaef360","Text":"whygwe"}}

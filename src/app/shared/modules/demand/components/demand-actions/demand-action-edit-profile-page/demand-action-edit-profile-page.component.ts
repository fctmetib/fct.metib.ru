import { CookieService } from 'ngx-cookie-service';
import { CryptoService } from './../../../../../services/common/crypto.service';
import { DemandService } from './../../../services/demand.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { createDemandFactoringAction } from '../../../store/actions/createDemand.action';
import { SaveDemandRequestInterface } from '../../../types/requests/save-demand-request.interface';
import { select, Store } from '@ngrx/store';
import { FileModeInterface } from 'src/app/shared/types/file/file-model.interface';
import { Observable } from 'rxjs';
import { errorSelector, isLoadingSelector } from '../../../store/selectors';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { FileService } from 'src/app/shared/services/common/file.service';
import { Guid } from 'src/app/shared/classes/common/guid.class';

@Component({
  selector: 'app-demand-action-edit-profile-page',
  templateUrl: './demand-action-edit-profile-page.component.html',
  styleUrls: ['./demand-action-edit-profile-page.component.scss'],
})
export class DemandActionEditProfilePageComponent implements OnInit {
  isUserVerified: boolean;

  public alert: boolean;
  public alertMessage: string;

  public isLoading$: Observable<boolean> = new Observable<boolean>();
  public backendErrors$: Observable<string | null>;

  public formEdit: FormGroup;

  public files: FileModeInterface[] = [];

  private currentUserId: string;

  constructor(
    private authService: AuthService,
    private commonService: CommonService,
    private fb: FormBuilder,
    private demandService: DemandService,
    private store: Store,
    private fileService: FileService,
    private cryptoService: CryptoService,
    private cookieService: CookieService
  ) {}

  ngOnInit() {
    this.isUserVerified = this.authService.isUserVerified();
    this.initForm();
    this.initValues();
  }

  ngOnDestroy() {}

  onSubmit() {
    let data: SaveDemandRequestInterface<any> = this.prepareData();

    this.demandService.add(data).subscribe(resp => {
      this.alert = true;
      this.alertMessage = "Запрос успешно создан."
    });

    // this.store.dispatch(createDemandFactoringAction({ data }));
  }

  //#region private logic
  private prepareData(): any {
    let result: SaveDemandRequestInterface<any> = {
      Data: {
        Avatar: this.files[0]?.Code,
        Passport: {
          Date: this.formEdit.value.date,
          Expire: null,
          IsForeign: false,
          IssuerCode: this.formEdit.value.issuerCode,
          IssuerTitle: this.formEdit.value.issuerTitle,
          Nationality: "RUS",
          Number: this.formEdit.value.number,
        },
        PassportFileCode: '',
        Profile: {
          Email: this.formEdit.value.email,
          IsMale: this.formEdit.value.isMale,
          Login: "realtestapp521@yandex.ru",
          Name: {
            First: this.formEdit.value.first,
            Last: this.formEdit.value.last,
          },
          Phone: this.formEdit.value.phone
        },
        Files: this.files,
        UserID: this.currentUserId,
        Type: 'ProfileChange',
      },
      DraftID: 0,
    };

    return result;
  }

  private initForm(): void {
    this.formEdit = this.fb.group({
      last: ['', [Validators.required]],
      first: ['', [Validators.required]],
      isMale: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required]],
      number: ['', [Validators.required]],
      date: ['', [Validators.required]],
      issuerTitle: ['', [Validators.required]],
      issuerCode: ['', [Validators.required]],
    });

    this.formEdit.markAllAsTouched();
    this.formEdit.markAsDirty();
  }

  private initValues(): void {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.backendErrors$ = this.store.pipe(select(errorSelector));

    let encryptedJsonCurrentUser = this.cookieService.get('_cu');
    let currentJsonUser = this.cryptoService.decrypt(encryptedJsonCurrentUser);
    let currentUser = JSON.parse(currentJsonUser);

    this.currentUserId = currentUser.UserID;
  }

  onSelect(event, type: string) {
    let files: File[] = event.files;

    for (let file of files) {
      let guid = Guid.newGuid();

      this.commonService.getBase64(file).subscribe((res) => {
        this.fileService
          .uploadFileChunks(res, file.name, file.size.toString(), guid)
          .subscribe(
            (res) => {
              console.log(res);
              this.files.push({
                Code: res.Code,
                FileName: res.FileName,
                ID: res.ID,
                Size: res.Size,
                Identifier: type,
              });
            },
            (err) => console.log(err)
          );
      });
    }
  }

  //#endregion
}

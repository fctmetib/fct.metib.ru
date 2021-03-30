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

  constructor(
    private authService: AuthService,
    private commonService: CommonService,
    private fb: FormBuilder,
    private store: Store,
    private fileService: FileService
  ) {}

  ngOnInit() {
    this.isUserVerified = this.authService.isUserVerified();
    this.initForm();
    this.initValues();
  }

  ngOnDestroy() {}

  onSubmit() {
    let data: SaveDemandRequestInterface<any> = this.prepareData();
    this.store.dispatch(createDemandFactoringAction({ data }));
  }

  //#region private logic
  private prepareData(): any {
    let result: SaveDemandRequestInterface<any> = {
      Data: {
        Avatar: "0fcb8ff7-5480-48ed-9d57-4bfe09c393d8",
        Passport: {
          Date: "2021-03-30T16:55:26+03:00",
          Expire: null,
          IsForeign: false,
          IssuerCode: "999",
          IssuerTitle: "iopiop",
          Nationality: "RUS",
          Number: "44444444444444444444",
        },
        PassportFileCode: '',
        Profile: {
          Email: "realtestapp521@yandex.ru",
          IsMale: true,
          Login: "realtestapp521@yandex.ru",
          Name: {
            First: "realtestapp521",
            Last: "realtestapp521",
          },
          Phone: "8-518-851-2825"
        },
        Files: this.files,
        UserID: 4254,
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

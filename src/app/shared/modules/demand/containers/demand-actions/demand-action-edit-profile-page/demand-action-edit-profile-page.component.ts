import { CookieService } from 'ngx-cookie';
import { CryptoService } from './../../../../../services/common/crypto.service';
import { DemandService } from './../../../services/demand.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { SaveDemandRequestInterface } from '../../../types/requests/save-demand-request.interface';
import { select, Store } from '@ngrx/store';
import { FileModeInterface } from 'src/app/shared/types/file/file-model.interface';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { errorSelector, isLoadingSelector } from '../../../store/selectors';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { FileService } from 'src/app/shared/services/common/file.service';
import { Guid } from 'src/app/shared/classes/common/guid.class';
import { switchMap } from 'rxjs/operators';
import { FactoringInfoInterface } from '../../../types/common/factoring/factoring-info.interface';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CreateDemandMessageRequestInterface } from '../../../types/requests/create-demand-message-request.interface';
import { DemandSelectboxInterface } from '../../../types/common/demand-selectbox.interface';
import { formatDate } from '@angular/common';
import { ExitGuard } from 'src/app/shared/services/exit.guard';

@Component({
  selector: 'app-demand-action-edit-profile-page',
  templateUrl: './demand-action-edit-profile-page.component.html',
  styleUrls: ['./demand-action-edit-profile-page.component.scss'],
})
export class DemandActionEditProfilePageComponent implements OnInit, ExitGuard {
  public isEdit: boolean = false;
  public currentDemand: any;
  public currentInformation: FactoringInfoInterface;
  private currentDraftId: number = 0;

  isUserVerified: boolean;

  public alert: boolean;
  public alertMessage = [];
  public alertMessage$: BehaviorSubject<string> = new BehaviorSubject<string>(
    null
  );

  public isLoading: boolean = false;
  public isRequestLoading: boolean = false;

  public backendErrors$: Observable<string | null>;

  public avatarSource: any = '/assets/images/mib_ava.png';
  public formEdit: FormGroup;

  public files: FileModeInterface[] = [];
  public genderTypes: DemandSelectboxInterface[] = [
    {
      title: 'Женский',
      value: false,
    },
    {
      title: 'Мужской',
      value: true,
    },
  ];

  private currentUserId: string;

  private avatarCode: string;
  private _saveDraftAction$: NodeJS.Timeout;
  private subscription$: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private commonService: CommonService,
    private fb: FormBuilder,
    private demandService: DemandService,
    private store: Store,
    private route: ActivatedRoute,
    private router: Router,
    private fileService: FileService,
    private cryptoService: CryptoService,
    private cookieService: CookieService
  ) {}

  ngOnInit() {
    this.isUserVerified = this.authService.isUserVerified();
    this.initForm();
    this.initValues();

    this.subscription$.add(
      this.route.queryParams.subscribe((params: Params) => {
        if (params['ID']) {
          this.fetch(params['ID']);
        } else {
          this.getDraft();
        }
      })
    );

    this._saveDraftAction$ = setInterval(() => this.saveDraft(), 30000);
  }

  public back() {
    const notVerify = 'not-verify';
    const baseUrl = this.isUserVerified ? '' : notVerify;
    this.router.navigate([`${baseUrl}/demand`]);
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
    if (this._saveDraftAction$) {
      clearInterval(this._saveDraftAction$);
    }
  }

  onSubmit() {
    let data: SaveDemandRequestInterface<any> = {
      Data: this.prepareData(),
      DraftID: this.currentDraftId,
    };

    this.subscription$.add(
      this.demandService.add(data).subscribe((resp) => {
        this.alert = true;
        window.scroll(0, 0);
        this.alertMessage = [
          {
            severity: 'success',
            summary: 'Успешно!',
            detail: 'Запрос успешно создан.',
          },
        ];
      })
    );
  }

  handleSendMessage(event: CreateDemandMessageRequestInterface) {
    this.subscription$.add(
      this.demandService
        .addMessageByDemandId(this.currentDemand.ID, event)
        .subscribe((resp) => {
          this.fetch(this.currentDemand.ID);
        })
    );
  }

  handleRemoveFile(file: FileModeInterface) {
    this.currentDemand.Files = this.currentDemand.Files.filter(
      (x) => x !== file
    );
  }

  public isFilesInvalid(): boolean {
    let isInvalid = false;

    // crtInds = currentFileIdentifiers
    let crtInds = this.files.map((file) => file.Identifier);
    if (crtInds.length < 1) {
      return true;
    }

    if (crtInds.includes('Passport')) {
      isInvalid = false;
    } else {
      isInvalid = true;
    }

    return isInvalid;
  }

  private getDraft() {
    this.isLoading = true;
    this.subscription$.add(
      this.demandService
        .prepareDemandByType('ProfileChange')
        .subscribe((resp) => {
          this.isLoading = false;
          this.convertToFormData(resp);
        })
    );
  }

  private fetch(id: number) {
    this.isLoading = true;
    this.subscription$.add(
      this.demandService.getDemandById(id).subscribe((resp) => {
        this.currentDemand = resp;
        this.currentInformation = {
          ID: resp.ID,
          Messages: resp.Messages,
          DateCreated: resp.DateCreated,
          DateModify: resp.DateModify,
          DateStatus: resp.DateStatus,
          Steps: resp.Steps,
          Status: resp.Status,
          Type: resp.Type,
          Manager: null,
        };
        console.log(this.currentDemand);
        this.isEdit = true;
        this.isLoading = false;
        this.convertToFormData();
      })
    );
  }

  private convertToFormData(draft?) {
    let data;
    if (draft) {
      data = draft;
    } else {
      data = this.currentDemand.Data;
    }

    this.formEdit.patchValue({
      last: data.Profile?.Name?.Last ? data.Profile?.Name?.Last : '',
      first: data.Profile?.Name?.First ? data.Profile?.Name?.First : '',
      isMale: data.Profile?.IsMale ? data.Profile?.IsMale : '',
      phone: data.Profile?.Phone ? data.Profile?.Phone : '',
      email: data.Profile?.Email ? data.Profile?.Email : '',
      number: data.Passport?.Number ? data.Passport?.Number : '',
      date: data.Passport?.Date
        ? formatDate(data.Passport?.Date, 'yyyy-MM-dd', 'en')
        : '',
      issuerTitle: data.Passport?.IssuerTitle ? data.Passport?.IssuerTitle : '',
      issuerCode: data.Passport?.IssuerCode ? data.Passport?.IssuerCode : '',
    });

    this.avatarCode = data?.Avatar;
    if (this.avatarCode) {
      this.avatarSource = `http://api-factoring.metib.ru:8094/api/avatar/${this.avatarCode}`;
    }
  }

  removeFile(file: FileModeInterface) {
    this.files.splice(
      this.files.indexOf(this.files.find((x) => x === file)),
      1
    );
  }

  public isFileInvalid(type: string): boolean {
    let isInvalid = false;

    // crtInds = currentFileIdentifiers
    let crtInds = this.files.map((file) => file.Identifier);
    if (crtInds.includes(type)) {
      isInvalid = false;
    } else {
      isInvalid = true;
    }

    return isInvalid;
  }

  //#region private logic
  //TODO: Get login
  saveDraft() {
    let draft = this.prepareData();

    this.subscription$.add(
      this.demandService
        .addDraftById(this.currentDraftId, draft)
        .subscribe((resp) => {
          this.currentDraftId = resp.ID;
        })
    );
  }

  private prepareData(): any {
    let result: any = {
      Avatar: this.avatarCode,
      Passport: {
        Date: this.formEdit.value.date,
        Expire: null,
        IsForeign: false,
        IssuerCode: this.formEdit.value.issuerCode,
        IssuerTitle: this.formEdit.value.issuerTitle,
        Nationality: 'RUS',
        Number: this.formEdit.value.number,
      },
      PassportFileCode: '',
      Profile: {
        Email: this.formEdit.value.email,
        IsMale: this.formEdit.value.isMale,
        Name: {
          First: this.formEdit.value.first,
          Last: this.formEdit.value.last,
        },
        Phone: this.formEdit.value.phone,
      },
      Files: this.files,
      UserID: this.currentUserId,
      Type: 'ProfileChange',
    };

    return result;
  }

  private initForm(): void {
    this.formEdit = this.fb.group({
      last: ['', [Validators.required]],
      first: ['', [Validators.required]],
      isMale: [false, [Validators.required]],
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
    this.backendErrors$ = this.store.pipe(select(errorSelector));

    let encryptedJsonCurrentUser = this.cookieService.get('_cu');
    let currentJsonUser = this.cryptoService.decrypt(encryptedJsonCurrentUser);
    let currentUser = JSON.parse(currentJsonUser);

    this.currentUserId = currentUser.UserID;
  }

  onSelect(event, type: string) {
    let files: File[] = event.target.files;

    for (let file of files) {
      let guid = Guid.newGuid();

      if (type === 'Avatar') {
        this.subscription$.add(
          this.fileService.uploadAvatar(file, file.name).subscribe(
            (res) => {
              this.avatarCode = res;
              this.avatarSource = `http://api-factoring.metib.ru:8094/api/avatar/${res}`;
              // `https://api-factoring.metib.ru/api/avatar/${res}` ;
            },
            (err) => console.log(err)
          )
        );
      } else {
        this.subscription$.add(
          this.commonService
            .getBase64(file)
            .pipe(
              switchMap((res) => {
                return this.fileService.uploadFileChunks(
                  res,
                  file.name,
                  file.size.toString(),
                  guid
                );
              })
            )
            .subscribe(
              (res) => {
                this.files.push({
                  Code: res.Code,
                  FileName: res.FileName,
                  ID: res.ID,
                  Size: res.Size,
                  Identifier: type,
                });
              },
              (err) => console.log(err)
            )
        );
      }
    }
  }

  //#endregion
  canDeactivate(): boolean | Observable<boolean> {
    return confirm(
      'Внимание! Возможно, Вы не сохранили данные, хотите покинуть страницу?'
    );
  }
}

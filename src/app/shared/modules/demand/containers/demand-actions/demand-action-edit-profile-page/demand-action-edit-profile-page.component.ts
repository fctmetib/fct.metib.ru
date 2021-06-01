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
import { Observable, Subscription } from 'rxjs';
import { errorSelector, isLoadingSelector } from '../../../store/selectors';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { FileService } from 'src/app/shared/services/common/file.service';
import { Guid } from 'src/app/shared/classes/common/guid.class';
import { switchMap } from 'rxjs/operators';
import { FactoringInfoInterface } from '../../../types/common/factoring/factoring-info.interface';
import { ActivatedRoute, Params } from '@angular/router';
import { CreateDemandMessageRequestInterface } from '../../../types/requests/create-demand-message-request.interface';

@Component({
  selector: 'app-demand-action-edit-profile-page',
  templateUrl: './demand-action-edit-profile-page.component.html',
  styleUrls: ['./demand-action-edit-profile-page.component.scss'],
})
export class DemandActionEditProfilePageComponent implements OnInit {

  public isEdit: boolean = false;
  public currentDemand: any;
  public currentInformation: FactoringInfoInterface;
  private currentDraftId: number = 0;

  isUserVerified: boolean;

  public alert: boolean;
  public alertMessage: string;

  public isLoading$: Observable<boolean> = new Observable<boolean>();
  public backendErrors$: Observable<string | null>;

  public avatarSource: string = '/assets/images/mib_ava.png';
  public formEdit: FormGroup;

  public files: FileModeInterface[] = [];

  private currentUserId: string;

  private subscription$: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private commonService: CommonService,
    private fb: FormBuilder,
    private demandService: DemandService,
    private store: Store,
    private route: ActivatedRoute,
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
        }
        if (params['DraftId']) {
          this.currentDraftId = params['DraftID'];
          this.isEdit = true;
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

  onSubmit() {
    let data: SaveDemandRequestInterface<any> = this.prepareData();

    this.subscription$.add(
      this.demandService.add(data).subscribe((resp) => {
        this.alert = true;
        this.alertMessage = 'Запрос успешно создан.';
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
    this.currentDemand.Files = this.currentDemand.Files.filter(x => x !== file)
  }

  private fetch(id: number) {
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
      })
    );
  }

  removeFile(file: FileModeInterface) {
    this.files.splice(
      this.files.indexOf(this.files.find((x) => x === file)),
      1
    );
  }

  //#region private logic
  //TODO: Get login
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
          Nationality: 'RUS',
          Number: this.formEdit.value.number,
        },
        PassportFileCode: '',
        Profile: {
          Email: this.formEdit.value.email,
          IsMale: this.formEdit.value.isMale,
          Login: 'realtestapp521@yandex.ru',
          Name: {
            First: this.formEdit.value.first,
            Last: this.formEdit.value.last,
          },
          Phone: this.formEdit.value.phone,
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
    let files: File[] = event.target.files;

    for (let file of files) {
      let guid = Guid.newGuid();

      this.subscription$.add(
        this.commonService
          .getBase64(file)
          .pipe(
            switchMap((res) => {
              console.log(type);
              return this.fileService.uploadAvatar(
                res,
                file.name,
                file.size.toString(),
                guid
              );
            })
          )
          .subscribe(
            (res) => {
              if (type === 'Avatar') {
                this.avatarSource = `https://api-factoring.metib.ru/api/avatar/${res.Code}`;
              }
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
          )
      );
    }
  }

  //#endregion
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Guid } from 'src/app/shared/classes/common/guid.class';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { FileService } from 'src/app/shared/services/common/file.service';
import { FileModeInterface } from 'src/app/shared/types/file/file-model.interface';
import { DemandService } from '../../../services/demand.service';
import { SaveDemandRequestInterface } from '../../../types/requests/save-demand-request.interface';

@Component({
  selector: 'app-demand-action-limit-page',
  templateUrl: './demand-action-limit-page.component.html',
  styleUrls: ['./demand-action-limit-page.component.scss'],
})
export class DemandActionLimitPageComponent implements OnInit, OnDestroy {
  isUserVerified: boolean;

  public alert: boolean;
  public alertMessage: string;

  public formFree: FormGroup;

  public files: FileModeInterface[] = [];

  private currentDraftId: number = 0;

  public isLoading: boolean = false;
  private subscription$: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private demandService: DemandService,
    private commonService: CommonService,
    private messageService: MessageService,
    private fileService: FileService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.isUserVerified = this.authService.isUserVerified();
    this.initForm();

    this.subscription$.add(
      this.route.queryParams.subscribe((params: Params) => {
        if (params['ID']) {
          this.demandService
            .getDemandById(params['ID'])
            .subscribe((resp) => {});
        }
        if (params['DraftId']) {
          this.currentDraftId = params['DraftID'];
        }
      })
    );

    setInterval(() => this.saveDraft(), 30000);
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

  public onSubmit() {
    this.isLoading = true;
    let data: SaveDemandRequestInterface<any> = this.prepareData();

    this.subscription$.add(
      this.demandService.add(data).subscribe((resp) => {
        this.alert = true;
        this.alertMessage = 'Запрос успешно создан.';
        this.isLoading = false;
      })
    );
  }

  //#region private logic
  saveDraft() {
    this.subscription$.add(
      this.demandService
        .addDraftById(this.currentDraftId, this.prepareDraft())
        .subscribe((resp) => {
          console.log(resp);
          this.currentDraftId = resp.ID;
          this.showSuccess();
        })
    );
  }

  private prepareDraft() {
    let result = this.prepareCoreData();
    return result;
  }

  private prepareData() {
    let result: SaveDemandRequestInterface<any> = {
      Data: this.prepareCoreData(),
      DraftID: this.currentDraftId,
    };

    return result;
  }

  private prepareCoreData() {
    let data = {
      Limit: this.formFree.value.limit,
      Comment: this.formFree.value.comment,
      Files: this.files,
      Type: 'Limit',
    };
    return data;
  }

  private initForm(): void {
    this.formFree = this.fb.group({
      limit: [0, [Validators.required]],
      comment: ['', [Validators.required]],
    });

    this.formFree.markAllAsTouched();
    this.formFree.markAsDirty();
  }

  private showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Успешно',
      detail: 'Черновик успешно сохранен!',
    });
  }

  //#endregion

  //#region files
  public removeFile(file: FileModeInterface) {
    this.files.splice(
      this.files.indexOf(this.files.find((x) => x === file)),
      1
    );
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

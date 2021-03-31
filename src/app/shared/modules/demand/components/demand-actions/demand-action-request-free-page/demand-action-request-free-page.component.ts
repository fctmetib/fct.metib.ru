import { DemandService } from './../../../services/demand.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Guid } from 'src/app/shared/classes/common/guid.class';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { FileService } from 'src/app/shared/services/common/file.service';
import { FileModeInterface } from 'src/app/shared/types/file/file-model.interface';
import { createDemandFactoringAction } from '../../../store/actions/createDemand.action';
import { errorSelector, isLoadingSelector } from '../../../store/selectors';
import { SaveDemandRequestInterface } from '../../../types/requests/save-demand-request.interface';

@Component({
  selector: 'app-demand-action-request-free-page',
  templateUrl: './demand-action-request-free-page.component.html',
  styleUrls: ['./demand-action-request-free-page.component.scss'],
})
export class DemandActionRequestFreePageComponent implements OnInit {
  isUserVerified: boolean;

  public alert: boolean;
  public alertMessage: string;

  public isLoading$: Observable<boolean> = new Observable<boolean>();
  public backendErrors$: Observable<string | null>;

  public formFree: FormGroup;

  public files: FileModeInterface[] = [];

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private demandService: DemandService,
    private commonService: CommonService,
    private fileService: FileService,
    private store: Store
  ) {}

  ngOnInit() {
    this.isUserVerified = this.authService.isUserVerified();
    this.initForm();
    this.initValues();
  }

  ngOnDestroy() {}

  onSubmit() {
    //TODO: UPDATE IT
    let data: SaveDemandRequestInterface<any> = this.prepareData();

    this.demandService.add(data).subscribe(resp => {
      this.alert = true;
      this.alertMessage = "Запрос успешно создан."
    });

    // this.store.dispatch(createDemandFactoringAction({ data }));
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

  //#region private logic
  private prepareData(): any {
    let result: SaveDemandRequestInterface<any> = {
      Data: {
        Question: this.formFree.value.question,
        Subject: this.formFree.value.subject,
        Files: this.files,
        Type: 'Question',
      },
      DraftID: 0,
    };

    return result;
  }

  private initForm(): void {
    this.formFree = this.fb.group({
      subject: ['', [Validators.required]],
      question: ['', [Validators.required]],
    });

    this.formFree.markAllAsTouched();
    this.formFree.markAsDirty();
  }

  private initValues(): void {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.backendErrors$ = this.store.pipe(select(errorSelector));
  }

  //#endregion
}

import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FileDnd } from '../drag-and-drop/interfaces/drop-box.interface';
import { DocumentReq } from '../../../client/modules/requests/interfaces/request.interface';
import { extractBase64 } from '../../services/tools.service';
import {
  FileReadOptions
} from '../../../client/modules/demand-new/modules/demand-drawer/interfaces/demand-drawer.interface';
import { DemandDrawerService } from '../../../client/modules/demand-new/modules/demand-drawer/demand-drawer.service';

@Component({
  selector: 'mib-send-messages',
  templateUrl: './send-messages.component.html',
  styleUrls: ['./send-messages.component.scss']
})
export class SendMessagesComponent implements OnInit {
  @ViewChild('loader') loader!: ElementRef
  @Output() sendMessage: EventEmitter<any> = new EventEmitter<any>()
  @Input() form: FormGroup
  @Input() document: FileReadOptions
  @Input() disabled = false

  value: any
  loading: boolean = false
  multiple: boolean = false
  accept: string[] = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'image/jpeg',
    'image/png'
  ]
  constructor(
    private demandDrawerService: DemandDrawerService,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.demandDrawerService.getDocumentState
      .subscribe(res => this.document = res)
  }

  public openFileManager() {
    if (!this.loading && !this.disabled) {
      this.loader.nativeElement.click()
      this.loader.nativeElement.value = ''
    }
  }

  public onChangeFile() {
    const files: File[] = Array.from(this.loader.nativeElement.files)
    this.formatFiles(files)
  }

  private readFileAsDataURL(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = () => reject(reader.error)
      reader.readAsDataURL(file)
    })
  }

  private readFileAsArrayBuffer(file: File): Promise<ArrayBuffer> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result as ArrayBuffer)
      reader.onerror = () => reject(reader.error)
      reader.readAsArrayBuffer(file)
    })
  }

  private formatFiles(files: File[]) {
    files.forEach((file: File) => {
      if (!this.accept.includes(file.type)) {
        return console.warn(
          this.accept,
          'Поддерживаются, но передан',
          file.type
        )
      }

      Promise.all([
        this.readFileAsDataURL(file),
        this.readFileAsArrayBuffer(file)
      ])
        .then(([url, arrayBuffer]) => {
          this.value = {file, url, arrayBuffer}
          this.onDocumentLoad(this.value)
        })
        .catch(error => console.error('Ошибка чтения файла', error))
    })
  }

  private onDocumentLoad({file, url}: FileDnd): void {
    const document: DocumentReq = {
      // TODO: ДОБАВИТЬ ИНПУТ С "type='number'" В ФОРМУ
      Number: null,
      Title: file.name,
      Description: `description ${file.name}`,
      DocumentTypeID: 40,
      OwnerTypeID: 6,
      Data: extractBase64(url),
      File: file
    }

    this.addDocument(document)
  }

  private addDocument(data: DocumentReq): void {
    const control: FormGroup = this.fb.group({
      Number: [null],
      Title: [null],
      Description: [null],
      DocumentTypeID: [null],
      OwnerTypeID: [null],
      Data: [null],
      File: [null]
    })
    control.patchValue(data)
    this.fileCode.patchValue(control.value.Data)
    this.demandDrawerService.updateDocumentsState({
      Size: control.value.File.size,
      FileName: control.value.File.name,
    })
  }

  get fileCode(): FormControl<any> {
    return this.form.get('FileCode') as FormControl
  }

  deleteFile() {
    this.demandDrawerService.updateDocumentsState(null)
    this.fileCode.reset()
  }

  onSendMessage() {
    this.sendMessage.emit()
  }
}

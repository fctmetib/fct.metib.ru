import {Component, Inject, OnInit} from '@angular/core'
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import {Properties} from 'csstype'
import {BehaviorSubject, defer, finalize, of, tap} from 'rxjs'
import {DrawerData} from 'src/app/shared/ui-kit/drawer/interfaces/drawer.interface'
import {DocumentViewsDrawerData} from './interfaces/document-views-drawer.data'
import {DocumentsService} from '../../services/documents.service'
import {ToolsService} from 'src/app/shared/services/tools.service'
import {DocumentRes} from '../../../requests/interfaces/request.interface';

@Component({
  selector: 'mib-new-documents-views-drawer',
  templateUrl: './document-view-drawer.component.html',
  styleUrls: ['./document-view-drawer.component.scss']
})
export class DocumentViewDrawerComponent implements OnInit {

  public loading$ = new BehaviorSubject<boolean>(false)
  public isSigning$ = new BehaviorSubject<boolean>(false)

  public skeletonWithoutUnderline: Properties = {
    height: '48px',
    width: '100%'
  }

  public skeleton: Properties = {
    ...this.skeletonWithoutUnderline,
    borderBottom: '1px solid var(--wgr-tertiary)'
  }

  public defaultSkeleton: Properties = {
    borderRadius: '8px',
    width: '100%'
  }

  public PAGINATOR_ITEMS_PER_PAGE = 5
  public PAGINATOR_PAGE_TO_SHOW = 5
  public currentPage$ = new BehaviorSubject<number>(1)

  size = 'm'
  public document: DocumentRes

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: DrawerData<DocumentViewsDrawerData>,
    public toolsService: ToolsService,
    public dialogRef: MatDialogRef<DocumentViewDrawerComponent>,
    private documentsService: DocumentsService
  ) {
  }

  ngOnInit(): void {
    this.getCurrentDocument()
  }

  get documentId() {
    return this.data.data.documentID
  }

  getCurrentDocument() {
    this.loading$.next(true)
    this.documentsService
      .fetchDocuments()
      .pipe(
        tap(data => {
          this.document = data.find(el => el.DocumentID === this.documentId)
        }),
        finalize(() => {
          this.loading$.next(false)
        })
      )
      .subscribe()
  }

  sign() {
    this.documentsService.sign(of(null), this.isSigning$).subscribe()
  }

  downloadFile() {

  }
}

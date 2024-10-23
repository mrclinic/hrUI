import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { takeUntil } from 'rxjs';
import { APP_CONSTANTS } from 'src/app/app.contants';
import { UploadFileDialogComponent } from 'src/app/demo/dialogs/docs.dialog/upload-dialog/upload-doc.dialog';
import { EmpDocService } from 'src/app/demo/service/employee/empdoc.service';
import { UnsubscribeComponent } from 'src/app/demo/shared/unsubscribe/unsubscribe.component';

@Component({
  selector: 'app-empdocs',
  templateUrl: './empdocs.component.html',
  styleUrls: ['./empdocs.component.css']
})
export class EmpDocsComponent extends UnsubscribeComponent implements OnInit {
  cols: any[] = [];
  empDocs: any[] = [];
  canAdd: string = 'HR_EmpChild_CreateEmpChild';
  canEdit: string = 'HR_EmpChild_UpdateEmpChild';
  canSingleDelete: string = 'HR_EmpChild_DeleteEmpChild';
  personId: string;
  filter: string = '';
  fetched: boolean = false;
  refId: string;
  ref?: DynamicDialogRef;
  constructor(private messageService: MessageService, private datePipe: DatePipe,
    private readonly empDocService: EmpDocService,
    private route: ActivatedRoute, private dialogService: DialogService
  ) {
    super();
    this.initColumns();
  }

  transformDate(date: string | number | Date) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      this.refId = params['refId'];
      this.personId = params['personId']
    });
    this.filter = `Filters=EmployeeId==${this.personId}&RefId==${this.refId}`;
    this.empDocService.GetEmpDocsInfo(this.filter).subscribe((res) => {
      this.empDocs = this.mapItemList(res);
      console.log(this.empDocs);
    })
  }

  mapItemList(items: any[]): any[] {
    return items.map((item) => {
      return Object.assign(item, {
        ...item,
        docTypeName: item?.docType?.name,
        docDate: this.transformDate(item?.docDate),
        fileTypeIcon: `<span class="pi ${this.getFileTypeIcon(item.extension)}"></span>`
      });
    })
  }


  getFileTypeIcon(extension: any) {
    switch (extension) {
      case '.pdf':
        return 'pi-file-pdf';
      case '.docx':
        return 'pi-file-word';
      case '.xlsx':
        return 'pi-file-excel';
      case '.jpg':
        return 'pi-image';
      case '.txt':
        return 'pi-file-o';
      default:
        return '';
    }
  }

  initColumns() {
    this.cols = [
      { dataKey: 'docDate', header: APP_CONSTANTS.DocDate },
      { dataKey: 'docNumber', header: APP_CONSTANTS.DocNumber },
      { dataKey: 'docSrc', header: APP_CONSTANTS.DocSrc },
      { dataKey: 'docDescription', header: APP_CONSTANTS.DocDescription },
      { dataKey: 'note', header: APP_CONSTANTS.NOTE },
      { dataKey: 'fileTypeIcon', header: APP_CONSTANTS.FileType, isIcon: true },
      { dataKey: 'extension', header: APP_CONSTANTS.Extension },
      { dataKey: 'name', header: APP_CONSTANTS.NAME }
    ]
  }
  uploadEventHandler(eventData) {
    this.ref = this.dialogService.open(UploadFileDialogComponent, {
      header: 'الوثائق',
      width: '70%',
      contentStyle: { "min-height": "400px", "max-height": "450px", "overflow": "auto" },
      baseZIndex: 10000,
      rtl: true,
      modal: true,
      data: {
        refId: this.refId,
        personId: this.personId
      }
    });
    this.ref.onClose.subscribe((res: any) => {
      let files: any[] = res.files;
      let docInfo = { ...res.docInfo, refId: this.refId, personId: this.personId }
      this.empDocService.UploadEmpDoc(files, docInfo).subscribe((res) => {
        this.reload();
      })
    });
  }

  deleteEventHandler(eventData) {
    this.empDocService.DeleteEmpDoc(eventData as string).subscribe(
      (data) => {
        this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.DELETE_SUCCESS, life: 3000 });
        this.reload();
      }
    );
  }

  reload() {
    this.filter = `Filters=EmployeeId==${this.personId}&RefId==${this.refId}`;
    this.empDocService.GetEmpDocsInfo(this.filter).subscribe(
      (res) => {
        this.empDocs = this.mapItemList(res);
      }
    )
  }
}

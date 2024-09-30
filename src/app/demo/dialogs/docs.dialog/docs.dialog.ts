import { Component } from "@angular/core";
import { MessageService } from "primeng/api";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { EmpDoc } from "../../models/employee/empdoc.model";
@Component({
  styleUrls: ['./docs.dialog.css'],
  template: `
    <p-toast></p-toast>

<div class="card" dir="rtl">
    <p-fileUpload name="demo[]" [customUpload]="true"  (uploadHandler)="uploadFiles($event)"
            [multiple]="true"  [maxFileSize]="1000000" chooseLabel="اختر الملفات"
            cancelLabel="إلغاء" uploadLabel="تحميل الملفات">
            <ng-template pTemplate="content">

            <p-table [value]="uploadedFiles"   dir="rtl" [paginator]="true"
            [rows]="5" [responsive]="true" >
            <ng-template pTemplate="header">
              <tr>
                <th class="th" pSortableColumn="price">الاسم
                <p-sortIcon field="price"></p-sortIcon>
                </th>
                <th style="width: 2.25em">
                </th>
              </tr>
            </ng-template>
            <ng-template pTemplate="body" let-file>
              <tr>
                <td class="td">{{file.name? file.name : file.Name}}</td>
                <td>
                <button pButton pRipple icon="pi pi-trash" class="p-button-rounded p-button-success p-mr-2"
                (click)="delete(file)" title="حذف"></button>
                </td>
              </tr>
            </ng-template>
          </p-table>
            </ng-template>
    </p-fileUpload>
   </div>`
})
export class FileUploadComponent {
  uploadedFiles: any[] = [];
  requestId: string = '';
  filter: string = '';
  constructor(private messageService: MessageService,
    public ref: DynamicDialogRef, public config: DynamicDialogConfig) { }
  ngOnInit() {
    if (this.config.data) {
      this.requestId = this.config.data;
    }
    this.filter = `Filters=RequestId==${this.requestId}`;
  }
  uploadFiles(event: any) {
    this.uploadedFiles = Object.assign([], this.uploadedFiles);
    for (let file of event.files) {
      let formData: FormData = new FormData();
      let fileDto: File = file;
      formData.append('fileobj', fileDto);
      this.uploadedFiles.push(file);
    }
    this.ref.close(this.uploadedFiles);
  }
  delete(file: EmpDoc) {

  }
  reload() {
    this.filter = `Filters=RequestId==${this.requestId}`;

  }
}
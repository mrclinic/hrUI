import { Component } from "@angular/core";
import { MessageService } from "primeng/api";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { EmpDoc } from "../../../models/employee/empdoc.model";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { DocTypeService } from "src/app/demo/service/constants/doctype.service";
@Component({
  styleUrls: ['./upload-doc.dialog.css'],
  templateUrl: './upload-doc.dialog.html',
})
export class UploadFileDialogComponent {
  uploadedFiles: any[] = [];
  EmployeeId: string = '';
  filter: string = '';
  docForm: FormGroup;
  docTypes: any[] = [];
  refId: number;
  personId: string;
  itemId: string;
  constructor(private messageService: MessageService,
    public ref: DynamicDialogRef, public config: DynamicDialogConfig,
    private fb: FormBuilder, private docTypeService: DocTypeService) { }
  ngOnInit() {
    this.docTypeService.GetAllDocTypes('').subscribe((res) => {
      this.docTypes = res.map((item) => {
        return Object.assign(item, {
          label: item?.name,
          value: item?.id
        });
      });
    });

    this.docForm = this.fb.group({
      docDate: new FormControl(''),
      docNumber: new FormControl(''),
      docSrc: new FormControl(''),
      docDescription: new FormControl(''),
      docTypeId: new FormControl(''),
      note: new FormControl(''),
      refId: new FormControl('')
    })
    if (this.config.data) {
      this.personId = this.config.data?.personId;
      this.refId = this.config.data?.refId;
    }
  }
  uploadFiles(event: any) {
    this.uploadedFiles = Object.assign([], this.uploadedFiles);
    for (let file of event.files) {
      let formData: FormData = new FormData();
      let fileDto: File = file;
      formData.append('fileobj', fileDto);
      this.uploadedFiles.push(file);
    }
    this.docForm.value.docDate = this.docForm.value.docDate.toISOString();
    let res = { files: this.uploadedFiles, docInfo: this.docForm.value };
    this.ref.close(res);
  }
  save() { }
  close() { }
}
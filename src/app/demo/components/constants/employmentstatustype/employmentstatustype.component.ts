import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { EmploymentStatusType } from 'src/app/demo/models/constants/employmentstatustype.model';
import { EmploymentStatusTypeService } from 'src/app/demo/service/constants/employmentstatustype.service';

@Component({
  selector: 'app-employmentstatustype',
  templateUrl: './employmentstatustype.component.html',
  styleUrls: ['./employmentstatustype.component.css']
})
export class EmploymentStatusTypeComponent implements OnInit {
  isLoading$!: Observable<boolean>;
  cols: any[];
  CancelReason: string = '';
  ConfirmTitle: string = '';
  ConfirmMsg: string = '';
  Success: string = '';
  deleteSuccess: string = '';
  Yes: string = '';
  No: string = '';
  editSuccess: string = '';
  addSuccess: string = '';
  employmentstatustypeForm: FormGroup;
  name: string = '';
  employmentstatustypeDialog: boolean = false;

  deleteEmploymentStatusTypeDialog: boolean = false;

  deleteEmploymentStatusTypesDialog: boolean = false;

  employmentstatustypes: EmploymentStatusType[] = [];

  employmentStatusType: EmploymentStatusType = {};

  selectedEmploymentStatusTypes: EmploymentStatusType[] = [];
  constructor(private fb: FormBuilder, private store: Store, private messageService: MessageService,
    private confirmationService: ConfirmationService, private translate: TranslateService, private readonly employmentstatustypeService: EmploymentStatusTypeService) {
    this.employmentstatustypeForm = this.fb.group({
      name: new FormControl('', [Validators.required]),

    });
    this.cols = [];
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select<boolean>(
      (state) => state.users.isLoading
    );
    this.employmentstatustypeService.GetAllEmploymentStatusTypes('').subscribe(
      (res) => {
        this.employmentstatustypes = res;
      }
    );

  }
  initColumns() {
    this.cols = [
      { field: 'name', header: "الاسم", type: 'string' }
    ]
  }
  openNew() {
    this.employmentstatustypeForm.reset();
    this.employmentStatusType = {};
    this.employmentstatustypeDialog = true;
  }
  editEmploymentStatusType(EmploymentStatusType: EmploymentStatusType) {
    this.employmentStatusType = { ...EmploymentStatusType };
    this.employmentstatustypeDialog = true;
  }
  deleteSelectedEmploymentStatusType(EmploymentStatusType: EmploymentStatusType) {
    this.employmentStatusType = EmploymentStatusType;
    this.deleteEmploymentStatusType();
  }
  deleteEmploymentStatusType() {
    this.confirmationService.confirm({
      message: 'هل أنت متأكد من حذف' + this.employmentStatusType.name + '?',
      header: 'تأكيد',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.employmentstatustypeService.DeleteEmploymentStatusType(this.employmentStatusType.id as string).subscribe(
          (data) => {
            this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تمت عملية الحذف بنجاح', life: 3000 });
            this.reload();
          }
        );
      },
      acceptLabel: 'نعم',
      rejectLabel: 'لا',
    });
  }

  hideDialog() {
    this.employmentstatustypeDialog = false;
  }

  saveEmploymentStatusType() {
    if (this.employmentstatustypeForm.valid) {
      if (this.employmentStatusType.id) {
        this.employmentstatustypeService.UpdateEmploymentStatusType(this.employmentStatusType).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تمت عملية التعديل بنجاح', life: 3000 });
            this.reload();
          }
        )
      }
      else {
        this.employmentstatustypeService.AddEmploymentStatusType(this.employmentStatusType).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تمت عملية الإضافة بنجاح', life: 3000 });
            this.reload();
          }
        )
      }
      this.employmentstatustypeDialog = false;
      this.employmentStatusType = {};
    }
  }

  reload() {
    this.employmentstatustypeService.GetAllEmploymentStatusTypes('').subscribe(
      (res) => {
        this.employmentstatustypes = res;
      }
    )
  }
  get f() {
    return this.employmentstatustypeForm.controls;
  }
}

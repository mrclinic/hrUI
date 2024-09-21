import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { SubDepartment } from 'src/app/demo/models/constants/subdepartment.model';
import { SubDepartmentService } from 'src/app/demo/service/constants/subdepartment.service';

@Component({
  selector: 'app-subdepartment',
  templateUrl: './subdepartment.component.html',
  styleUrls: ['./subdepartment.component.css']
})
export class SubDepartmentComponent implements OnInit {
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
  subdepartmentForm: FormGroup;
  name: string = '';
  subdepartmentDialog: boolean = false;

  deleteSubDepartmentDialog: boolean = false;

  deleteSubDepartmentsDialog: boolean = false;

  subdepartments: SubDepartment[] = [];

  SubDepartment: SubDepartment = {};

  selectedSubDepartments: SubDepartment[] = [];
  constructor(private fb: FormBuilder, private store: Store, private messageService: MessageService,
    private confirmationService: ConfirmationService, private translate: TranslateService, private readonly subdepartmentService: SubDepartmentService) {
    this.subdepartmentForm = this.fb.group({
      name: new FormControl('', [Validators.required]),

    });
    this.cols = [];
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select<boolean>(
      (state) => state.users.isLoading
    );
    this.subdepartmentService.GetAllSubDepartments('').subscribe(
      (res) => {
        this.subdepartments = res;
      }
    );

  }
  initColumns() {
    this.cols = [
      { field: 'name', header: "الاسم", type: 'string' }
    ]
  }
  openNew() {
    this.subdepartmentForm.reset();
    this.SubDepartment = {};
    this.subdepartmentDialog = true;
  }
  editSubDepartment(SubDepartment: SubDepartment) {
    this.SubDepartment = { ...SubDepartment };
    this.subdepartmentDialog = true;
  }
  deleteSelectedSubDepartment(SubDepartment: SubDepartment) {
    this.SubDepartment = SubDepartment;
    this.deleteSubDepartment();
  }
  deleteSubDepartment() {
    this.confirmationService.confirm({
      message: 'هل أنت متأكد من حذف' + this.SubDepartment.name + '?',
      header: 'تأكيد',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.subdepartmentService.DeleteSubDepartment(this.SubDepartment.id as string).subscribe(
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
    this.subdepartmentDialog = false;
  }

  saveSubDepartment() {
    if (this.subdepartmentForm.valid) {
      if (this.SubDepartment.id) {
        this.subdepartmentService.UpdateSubDepartment(this.SubDepartment).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تمت عملية التعديل بنجاح', life: 3000 });
            this.reload();
          }
        )
      }
      else {
        this.subdepartmentService.AddSubDepartment(this.SubDepartment).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تمت عملية الإضافة بنجاح', life: 3000 });
            this.reload();
          }
        )
      }
      this.subdepartmentDialog = false;
      this.SubDepartment = {};
    }
  }

  reload() {
    this.subdepartmentService.GetAllSubDepartments('').subscribe(
      (res) => {
        this.subdepartments = res;
      }
    )
  }
  get f() {
    return this.subdepartmentForm.controls;
  }
}

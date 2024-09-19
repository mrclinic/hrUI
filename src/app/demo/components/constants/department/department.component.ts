import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { Department } from 'src/app/demo/models/constants/department.model';
import { DepartmentService } from 'src/app/demo/service/constants/department.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
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
  departmentForm: FormGroup;
  name: string = '';
  departmentDialog: boolean = false;

  deleteDepartmentDialog: boolean = false;

  deleteDepartmentsDialog: boolean = false;

  departments: Department[] = [];

  department: Department = {};

  selectedDepartments: Department[] = [];
  constructor(private fb: FormBuilder, private store: Store, private messageService: MessageService,
    private confirmationService: ConfirmationService, private translate: TranslateService, private readonly departmentService: DepartmentService) {
    this.departmentForm = this.fb.group({
      name: new FormControl('', [Validators.required]),

    });
    this.cols = [];
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select<boolean>(
      (state) => state.users.isLoading
    );
    this.departmentService.GetAllDepartments('').subscribe(
      (res) => {
        this.departments = res;
      }
    );
    this.translate.get('AppTitle').subscribe(
      () => {
        this.CancelReason = this.translate.instant('CancelReason');
        this.ConfirmTitle = this.translate.instant('ConfirmTitle');
        this.ConfirmMsg = this.translate.instant('ConfirmMsg');
        this.Success = this.translate.instant('Success');
        this.deleteSuccess = this.translate.instant('deleteSuccess');
        this.Yes = this.translate.instant('Yes');
        this.No = this.translate.instant('No');
        this.editSuccess = this.translate.instant('editSuccess');
        this.addSuccess = this.translate.instant('addSuccess');
        this.initColumns();
      }
    )
  }
  initColumns() {
    this.cols = [
      { field: 'name', header: "الاسم", type: 'string' }
    ]
  }
  openNew() {
    this.department = {};
    this.departmentDialog = true;
  }
  editDepartment(department: Department) {
    this.department = { ...department };
    this.departmentDialog = true;
  }
  deleteSelectedDepartment(department: Department) {
    this.department = department;
    this.deleteDepartment();
  }
  deleteDepartment() {
    this.confirmationService.confirm({
      message: this.ConfirmMsg + this.department.name + '?',
      header: this.ConfirmTitle,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.departmentService.DeleteDepartment(this.department.id as string).subscribe(
          (data) => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.deleteSuccess, life: 3000 });
            this.reload();
          }
        );
      },
      acceptLabel: this.Yes,
      rejectLabel: this.No,
    });
  }

  hideDialog() {
    this.departmentDialog = false;
  }

  saveDepartment() {
    if (this.departmentForm.valid) {
      if (this.department.id) {
        this.departmentService.UpdateDepartment(this.department).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.editSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      else {
        this.departmentService.AddDepartment(this.department).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.addSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      this.departmentDialog = false;
      this.department = {};
    }
  }

  reload() {
    this.departmentService.GetAllDepartments('').subscribe(
      (res) => {
        this.departments = res;
      }
    )
  }
  get f() {
    return this.departmentForm.controls;
  }
}
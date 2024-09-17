import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { Department } from 'src/app/models/hr/department.model';
import { University } from 'src/app/models/hr/University';
import { DepartmentActions } from 'src/app/stateManagement/hr/actions/Department.action';
import { UniversityActions } from 'src/app/stateManagement/hr/actions/university.action';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  isLoading$!: Observable<boolean>;
  departments: Department[] = [];
  cols: any[];
  departmentDialog: boolean;
  Department!: Department;
  submitted: boolean;
  Time: string = '';
  Place: string = '';
  DateLabel: string = '';
  Note: string = '';
  IsCancelled: string = '';
  IsDone: string = '';
  CancelReason: string = '';
  ConfirmTitle: string = '';
  ConfirmMsg: string = '';
  Success: string = '';
  deleteSuccess: string = '';
  Yes: string = '';
  No: string = '';
  editSuccess: string = '';
  addSuccess: string = '';
  RequestIdCol: string = '';
  RequestId: string = '';
  universities: University[] = [];
  departmentForm: FormGroup;
  constructor(private fb: FormBuilder, private store: Store, private messageService: MessageService,
    private confirmationService: ConfirmationService, private translate: TranslateService) {
    this.departmentForm = fb.group({
      name: new FormControl('', [Validators.required]),

    });
    this.cols = [];
    this.departmentDialog = false;
    this.submitted = false;
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select<boolean>(
      (state) => state.users.isLoading
    );
    this.store.dispatch(new DepartmentActions.GetDepartmentsInfo('')).subscribe(
      () => {
        this.departments = this.store.selectSnapshot<Department[]>((state) => state.users.departments);
      }
    );
    this.translate.get('AppTitle').subscribe(
      () => {
        this.Time = this.translate.instant('Time');;
        this.Place = this.translate.instant('Place');
        this.DateLabel = this.translate.instant('Date');;
        this.Note = this.translate.instant('Note');
        this.IsCancelled = this.translate.instant('IsCancelled');
        this.IsDone = this.translate.instant('IsDone');
        this.CancelReason = this.translate.instant('CancelReason');
        this.ConfirmTitle = this.translate.instant('ConfirmTitle');
        this.ConfirmMsg = this.translate.instant('ConfirmMsg');
        this.Success = this.translate.instant('Success');
        this.deleteSuccess = this.translate.instant('deleteSuccess');
        this.Yes = this.translate.instant('Yes');
        this.No = this.translate.instant('No');
        this.editSuccess = this.translate.instant('editSuccess');
        this.addSuccess = this.translate.instant('addSuccess');
        this.RequestIdCol = this.translate.instant('RequestId');
        this.initColumns();
      }
    )
  }
  initColumns() {
    this.cols = [
      { field: 'name', header: this.name, type: 'string' },
      { field: 'id', header: this.id, type: 'string' },

    ]
  }
  openNew() {
    this.Department = {};
    this.submitted = false;
    this.departmentDialog = true;
  }
  editDepartment(Department: Department) {
    this.Department = { ...Department };
    this.departmentDialog = true;
  }
  deleteSelectedDepartment(Department: Department) {
    this.Department = Department;
    this.deleteDepartment();
  }
  deleteDepartment() {
    this.confirmationService.confirm({
      message: this.ConfirmMsg + this.Department.Place + '?',
      header: this.ConfirmTitle,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(new DepartmentActions.DeleteDepartment(this.Department.Id as string)).subscribe(
          data => {
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
    this.submitted = false;
  }

  saveDepartment() {
    this.submitted = true;
    if (this.departmentForm.valid) {
      if (this.Department.Id) {
        delete this.Department.Request;
        this.store.dispatch(new DepartmentActions.UpdateDepartment(this.Department)).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.editSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      else {
        delete this.Department.Id;
        this.store.dispatch(new DepartmentActions.AddDepartment(this.Department)).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.addSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      this.departmentDialog = false;
      this.Department = {};
    }
  }

  reload() {
    this.store.dispatch(new DepartmentActions.GetDepartmentsInfo('')).subscribe(
      () => {
        this.departments = this.store.selectSnapshot<Department[]>((state) => state.users.departments);
      }
    )
  }

  searchUniversity(event: any) {
    let filter = "Filters=Name@=" + event.query;
    this.store.dispatch(new UniversityActions.GetAllUniversitys(filter)).subscribe(
      () => {
        this.universities = this.store.selectSnapshot<University[]>((state) => state.users.universities);
      }
    );
  }
  onSelectUniversity(event: any) {
    this.RequestId = event.Id;
    this.Department.RequestId = this.RequestId;
  }

  get f() {
    return this.departmentForm.controls;
  }
}

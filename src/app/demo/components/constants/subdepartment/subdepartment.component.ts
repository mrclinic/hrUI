import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { SubDepartment } from 'src/app/models/hr/subdepartment.model';
import { University } from 'src/app/models/hr/University';
import { SubDepartmentActions } from 'src/app/stateManagement/hr/actions/SubDepartment.action';
import { UniversityActions } from 'src/app/stateManagement/hr/actions/university.action';

@Component({
  selector: 'app-subdepartment',
  templateUrl: './subdepartment.component.html',
  styleUrls: ['./subdepartment.component.css']
})
export class SubDepartmentComponent implements OnInit {
  isLoading$!: Observable<boolean>;
  subdepartments: SubDepartment[] = [];
  cols: any[];
  subdepartmentDialog: boolean;
  SubDepartment!: SubDepartment;
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
  subdepartmentForm: FormGroup;
  constructor(private fb: FormBuilder, private store: Store, private messageService: MessageService,
    private confirmationService: ConfirmationService, private translate: TranslateService) {
    this.subdepartmentForm = fb.group({
      departmentid: new FormControl('', [Validators.required]),
      department: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),

    });
    this.cols = [];
    this.subdepartmentDialog = false;
    this.submitted = false;
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select<boolean>(
      (state) => state.users.isLoading
    );
    this.store.dispatch(new SubDepartmentActions.GetSubDepartmentsInfo('')).subscribe(
      () => {
        this.subdepartments = this.store.selectSnapshot<SubDepartment[]>((state) => state.users.subdepartments);
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
      { field: 'departmentid', header: this.departmentid, type: 'string' },
      { field: 'department', header: this.department, type: 'hiastHRApi.Service.DTO.Constants.DepartmentDto' },
      { field: 'name', header: this.name, type: 'string' },
      { field: 'id', header: this.id, type: 'string' },

    ]
  }
  openNew() {
    this.SubDepartment = {};
    this.submitted = false;
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
      message: this.ConfirmMsg + this.SubDepartment.Place + '?',
      header: this.ConfirmTitle,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(new SubDepartmentActions.DeleteSubDepartment(this.SubDepartment.Id as string)).subscribe(
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
    this.subdepartmentDialog = false;
    this.submitted = false;
  }

  saveSubDepartment() {
    this.submitted = true;
    if (this.subdepartmentForm.valid) {
      if (this.SubDepartment.Id) {
        delete this.SubDepartment.Request;
        this.store.dispatch(new SubDepartmentActions.UpdateSubDepartment(this.SubDepartment)).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.editSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      else {
        delete this.SubDepartment.Id;
        this.store.dispatch(new SubDepartmentActions.AddSubDepartment(this.SubDepartment)).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.addSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      this.subdepartmentDialog = false;
      this.SubDepartment = {};
    }
  }

  reload() {
    this.store.dispatch(new SubDepartmentActions.GetSubDepartmentsInfo('')).subscribe(
      () => {
        this.subdepartments = this.store.selectSnapshot<SubDepartment[]>((state) => state.users.subdepartments);
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
    this.SubDepartment.RequestId = this.RequestId;
  }

  get f() {
    return this.subdepartmentForm.controls;
  }
}

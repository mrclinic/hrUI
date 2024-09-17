import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { EmploymentStatusType } from 'src/app/models/hr/employmentstatustype.model';
import { University } from 'src/app/models/hr/University';
import { EmploymentStatusTypeActions } from 'src/app/stateManagement/hr/actions/EmploymentStatusType.action';
import { UniversityActions } from 'src/app/stateManagement/hr/actions/university.action';

@Component({
  selector: 'app-employmentstatustype',
  templateUrl: './employmentstatustype.component.html',
  styleUrls: ['./employmentstatustype.component.css']
})
export class EmploymentStatusTypeComponent implements OnInit {
  isLoading$!: Observable<boolean>;
  employmentstatustypes: EmploymentStatusType[] = [];
  cols: any[];
  employmentstatustypeDialog: boolean;
  EmploymentStatusType!: EmploymentStatusType;
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
  employmentstatustypeForm: FormGroup;
  constructor(private fb: FormBuilder, private store: Store, private messageService: MessageService,
    private confirmationService: ConfirmationService, private translate: TranslateService) {
    this.employmentstatustypeForm = fb.group({
      name: new FormControl('', [Validators.required]),

    });
    this.cols = [];
    this.employmentstatustypeDialog = false;
    this.submitted = false;
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select<boolean>(
      (state) => state.users.isLoading
    );
    this.store.dispatch(new EmploymentStatusTypeActions.GetEmploymentStatusTypesInfo('')).subscribe(
      () => {
        this.employmentstatustypes = this.store.selectSnapshot<EmploymentStatusType[]>((state) => state.users.employmentstatustypes);
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
    this.EmploymentStatusType = {};
    this.submitted = false;
    this.employmentstatustypeDialog = true;
  }
  editEmploymentStatusType(EmploymentStatusType: EmploymentStatusType) {
    this.EmploymentStatusType = { ...EmploymentStatusType };
    this.employmentstatustypeDialog = true;
  }
  deleteSelectedEmploymentStatusType(EmploymentStatusType: EmploymentStatusType) {
    this.EmploymentStatusType = EmploymentStatusType;
    this.deleteEmploymentStatusType();
  }
  deleteEmploymentStatusType() {
    this.confirmationService.confirm({
      message: this.ConfirmMsg + this.EmploymentStatusType.Place + '?',
      header: this.ConfirmTitle,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(new EmploymentStatusTypeActions.DeleteEmploymentStatusType(this.EmploymentStatusType.Id as string)).subscribe(
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
    this.employmentstatustypeDialog = false;
    this.submitted = false;
  }

  saveEmploymentStatusType() {
    this.submitted = true;
    if (this.employmentstatustypeForm.valid) {
      if (this.EmploymentStatusType.Id) {
        delete this.EmploymentStatusType.Request;
        this.store.dispatch(new EmploymentStatusTypeActions.UpdateEmploymentStatusType(this.EmploymentStatusType)).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.editSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      else {
        delete this.EmploymentStatusType.Id;
        this.store.dispatch(new EmploymentStatusTypeActions.AddEmploymentStatusType(this.EmploymentStatusType)).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.addSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      this.employmentstatustypeDialog = false;
      this.EmploymentStatusType = {};
    }
  }

  reload() {
    this.store.dispatch(new EmploymentStatusTypeActions.GetEmploymentStatusTypesInfo('')).subscribe(
      () => {
        this.employmentstatustypes = this.store.selectSnapshot<EmploymentStatusType[]>((state) => state.users.employmentstatustypes);
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
    this.EmploymentStatusType.RequestId = this.RequestId;
  }

  get f() {
    return this.employmentstatustypeForm.controls;
  }
}

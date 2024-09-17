import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { Branch } from 'src/app/models/hr/branch.model';
import { University } from 'src/app/models/hr/University';
import { BranchActions } from 'src/app/stateManagement/hr/actions/Branch.action';
import { UniversityActions } from 'src/app/stateManagement/hr/actions/university.action';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css']
})
export class BranchComponent implements OnInit {
  isLoading$!: Observable<boolean>;
  branchs: Branch[] = [];
  cols: any[];
  branchDialog: boolean;
  Branch!: Branch;
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
  branchForm: FormGroup;
  constructor(private fb: FormBuilder, private store: Store, private messageService: MessageService,
    private confirmationService: ConfirmationService, private translate: TranslateService) {
    this.branchForm = fb.group({
      departmentid: new FormControl('', [Validators.required]),
      department: new FormControl('', [Validators.required]),
      subdepartmentid: new FormControl('', [Validators.required]),
      subdepartment: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),

    });
    this.cols = [];
    this.branchDialog = false;
    this.submitted = false;
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select<boolean>(
      (state) => state.users.isLoading
    );
    this.store.dispatch(new BranchActions.GetBranchsInfo('')).subscribe(
      () => {
        this.branchs = this.store.selectSnapshot<Branch[]>((state) => state.users.branchs);
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
      { field: 'subdepartmentid', header: this.subdepartmentid, type: 'string' },
      { field: 'subdepartment', header: this.subdepartment, type: 'hiastHRApi.Service.DTO.Constants.SubDepartmentDto' },
      { field: 'name', header: this.name, type: 'string' },
      { field: 'id', header: this.id, type: 'string' },

    ]
  }
  openNew() {
    this.Branch = {};
    this.submitted = false;
    this.branchDialog = true;
  }
  editBranch(Branch: Branch) {
    this.Branch = { ...Branch };
    this.branchDialog = true;
  }
  deleteSelectedBranch(Branch: Branch) {
    this.Branch = Branch;
    this.deleteBranch();
  }
  deleteBranch() {
    this.confirmationService.confirm({
      message: this.ConfirmMsg + this.Branch.Place + '?',
      header: this.ConfirmTitle,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(new BranchActions.DeleteBranch(this.Branch.Id as string)).subscribe(
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
    this.branchDialog = false;
    this.submitted = false;
  }

  saveBranch() {
    this.submitted = true;
    if (this.branchForm.valid) {
      if (this.Branch.Id) {
        delete this.Branch.Request;
        this.store.dispatch(new BranchActions.UpdateBranch(this.Branch)).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.editSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      else {
        delete this.Branch.Id;
        this.store.dispatch(new BranchActions.AddBranch(this.Branch)).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.addSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      this.branchDialog = false;
      this.Branch = {};
    }
  }

  reload() {
    this.store.dispatch(new BranchActions.GetBranchsInfo('')).subscribe(
      () => {
        this.branchs = this.store.selectSnapshot<Branch[]>((state) => state.users.branchs);
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
    this.Branch.RequestId = this.RequestId;
  }

  get f() {
    return this.branchForm.controls;
  }
}

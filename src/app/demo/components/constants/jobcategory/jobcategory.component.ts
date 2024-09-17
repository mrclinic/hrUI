import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { JobCategory } from 'src/app/models/hr/jobcategory.model';
import { University } from 'src/app/models/hr/University';
import { JobCategoryActions } from 'src/app/stateManagement/hr/actions/JobCategory.action';
import { UniversityActions } from 'src/app/stateManagement/hr/actions/university.action';

@Component({
  selector: 'app-jobcategory',
  templateUrl: './jobcategory.component.html',
  styleUrls: ['./jobcategory.component.css']
})
export class JobCategoryComponent implements OnInit {
  isLoading$!: Observable<boolean>;
  jobcategorys: JobCategory[] = [];
  cols: any[];
  jobcategoryDialog: boolean;
  JobCategory!: JobCategory;
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
  jobcategoryForm: FormGroup;
  constructor(private fb: FormBuilder, private store: Store, private messageService: MessageService,
    private confirmationService: ConfirmationService, private translate: TranslateService) {
    this.jobcategoryForm = fb.group({
      name: new FormControl('', [Validators.required]),

    });
    this.cols = [];
    this.jobcategoryDialog = false;
    this.submitted = false;
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select<boolean>(
      (state) => state.users.isLoading
    );
    this.store.dispatch(new JobCategoryActions.GetJobCategorysInfo('')).subscribe(
      () => {
        this.jobcategorys = this.store.selectSnapshot<JobCategory[]>((state) => state.users.jobcategorys);
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
    this.JobCategory = {};
    this.submitted = false;
    this.jobcategoryDialog = true;
  }
  editJobCategory(JobCategory: JobCategory) {
    this.JobCategory = { ...JobCategory };
    this.jobcategoryDialog = true;
  }
  deleteSelectedJobCategory(JobCategory: JobCategory) {
    this.JobCategory = JobCategory;
    this.deleteJobCategory();
  }
  deleteJobCategory() {
    this.confirmationService.confirm({
      message: this.ConfirmMsg + this.JobCategory.Place + '?',
      header: this.ConfirmTitle,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(new JobCategoryActions.DeleteJobCategory(this.JobCategory.Id as string)).subscribe(
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
    this.jobcategoryDialog = false;
    this.submitted = false;
  }

  saveJobCategory() {
    this.submitted = true;
    if (this.jobcategoryForm.valid) {
      if (this.JobCategory.Id) {
        delete this.JobCategory.Request;
        this.store.dispatch(new JobCategoryActions.UpdateJobCategory(this.JobCategory)).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.editSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      else {
        delete this.JobCategory.Id;
        this.store.dispatch(new JobCategoryActions.AddJobCategory(this.JobCategory)).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.addSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      this.jobcategoryDialog = false;
      this.JobCategory = {};
    }
  }

  reload() {
    this.store.dispatch(new JobCategoryActions.GetJobCategorysInfo('')).subscribe(
      () => {
        this.jobcategorys = this.store.selectSnapshot<JobCategory[]>((state) => state.users.jobcategorys);
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
    this.JobCategory.RequestId = this.RequestId;
  }

  get f() {
    return this.jobcategoryForm.controls;
  }
}

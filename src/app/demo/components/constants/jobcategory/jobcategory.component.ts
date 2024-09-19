import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { JobCategory } from 'src/app/demo/models/constants/jobcategory.model';
import { JobCategoryService } from 'src/app/demo/service/constants/jobcategory.service';

@Component({
  selector: 'app-jobcategory',
  templateUrl: './jobcategory.component.html',
  styleUrls: ['./jobcategory.component.css']
})
export class JobCategoryComponent implements OnInit {
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
  jobcategoryForm: FormGroup;
  name: string = '';
  jobcategoryDialog: boolean = false;

  deleteJobCategoryDialog: boolean = false;

  deleteJobCategorysDialog: boolean = false;

  jobcategorys: JobCategory[] = [];

  JobCategory: JobCategory = {};

  selectedJobCategorys: JobCategory[] = [];
  constructor(private fb: FormBuilder, private store: Store, private messageService: MessageService,
    private confirmationService: ConfirmationService, private translate: TranslateService, private readonly jobcategoryService: JobCategoryService) {
    this.jobcategoryForm = this.fb.group({
      name: new FormControl('', [Validators.required]),

    });
    this.cols = [];
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select<boolean>(
      (state) => state.users.isLoading
    );
    this.jobcategoryService.GetAllJobCategorys('').subscribe(
      (res) => {
        this.jobcategorys = res;
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
    this.JobCategory = {};
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
      message: this.ConfirmMsg + this.JobCategory.name + '?',
      header: this.ConfirmTitle,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.jobcategoryService.DeleteJobCategory(this.JobCategory.id as string).subscribe(
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
    this.jobcategoryDialog = false;
  }

  saveJobCategory() {
    if (this.jobcategoryForm.valid) {
      if (this.JobCategory.id) {
        this.jobcategoryService.UpdateJobCategory(this.JobCategory).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.editSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      else {
        this.jobcategoryService.AddJobCategory(this.JobCategory).subscribe(
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
    this.jobcategoryService.GetAllJobCategorys('').subscribe(
      (res) => {
        this.jobcategorys = res;
      }
    )
  }
  get f() {
    return this.jobcategoryForm.controls;
  }
}

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

  jobcategoryForm: FormGroup;

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

  }
  initColumns() {
    this.cols = [
      { field: 'name', header: "الاسم", type: 'string' }
    ]
  }
  openNew() {
    this.jobcategoryForm.reset();
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
      message: 'هل أنت متأكد من حذف' + this.JobCategory.name + '?',
      header: 'تأكيد',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.jobcategoryService.DeleteJobCategory(this.JobCategory.id as string).subscribe(
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
    this.jobcategoryDialog = false;
  }

  saveJobCategory() {
    if (this.jobcategoryForm.valid) {
      if (this.JobCategory.id) {
        this.jobcategoryService.UpdateJobCategory(this.JobCategory).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تمت عملية التعديل بنجاح', life: 3000 });
            this.reload();
          }
        )
      }
      else {
        this.jobcategoryService.AddJobCategory(this.JobCategory).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تمت عملية الإضافة بنجاح', life: 3000 });
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

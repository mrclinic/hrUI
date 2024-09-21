import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { JobTitle } from 'src/app/demo/models/constants/jobtitle.model';
import { JobTitleService } from 'src/app/demo/service/constants/jobtitle.service';

@Component({
  selector: 'app-jobtitle',
  templateUrl: './jobtitle.component.html',
  styleUrls: ['./jobtitle.component.css']
})
export class JobTitleComponent implements OnInit {
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
  jobtitleForm: FormGroup;
  name: string = '';
  jobtitleDialog: boolean = false;

  deleteJobTitleDialog: boolean = false;

  deleteJobTitlesDialog: boolean = false;

  jobtitles: JobTitle[] = [];

  JobTitle: JobTitle = {};

  selectedJobTitles: JobTitle[] = [];
  constructor(private fb: FormBuilder, private store: Store, private messageService: MessageService,
    private confirmationService: ConfirmationService, private translate: TranslateService, private readonly jobtitleService: JobTitleService) {
    this.jobtitleForm = this.fb.group({
      name: new FormControl('', [Validators.required]),

    });
    this.cols = [];
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select<boolean>(
      (state) => state.users.isLoading
    );
    this.jobtitleService.GetAllJobTitles('').subscribe(
      (res) => {
        this.jobtitles = res;
      }
    );

  }
  initColumns() {
    this.cols = [
      { field: 'name', header: "الاسم", type: 'string' }
    ]
  }
  openNew() {
    this.jobtitleForm.reset();
    this.JobTitle = {};
    this.jobtitleDialog = true;
  }
  editJobTitle(JobTitle: JobTitle) {
    this.JobTitle = { ...JobTitle };
    this.jobtitleDialog = true;
  }
  deleteSelectedJobTitle(JobTitle: JobTitle) {
    this.JobTitle = JobTitle;
    this.deleteJobTitle();
  }
  deleteJobTitle() {
    this.confirmationService.confirm({
      message: 'هل أنت متأكد من حذف' + this.JobTitle.name + '?',
      header: 'تأكيد',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.jobtitleService.DeleteJobTitle(this.JobTitle.id as string).subscribe(
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
    this.jobtitleDialog = false;
  }

  saveJobTitle() {
    if (this.jobtitleForm.valid) {
      if (this.JobTitle.id) {
        this.jobtitleService.UpdateJobTitle(this.JobTitle).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تمت عملية التعديل بنجاح', life: 3000 });
            this.reload();
          }
        )
      }
      else {
        this.jobtitleService.AddJobTitle(this.JobTitle).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تمت عملية الإضافة بنجاح', life: 3000 });
            this.reload();
          }
        )
      }
      this.jobtitleDialog = false;
      this.JobTitle = {};
    }
  }

  reload() {
    this.jobtitleService.GetAllJobTitles('').subscribe(
      (res) => {
        this.jobtitles = res;
      }
    )
  }
  get f() {
    return this.jobtitleForm.controls;
  }
}

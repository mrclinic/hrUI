import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { forkJoin, Observable } from 'rxjs';
import { JobChangeReason } from 'src/app/demo/models/constants/jobchangereason.model';
import { JobChangeReasonService } from 'src/app/demo/service/constants/jobchangereason.service';
import { ModificationContractTypeService } from 'src/app/demo/service/constants/modificationcontracttype.service';

@Component({
  selector: 'app-jobchangereason',
  templateUrl: './jobchangereason.component.html',
  styleUrls: ['./jobchangereason.component.css']
})
export class JobChangeReasonComponent implements OnInit {
  isLoading$!: Observable<boolean>;
  cols: any[];

  jobchangereasonForm: FormGroup;

  jobchangereasonDialog: boolean = false;

  deleteJobChangeReasonDialog: boolean = false;

  deleteJobChangeReasonsDialog: boolean = false;

  jobchangereasons: JobChangeReason[] = [];

  JobChangeReason: JobChangeReason = {};

  selectedJobChangeReasons: JobChangeReason[] = [];
  items: any[] | undefined;
  filteredItems: any[] | undefined;

  constructor(private fb: FormBuilder, private store: Store, private messageService: MessageService,
    private confirmationService: ConfirmationService, private translate: TranslateService,
    private readonly jobchangereasonService: JobChangeReasonService
    , private readonly modificationcontracttypeService: ModificationContractTypeService) {
    this.jobchangereasonForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      modificationcontracttypeid: new FormControl('', [Validators.required]),

    });
    this.cols = [];
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select<boolean>(
      (state) => state.users.isLoading
    );
    this.jobchangereasonService.GetAllJobChangeReasons('').subscribe(
      (res) => {
        this.jobchangereasons = res;
      }
    );
    forkJoin([this.jobchangereasonService.GetAllJobChangeReasons(''), this.modificationcontracttypeService.GetAllModificationContractTypes('')])
      .subscribe(([jobchangereasons, items]) => {
        this.jobchangereasons = jobchangereasons;
        this.items = items;
      });
  }
  initColumns() {
    this.cols = [
      { field: 'name', header: "الاسم", type: 'string' },
      { field: 'modificationcontracttypeid', header: "نوع صك التعيين" }
    ]
  }
  openNew() {
    this.jobchangereasonForm.reset();
    this.JobChangeReason = {};
    this.jobchangereasonDialog = true;
  }
  editJobChangeReason(JobChangeReason: JobChangeReason) {
    this.JobChangeReason = { ...JobChangeReason };
    this.jobchangereasonDialog = true;
  }
  deleteSelectedJobChangeReason(JobChangeReason: JobChangeReason) {
    this.JobChangeReason = JobChangeReason;
    this.deleteJobChangeReason();
  }
  deleteJobChangeReason() {
    this.confirmationService.confirm({
      message: 'هل أنت متأكد من حذف' + this.JobChangeReason.name + '?',
      header: 'تأكيد',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.jobchangereasonService.DeleteJobChangeReason(this.JobChangeReason.id as string).subscribe(
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
    this.jobchangereasonDialog = false;
  }

  saveJobChangeReason() {
    if (this.jobchangereasonForm.valid) {
      if (this.JobChangeReason.id) {
        this.jobchangereasonService.UpdateJobChangeReason(this.JobChangeReason).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تمت عملية التعديل بنجاح', life: 3000 });
            this.reload();
          }
        )
      }
      else {
        this.jobchangereasonService.AddJobChangeReason(this.JobChangeReason).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تمت عملية الإضافة بنجاح', life: 3000 });
            this.reload();
          }
        )
      }
      this.jobchangereasonDialog = false;
      this.JobChangeReason = {};
    }
  }

  reload() {
    this.jobchangereasonService.GetAllJobChangeReasons('').subscribe(
      (res) => {
        this.jobchangereasons = res;
      }
    )
  }
  get f() {
    return this.jobchangereasonForm.controls;
  }

  filterItems(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.items as any[])?.length; i++) {
      let country = (this.items as any[])[i];
      if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }

    this.filteredItems = filtered;
  }
}
